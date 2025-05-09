<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysql("faure", "miguelrt", "password", "miguelrt");
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

$result = $conn->query("SELECT * FROM colors ORDER BY name ASC");

$colors = [];
while ($row = $result->fetch_assoc()) {
    $colors[] = $row;
}

echo json_encode($colors);
$conn->close();
?>