<?php
session_start(); // بدء الجلسة
$servername = sql204.infinityfree.com;
$username = if0_41550057;
$password = 7OVcbylpBDE;
$dbname = if0_41550057_codebitslern_at;

$conn = new mysqli($servername, $username, $password, $dbname);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST['username'];
    $pass = $_POST['password'];

    $result = $conn->query("SELECT * FROM users WHERE username='$user'");
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($pass, $row['password'])) { // التحقق من كلمة المرور المشفرة
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['username'] = $row['username'];
            header("Location: shop.php"); // توجيه المستخدم للمتجر بعد النجاح
        } else {
            echo "<p style='color:red; text-align:center;'>كلمة المرور غير صحيحة!</p>";
        }
    } else {
        echo "<p style='color:red; text-align:center;'>اسم المستخدم غير موجود!</p>";
    }
}
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>تسجيل الدخول - CodeBitsLern</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        form { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 300px; }
        input { width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box; }
        button { width: 100%; padding: 10px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; }
    </style>
</head>
<body>
    <form method="post">
        <h2 style="text-align:center;">تسجيل الدخول 🔑</h2>
        <input type="text" name="username" placeholder="اسم المستخدم" required>
        <input type="password" name="password" placeholder="كلمة المرور" required>
        <button type="submit">دخول 🚀</button>
        <p style="text-align:center; font-size: 0.9em;">ليس لديك حساب؟ <a href="register.php">أنشئ حساباً جديداً</a></p>
    </form>
</body>
</html>
