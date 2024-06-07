<?php
session_start();
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $_SESSION['username'] = $username;
        echo "<script>
                sessionStorage.setItem('username', '$username');
                alert('Successfully logged in!');
                window.location.href = '../your_orders.html';
              </script>";
    } else {
        echo "<script>
                alert('Invalid credentials');
                window.location.href = '../login.html';
              </script>";
    }
}
?>
