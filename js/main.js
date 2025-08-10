// --- 軽量ハイブリッド方式スプラッシュ画面制御クラス ---
class SplashController {
    constructor() {
        this.isPageLoaded = false;
        this.isAnimationDone = false;
        this.startTime = Date.now();

        this.init();
    }

    init() {
        // 最大10秒でタイムアウト（安全装置）
        setTimeout(() => this.forceHide(), 10000);

        // DOM初期化
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initAnimation());
        } else {
            this.initAnimation();
        }

        // ページロード監視
        if (document.readyState === 'complete') {
            this.isPageLoaded = true;
            this.checkHide();
        } else {
            window.addEventListener('load', () => {
                this.isPageLoaded = true;
                this.checkHide();
                this.handleHash();
            });
        }
    }

    initAnimation() {
        const spans = document.querySelectorAll('#splash p span');
        if (!spans.length) {
            this.isAnimationDone = true;
            this.checkHide();
            return;
        }

        // spanアニメーション遅延設定
        spans.forEach((span, i) => {
            span.style.animationDelay = `${i * 0.25}s`;
        });

        // アニメーション完了タイマー
        const duration = this.getAnimationDuration(spans[0]) || 1;
        const totalTime = ((spans.length - 1) * 0.25 + duration + 0.5) * 1000;

        setTimeout(() => {
            this.isAnimationDone = true;
            this.checkHide();
        }, totalTime);
    }

    getAnimationDuration(element) {
        const style = getComputedStyle(element);
        return parseFloat(style.animationDuration) || 1;
    }

    checkHide() {
        if (!this.isPageLoaded || !this.isAnimationDone) return;

        const elapsed = Date.now() - this.startTime;
        const remaining = 3000 - elapsed;

        if (remaining <= 0) {
            this.hideSplash();
        } else {
            setTimeout(() => this.hideSplash(), remaining);
        }
    }

    hideSplash() {
        const splash = document.getElementById('splash');
        if (!splash || splash.style.display === 'none') return;

        splash.style.animation = 'fadeOut 1s forwards';
        setTimeout(() => splash.style.display = 'none', 1000);
    }

    handleHash() {
        const hash = location.hash;
        if (!hash) return;

        const target = document.querySelector(hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 1600);
        }
    }

    forceHide() {
        const splash = document.getElementById('splash');
        if (splash && splash.style.display !== 'none') {
            splash.style.animation = 'fadeOut 1s forwards';
            setTimeout(() => splash.style.display = 'none', 1000);
        }
    }
}

// --- 初期化 ---
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new SplashController());
} else {
    new SplashController();
}

// エラー時強制非表示
window.addEventListener('error', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash');
        if (splash) splash.style.display = 'none';
    }, 3000);
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
