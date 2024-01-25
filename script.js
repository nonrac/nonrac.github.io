// Add this to the end of your script.js file
document.getElementById('logout-link').addEventListener('click', async () => {
    try {
        await fetch('/logout', { method: 'POST' });
        window.location.reload();
    } catch (error) {
        console.error('Error during logout:', error);
    }
});
