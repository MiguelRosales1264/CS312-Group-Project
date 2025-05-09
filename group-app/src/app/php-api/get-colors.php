<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "your_user", "your_pass", "your_db");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT * FROM colors";
$result = $conn->query($sql);
$colors = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $colors[] = $row;
    }
}
$conn->close();
echo json_encode($colors);
?>