
// --- スプラッシュ画面アニメーション ---
document.addEventListener("DOMContentLoaded", () => {
    const spans = document.querySelectorAll("#splash p span");
    spans.forEach((span, index) => {
        span.style.animationDelay = `${index * 0.25}s`;
    });

    setTimeout(() => {
        const splash = document.getElementById("splash");
        splash.style.animation = "fadeOut 1s forwards";
        setTimeout(() => {
            splash.style.display = "none";
        }, 1000);
    }, 4000);
});
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
        const target = document.querySelector(hash);
        if (target) {
            // 遅延してからスクロールすることで位置ずれを防ぐ
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'auto', block: 'start' });
            }, 100);
        }
    }
});

// --- ハンバーガーメニュー ---
document.querySelector('.g-nav-openbtn').addEventListener('click', function () {
    this.classList.toggle('active');
    document.getElementById('g-nav').classList.toggle('panelactive');
});

document.querySelectorAll('#g-nav a').forEach(function (navLink) {
    navLink.addEventListener('click', function () {
        document.querySelector('.g-nav-openbtn').classList.remove('active');
        document.getElementById('g-nav').classList.remove('panelactive');
    });
});
