<?php
// بيانات الاتصال
$servername = sql204.infinityfree.com;
$username = if0_41550057;
$password = 7OVcbylpBDE;
$dbname = if0_41550057_codebitslern_at;

$conn = new mysqli($servername, $username, $password, $dbname);

// حذف منتج إذا تم طلب ذلك
if (isset($_GET['delete'])) {
    $id = $_GET['delete'];
    $conn->query("DELETE FROM products WHERE id=$id");
    header("Location: admin_manage.php");
}

$result = $conn->query("SELECT * FROM products ORDER BY id DESC");
?>

<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>إدارة المنتجات - CodeBitsLern</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4; }
        table { width: 100%; background: white; border-collapse: collapse; border-radius: 8px; overflow: hidden; }
        th, td { padding: 12px; border-bottom: 1px solid #ddd; text-align: center; }
        th { background: #333; color: white; }
        .btn-edit { color: #007bff; text-decoration: none; margin-left: 10px; }
        .btn-delete { color: #dc3545; text-decoration: none; }
        .add-link { display: inline-block; margin-bottom: 20px; background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
    </style>
</head>
<body>
    <h2>لوحة تحكم المنتجات 🛠️</h2>
    <a href="add_product.php" class="add-link">+ إضافة منتج جديد</a>
    <table>
        <tr>
            <th>ID</th>
            <th>العنوان</th>
            <th>السعر</th>
            <th>العمليات</th>
        </tr>
        <?php while($row = $result->fetch_assoc()): ?>
        <tr>
            <td><?php echo $row['id']; ?></td>
            <td><?php echo $row['title']; ?></td>
            <td>$<?php echo $row['price']; ?></td>
            <td>
                <a href="edit_product.php?id=<?php echo $row['id']; ?>" class="btn-edit">تعديل ✏️</a>
                <a href="admin_manage.php?delete=<?php echo $row['id']; ?>" class="btn-delete" onclick="return confirm('هل أنت متأكد من الحذف؟')">حذف 🗑️</a>
            </td>
        </tr>
        <?php endwhile; ?>
    </table>
</body>
</html>
