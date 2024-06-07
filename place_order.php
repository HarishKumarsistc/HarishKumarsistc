<?php
session_start();
include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'];
$cart = $data['cart'];

$sql = "INSERT INTO orders (username, items) VALUES ('$username', '" . json_encode($cart) . "')";
if ($conn->query($sql) === TRUE) {
    echo "Order placed successfully!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
?>
