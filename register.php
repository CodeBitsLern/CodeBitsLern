<?php
// بيانات الاتصال
$servername = sql204.infinityfree.com;
$username = if0_41550057;
$password = 7OVcbylpBDE;
$dbname = if0_41550057_codebitslern_at;

$conn = new mysqli($servername, $username, $password, $dbname);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST['username'];
    $email = $_POST['email'];
    $pass = password_hash($_POST['password'], PASSWORD_DEFAULT); // تشفير كلمة المرور

    $sql = "INSERT INTO users (username, email, password) VALUES ('$user', '$email', '$pass')";

    if ($conn->query($sql) === TRUE) {
        echo "<p style='color:green; text-align:center;'>تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.</p>";
    } else {
        echo "خطأ: " . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>إنشاء حساب جديد - CodeBitsLern</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        form { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 300px; }
        input { width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box; }
        button { width: 100%; padding: 10px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; }
    </style>
</head>
<body>
    <form method="post">
        <h2 style="text-align:center;">إنشاء حساب جديد</h2>
        <input type="text" name="username" placeholder="اسم المستخدم" required>
        <input type="email" name="email" placeholder="البريد الإلكتروني" required>
        <input type="password" name="password" placeholder="كلمة المرور" required>
        <button type="submit">تسجيل 📝</button>
        <p style="text-align:center; font-size: 0.9em;">لديك حساب بالفعل؟ <a href="login.php">سجل دخولك هنا</a></p>
    </form>
</body>
</html>
