function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    
    sidebar.classList.toggle('shake');
    
    if (sidebar.style.width === '250px') {
        sidebar.style.width = '50px';
        content.style.marginLeft = '50px';
    } else {
        sidebar.style.width = '250px';
        content.style.marginLeft = '250px';
    }
}

function openDiscord() {
    window.location.href = 'https://discord.gg/N5Q86dvxGs';
}
