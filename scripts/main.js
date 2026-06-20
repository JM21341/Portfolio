window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        // Adds background fill and darkens the bottom line when scrolling down
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.1)';
    } else {
        // Reverts to clear transparent styles when sitting back at the top
        header.style.backgroundColor = 'transparent';
        header.style.boxShadow = '0 1px 0 0 rgba(165, 164, 164, 0.3)';
    }
});

function updateClock() {
    const timeElement = document.getElementById('currentTime');

    if (timeElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString();

        timeElement.textContent = timeString;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    updateClock();
    setInterval(updateClock, 1000);
});