import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import { TRPCError } from "@trpc/server";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(authenticated: boolean = false): TrpcContext {
  const user: AuthenticatedUser | null = authenticated ? {
    id: 1,
    openId: "protected-test-user",
    email: "protected@example.com",
    name: "Protected Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  } : null;

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("Protected Procedures", () => {
  describe("auth.profile", () => {
    it("should return user profile when authenticated", async () => {
      const ctx = createAuthContext(true);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.profile();

      expect(result).toEqual({
        id: 1,
        name: "Protected Test User",
        email: "protected@example.com",
        role: "user",
        createdAt: new Date("2026-01-01"),
        lastSignedIn: expect.any(Date),
      });
    });

    it("should have correct user data in profile", async () => {
      const ctx = createAuthContext(true);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.profile();

      expect(result.id).toBe(1);
      expect(result.name).toBe("Protected Test User");
      expect(result.email).toBe("protected@example.com");
      expect(result.role).toBe("user");
    });

    it("should throw UNAUTHORIZED error when not authenticated", async () => {
      const ctx = createAuthContext(false);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.auth.profile();
        expect.fail("Should have thrown UNAUTHORIZED error");
      } catch (error) {
        expect(error).toBeInstanceOf(TRPCError);
        if (error instanceof TRPCError) {
          expect(error.code).toBe("UNAUTHORIZED");
        }
      }
    });

    it("should not allow unauthenticated access", async () => {
      const ctx = createAuthContext(false);
      const caller = appRouter.createCaller(ctx);

      let errorThrown = false;
      let errorCode = "";

      try {
        await caller.auth.profile();
      } catch (error) {
        errorThrown = true;
        if (error instanceof TRPCError) {
          errorCode = error.code;
        }
      }

      expect(errorThrown).toBe(true);
      expect(errorCode).toBe("UNAUTHORIZED");
    });

    it("should return consistent profile data on multiple calls", async () => {
      const ctx = createAuthContext(true);
      const caller = appRouter.createCaller(ctx);

      const profile1 = await caller.auth.profile();
      const profile2 = await caller.auth.profile();

      expect(profile1).toEqual(profile2);
      expect(profile1.id).toBe(profile2.id);
      expect(profile1.email).toBe(profile2.email);
    });
  });

  describe("Protected Procedure Access Control", () => {
    it("should enforce authentication on protected procedures", async () => {
      const unauthCtx = createAuthContext(false);
      const caller = appRouter.createCaller(unauthCtx);

      const procedures = [
        { name: "profile", fn: () => caller.auth.profile() },
      ];

      for (const proc of procedures) {
        try {
          await proc.fn();
          expect.fail(`${proc.name} should have thrown UNAUTHORIZED`);
        } catch (error) {
          expect(error).toBeInstanceOf(TRPCError);
          if (error instanceof TRPCError) {
            expect(error.code).toBe("UNAUTHORIZED");
          }
        }
      }
    });

    it("should allow authenticated users to access protected procedures", async () => {
      const authCtx = createAuthContext(true);
      const caller = appRouter.createCaller(authCtx);

      const profile = await caller.auth.profile();

      expect(profile).toBeDefined();
      expect(profile.id).toBeDefined();
      expect(profile.email).toBeDefined();
    });
  });

  describe("Public vs Protected Procedures", () => {
    it("public me procedure should work without authentication", async () => {
      const ctx = createAuthContext(false);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.me();

      expect(result).toBeNull();
    });

    it("public me procedure should return user when authenticated", async () => {
      const ctx = createAuthContext(true);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.me();

      expect(result).not.toBeNull();
      expect(result?.email).toBe("protected@example.com");
    });

    it("protected profile procedure should require authentication", async () => {
      const ctx = createAuthContext(false);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.auth.profile();
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(TRPCError);
      }
    });
  });
});
