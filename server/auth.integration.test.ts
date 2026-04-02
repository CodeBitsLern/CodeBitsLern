import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

type CookieCall = {
  name: string;
  options: Record<string, unknown>;
};

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(authenticated: boolean = false): { ctx: TrpcContext; clearedCookies: CookieCall[] } {
  const clearedCookies: CookieCall[] = [];

  const user: AuthenticatedUser | null = authenticated ? {
    id: 1,
    openId: "test-user-001",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
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
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as TrpcContext["res"],
  };

  return { ctx, clearedCookies };
}

describe("Authentication Integration Tests", () => {
  describe("auth.me", () => {
    it("should return null when user is not authenticated", async () => {
      const { ctx } = createAuthContext(false);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.me();

      expect(result).toBeNull();
    });

    it("should return user data when authenticated", async () => {
      const { ctx } = createAuthContext(true);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.me();

      expect(result).not.toBeNull();
      expect(result?.email).toBe("test@example.com");
      expect(result?.name).toBe("Test User");
      expect(result?.role).toBe("user");
    });

    it("should return user with correct fields", async () => {
      const { ctx } = createAuthContext(true);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.me();

      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("openId");
      expect(result).toHaveProperty("email");
      expect(result).toHaveProperty("name");
      expect(result).toHaveProperty("role");
      expect(result).toHaveProperty("createdAt");
      expect(result).toHaveProperty("lastSignedIn");
    });
  });

  describe("auth.logout", () => {
    it("should clear session cookie on logout", async () => {
      const { ctx, clearedCookies } = createAuthContext(true);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.logout();

      expect(result).toEqual({ success: true });
      expect(clearedCookies).toHaveLength(1);
      expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
    });

    it("should set maxAge to -1 for cookie expiration", async () => {
      const { ctx, clearedCookies } = createAuthContext(true);
      const caller = appRouter.createCaller(ctx);

      await caller.auth.logout();

      expect(clearedCookies[0]?.options.maxAge).toBe(-1);
    });

    it("should set secure cookie options", async () => {
      const { ctx, clearedCookies } = createAuthContext(true);
      const caller = appRouter.createCaller(ctx);

      await caller.auth.logout();

      expect(clearedCookies[0]?.options).toMatchObject({
        secure: true,
        httpOnly: true,
        path: "/",
      });
    });

    it("should work even when user is not authenticated", async () => {
      const { ctx, clearedCookies } = createAuthContext(false);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.logout();

      expect(result).toEqual({ success: true });
      expect(clearedCookies).toHaveLength(1);
    });
  });

  describe("Authentication Flow", () => {
    it("should handle complete login and logout flow", async () => {
      // Step 1: Check unauthenticated state
      const { ctx: unauthCtx } = createAuthContext(false);
      const unauthCaller = appRouter.createCaller(unauthCtx);
      const meBeforeLogin = await unauthCaller.auth.me();
      expect(meBeforeLogin).toBeNull();

      // Step 2: Simulate authenticated state
      const { ctx: authCtx, clearedCookies } = createAuthContext(true);
      const authCaller = appRouter.createCaller(authCtx);
      const meAfterLogin = await authCaller.auth.me();
      expect(meAfterLogin).not.toBeNull();
      expect(meAfterLogin?.email).toBe("test@example.com");

      // Step 3: Logout
      const logoutResult = await authCaller.auth.logout();
      expect(logoutResult.success).toBe(true);
      expect(clearedCookies).toHaveLength(1);
      expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
    });

    it("should maintain user data consistency", async () => {
      const { ctx } = createAuthContext(true);
      const caller = appRouter.createCaller(ctx);

      const user1 = await caller.auth.me();
      const user2 = await caller.auth.me();

      expect(user1).toEqual(user2);
      expect(user1?.id).toBe(user2?.id);
      expect(user1?.openId).toBe(user2?.openId);
    });
  });

  describe("Error Handling", () => {
    it("should handle logout gracefully", async () => {
      const { ctx } = createAuthContext(true);
      const caller = appRouter.createCaller(ctx);

      expect(async () => {
        await caller.auth.logout();
      }).not.toThrow();
    });

    it("should return consistent results on multiple calls", async () => {
      const { ctx } = createAuthContext(true);
      const caller = appRouter.createCaller(ctx);

      const results = await Promise.all([
        caller.auth.me(),
        caller.auth.me(),
        caller.auth.me(),
      ]);

      expect(results[0]).toEqual(results[1]);
      expect(results[1]).toEqual(results[2]);
    });
  });
});
