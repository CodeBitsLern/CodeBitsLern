<?php
require_once 'db.php';

$id = $_GET['id'];
$product = $conn->query("SELECT * FROM products WHERE id=$id")->fetch_assoc();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $image_url = $_POST['image_url'];

    $sql = "UPDATE products SET title='$title', description='$description', price='$price', image_url='$image_url' WHERE id=$id";
    if ($conn->query($sql) === TRUE) {
        header("Location: admin_manage.php");
    }
}
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>تعديل المنتج - CodeBitsLern</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4; }
        form { background: white; padding: 20px; border-radius: 8px; max-width: 400px; margin: auto; }
        input, textarea { width: 100%; margin-bottom: 10px; padding: 8px; box-sizing: border-box; }
        button { background: #007bff; color: white; border: none; padding: 10px; width: 100%; cursor: pointer; }
    </style>
</head>
<body>
    <form method="post">
        <h2>تعديل بيانات المنتج</h2>
        <input type="text" name="title" value="<?php echo $product['title']; ?>" required>
        <textarea name="description" required><?php echo $product['description']; ?></textarea>
        <input type="number" step="0.01" name="price" value="<?php echo $product['price']; ?>" required>
        <input type="text" name="image_url" value="<?php echo $product['image_url']; ?>">
        <button type="submit">حفظ التعديلات ✅</button>
    </form>
</body>
</html>
