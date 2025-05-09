<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$conn = new mysql("localhost", "your_user", "your_pass", "your_db");

$stmt = $conn->prepare("DELETE FROM colors WHERE id = ?");
$stmt->bind_param("i", $data['id']);
$stmt->execute();

echo json_encode(["success" => true]);
$conn->close();
?>