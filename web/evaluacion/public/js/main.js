let interval;

function redirectWithFade(button, url) {
    const overlay = document.getElementById('blackOverlay');
    const spinner = document.getElementById('spinner');
    const loadingText = document.getElementById('loadingText');
    const loadingSubText = document.getElementById('loadingSubText');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');
    const content = document.getElementById('content');

    clearInterval(interval);
    progressBar.style.width = '0%';
    progressBar.style.backgroundColor = '#dc2626'; // rojo inicial
    progressPercent.textContent = '';
    progressPercent.classList.add('hidden');

    content.classList.add('hidden');
    overlay.classList.remove('pointer-events-none', 'opacity-0');
    overlay.classList.add('fade-to-black');
    spinner.classList.remove('hidden');
    loadingText.classList.remove('hidden');
    loadingSubText.classList.remove('hidden');

    progressContainer.classList.remove('hidden');

    const newVersionSpan = button.querySelector('.label-new-version');
    const hasNewVersion = !!newVersionSpan;

    const clone = button.cloneNode(true);
    const labelInClone = clone.querySelector('.label-new-version');
    if (labelInClone) {
        labelInClone.remove();
    }
    const cleanText = clone.textContent.trim();

    loadingSubText.innerHTML = '';

    const mainSpan = document.createElement('span');
    mainSpan.textContent = cleanText;
    mainSpan.classList.add('main-text');

    loadingSubText.appendChild(mainSpan);

    if (hasNewVersion) {
        const newVersionSpanClone = document.createElement('span');
        newVersionSpanClone.textContent = 'Nueva versión';
        newVersionSpanClone.classList.add('new-version-text');
        loadingSubText.appendChild(newVersionSpanClone);
    }

    let width = 0;
    interval = setInterval(() => {
        width += 1;
        progressBar.style.width = width + '%';

        // Invertir color: rojo->amarillo->verde
        if (width < 50) {
            let green = 74 + (163 - 74) * (width / 50);
            let red = 220 - (220 - 255) * (width / 50);
            progressBar.style.backgroundColor = `rgb(${Math.round(red)}, ${Math.round(green)}, 74)`;
        } else {
            let green = 163 + (255 - 163) * ((width - 50) / 50);
            let red = 255 - (255 - 22) * ((width - 50) / 50);
            progressBar.style.backgroundColor = `rgb(${Math.round(red)}, ${Math.round(green)}, 74)`;
        }

        progressPercent.textContent = width + '%';
        progressPercent.classList.remove('hidden');

        if (width >= 100) {
            clearInterval(interval);
            window.open(url, '_blank');
            setTimeout(() => {
                overlay.classList.add('opacity-0', 'pointer-events-none');
                overlay.classList.remove('fade-to-black');
                spinner.classList.add('hidden');
                loadingText.classList.add('hidden');
                loadingSubText.classList.add('hidden');
                progressContainer.classList.add('hidden');
                progressPercent.classList.add('hidden');
                content.classList.remove('hidden');
            }, 300);
        }
    }, 30);
}

window.addEventListener('DOMContentLoaded', () => {
    const newVersionLabels = document.querySelectorAll('.label-new-version');
    newVersionLabels.forEach(label => label.classList.add('bounce'));
});