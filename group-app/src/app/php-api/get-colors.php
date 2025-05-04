<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "user_placeholder", "password_paceholder", "db_placeholder");
$result = $conn->query("SELECT * FROM colors ORDER BY name ASC");

$colors = [];
while($row = $result->fetch_assoc()) {
    $colors[] = $row;
}

echo json_encode($colors);
$conn->close();