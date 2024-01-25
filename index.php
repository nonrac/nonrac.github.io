<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Website</title>
    <!-- Include any additional head content -->
</head>
<body>

<?php
$ip = $_SERVER['REMOTE_ADDR'];

// Log the IP address to a file
file_put_contents('ip_log.txt', $ip . "\n", FILE_APPEND);
?>

<!-- Your website's content goes here -->

<script>
    // JavaScript code to fetch client IP on the client side
    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => console.log('Client IP:', data.ip))
        .catch(error => console.error('Error fetching client IP:', error));
</script>

</body>
</html>
