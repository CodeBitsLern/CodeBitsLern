<?php
$servername = sql204.infinityfree.com ;
$username = if0_41550057;
$password = 7OVcbylpBDE;
$dbname = if0_41550057_codebitslern_at;

// إنشاء الاتصال
$conn = new mysqli($servername, $username, $password, $dbname);

// فحص الاتصال
if ($conn->connect_error) {
  die("فشل الاتصال: " . $conn->connect_error);
}
echo "تم الاتصال بنجاح بقاعدة بيانات CodeBitsLern! 🎉";
?>
