// script.js
function createCustomInvite() {
    const inviteCode = document.getElementById('inviteCode').value;

    // Perform AJAX request to the server
    fetch('create-invite.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inviteCode }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'custom-invite.html?ghs=' + data.ghs;
        } else {
            alert('Error creating custom invite: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
