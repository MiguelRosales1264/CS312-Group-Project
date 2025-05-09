<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$conn = new mysql("localhost", "your_user", "your_pass", "your_db");

$stmt = $conn->prepare("INSERT INTO colors (name, hex) VALUES (?, ?)");
$stmt->bind_param("ss", $data['name'], $data['hex']);
$stmt->execute();

echo json_encode(["success" => true]);
$conn->close();
?>