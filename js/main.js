// --- スプラッシュ画面アニメーション開始（DOMContentLoaded時点） ---
let isPageLoaded = false;
let isAnimationDone = false;

document.addEventListener("DOMContentLoaded", () => {
    const spans = document.querySelectorAll("#splash p span");

    spans.forEach((span, index) => {
        span.style.animationDelay = `${index * 0.25}s`;
    });

    // アニメーションが終わるまで約時間（例：span数×0.25s + α）
    const totalAnimationTime = spans.length * 0.25 * 1000 + 500;
    
    setTimeout(() => {
        isAnimationDone = true;
        if (isPageLoaded) {
            hideSplash(); // 両方完了していたらフェードアウト
        }
    }, totalAnimationTime);
});

// --- ページ完全ロードを待つ ---
window.addEventListener("load", () => {
    isPageLoaded = true;
    if (isAnimationDone) {
        hideSplash(); // 両方完了していたらフェードアウト
    }
});

// --- スプラッシュをフェードアウトして非表示にする処理 ---
function hideSplash() {
    const splash = document.getElementById("splash");
    splash.style.animation = "fadeOut 1s forwards";
    setTimeout(() => {
        splash.style.display = "none";
    }, 1000); // アニメーションと同じ時間
}

// --- ハッシュ付き遷移（スプラッシュが消えた後にスクロール） ---
window.addEventListener("load", () => {
    const hash = window.location.hash;
    if (hash) {
        const target = document.querySelector(hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: "auto", block: "start" });
            }, 1600); // スプラッシュ終了後にスクロール
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
