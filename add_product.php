<?php
// بيانات الاتصال بقاعدة البيانات
$servername = sql204.infinityfree.com;
$username = if0_41550057;
$password = 7OVcbylpBDE;
$dbname = if0_41550057_codebitslern_at;

$conn = new mysqli($servername, $username, $password, $dbname);

// التأكد من نجاح الاتصال
if ($conn->connect_error) {
    die("فشل الاتصال: " . $conn->connect_error);
}

// إذا تم إرسال النموذج (Form)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $image_url = $_POST['image_url'];

    $sql = "INSERT INTO products (title, description, price, image_url) VALUES ('$title', '$description', '$price', '$image_url')";

    if ($conn->query($sql) === TRUE) {
        echo "<p style='color:green;'>تمت إضافة الدورة بنجاح! 🎉</p>";
    } else {
        echo "خطأ: " . $sql . "<br>" . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>إضافة دورة جديدة - CodeBitsLern</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; }
        form { background: white; padding: 20px; border-radius: 8px; max-width: 400px; margin: auto; }
        input, textarea { width: 100%; margin-bottom: 10px; padding: 8px; }
        button { background: #007bff; color: white; border: none; padding: 10px; width: 100%; cursor: pointer; }
    </style>
</head>
<body>
    <form method="post">
        <h2>إضافة دورة جديدة</h2>
        <input type="text" name="title" placeholder="عنوان الدورة" required>
        <textarea name="description" placeholder="وصف الدورة" required></textarea>
        <input type="number" step="0.01" name="price" placeholder="السعر" required>
        <input type="text" name="image_url" placeholder="رابط صورة الدورة">
        <button type="submit">إضافة الدورة للموقع</button>
    </form>
</body>
</html>
