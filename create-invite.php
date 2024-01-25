<?php
$inviteCode = $_GET['code'];
$customUrl = $_GET['url'];

// Validate input
if (empty($inviteCode) || empty($customUrl)) {
    die('Invalid input.');
}

// TODO: Implement logic to store the custom invite link in your system/database.

// For now, just redirect to Discord with the invite code
header('Location: https://discord.com/invite/' . $inviteCode);
exit;
?>
