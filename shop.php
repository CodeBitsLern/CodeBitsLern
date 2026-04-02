<?php
require_once 'db.php';

// جلب المنتجات من قاعدة البيانات
$sql = "SELECT * FROM products ORDER BY id DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>متجر CodeBitsLern - الدورات المتاحة</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f2f5; padding: 20px; }
        .container { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; max-width: 1200px; margin: auto; }
        .card { background: white; border-radius: 15px; padding: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); text-align: center; transition: 0.3s; }
        .card:hover { transform: translateY(-5px); }
        .card img { width: 100%; border-radius: 10px; height: 150px; object-fit: cover; }
        .price { color: #28a745; font-weight: bold; font-size: 1.2em; }
        .btn { background: #007bff; color: white; padding: 10px; border-radius: 5px; text-decoration: none; display: block; margin-top: 10px; }
    </style>
</head>
<body>
    <h1 style="text-align:center;">مرحباً بك في متجر CodeBitsLern 💻</h1>
    <div class="container">
        <?php
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<div class='card'>";
                echo "<img src='" . $row["image_url"] . "' alt='صورة الدورة'>";
                echo "<h3>" . $row["title"] . "</h3>";
                echo "<p>" . $row["description"] . "</p>";
                echo "<p class='price'>$" . $row["price"] . "</p>";
                echo "<a href='#' class='btn'>أضف للسلة 🛒</a>";
                echo "</div>";
            }
        } else {
            echo "<p style='text-align:center; grid-column: 1/-1;'>لا توجد دورات مضافة حالياً. استخدم صفحة add_product.php لإضافة أول دورة!</p>";
        }
        ?>
    </div>
</body>
</html>
