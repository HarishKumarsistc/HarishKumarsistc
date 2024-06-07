<?php
session_start();
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";
    if ($conn->query($sql) === TRUE) {
        $_SESSION['username'] = $username;
        echo "<script>
                sessionStorage.setItem('username', '$username');
                alert('Successfully signed in!');
                window.location.href = '../your_orders.html';
              </script>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
?>
