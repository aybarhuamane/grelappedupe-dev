let interval;
function redirectWithFade(url) {
    const overlay = document.getElementById('blackOverlay');
    const spinner = document.getElementById('spinner');
    const loadingText = document.getElementById('loadingText');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const content = document.getElementById('content');

    clearInterval(interval);
    progressBar.style.width = '0%';

    content.classList.add('hidden');
    overlay.classList.remove('pointer-events-none', 'opacity-0');
    overlay.classList.add('fade-to-black');
    spinner.classList.remove('hidden');
    loadingText.classList.remove('hidden');
    progressContainer.classList.remove('hidden');

    let width = 0;
    interval = setInterval(() => {
    width += 1;
    progressBar.style.width = width + '%';
    if (width >= 100) {
        clearInterval(interval);
        window.open(url, "_blank");
        setTimeout(() => {
        overlay.classList.add('opacity-0', 'pointer-events-none');
        overlay.classList.remove('fade-to-black');
        spinner.classList.add('hidden');
        loadingText.classList.add('hidden');
        progressContainer.classList.add('hidden');
        content.classList.remove('hidden');
        }, 300);
    }
    }, 30);
}