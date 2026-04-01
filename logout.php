<?php
session_start();
session_destroy(); // إنهاء الجلسة
header("Location: login.php"); // العودة لصفحة الدخول
?>
