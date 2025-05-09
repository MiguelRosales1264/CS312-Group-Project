<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$conn = new mysql("localhost", "your_user", "your_pass", "your_db");

$stmt = $conn->prepare("UPDATE colors SET name = ?, hex = ? WHERE id = ?");
$stmt->bind_param("ssi", $data['name'], $data['hex'], $data['id']);
$stmt->execute();

echo json_encode(["success" => true]);
$conn->close();
?>