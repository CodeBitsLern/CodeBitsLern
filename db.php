<?php
$servername = "sql204.infinityfree.com";
$username = "if0_41550057";
$password = "7OVcbylpBDE";
$dbname = "if0_41550057_codebitslern_at";

// إنشاء الاتصال
$conn = new mysqli($servername, $username, $password, $dbname);

// فحص الاتصال
if ($conn->connect_error) {
    die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
}

// تعيين ترميز اللغة العربية
$conn->set_charset("utf8mb4");
?>
