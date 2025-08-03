// --- スプラッシュ画面制御クラス ---
class SplashController {
    constructor() {
        this.isPageLoaded = false;
        this.isAnimationDone = false;
        this.animationTimer = null;
        this.hashScrollTimer = null;

        this.init();
    }

    init() {
        // DOMContentLoaded時の初期化
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initSplashAnimation());
        } else {
            this.initSplashAnimation();
        }

        // ページロード完了時の処理
        if (document.readyState === 'complete') {
            this.handlePageLoad();
        } else {
            window.addEventListener('load', () => this.handlePageLoad());
        }
    }

    initSplashAnimation() {
        const splashElement = document.getElementById('splash');
        if (!splashElement) {
            console.warn('Splash element not found');
            return;
        }

        const spans = splashElement.querySelectorAll('p span');
        if (spans.length === 0) {
            console.warn('Splash span elements not found');
            this.isAnimationDone = true;
            this.checkAndHideSplash();
            return;
        }

        // 各spanにアニメーション遅延を設定
        spans.forEach((span, index) => {
            span.style.animationDelay = `${index * 0.25}s`;
        });

        // アニメーション完了時間を計算（最後の要素のアニメーション開始時間 + アニメーション持続時間 + バッファ）
        const lastSpanDelay = (spans.length - 1) * 0.25;
        const animationDuration = this.getAnimationDuration(spans[0]) || 1; // デフォルト1秒
        const totalAnimationTime = (lastSpanDelay + animationDuration + 0.5) * 1000;

        this.animationTimer = setTimeout(() => {
            this.isAnimationDone = true;
            this.checkAndHideSplash();
        }, totalAnimationTime);
    }

    getAnimationDuration(element) {
        try {
            const computedStyle = window.getComputedStyle(element);
            const duration = computedStyle.animationDuration;
            return parseFloat(duration) || 1;
        } catch (error) {
            console.warn('Could not get animation duration:', error);
            return 1;
        }
    }

    handlePageLoad() {
        this.isPageLoaded = true;
        this.checkAndHideSplash();
        this.handleHashNavigation();
    }

    checkAndHideSplash() {
        if (this.isPageLoaded && this.isAnimationDone) {
            this.hideSplash();
        }
    }

    hideSplash() {
        const splash = document.getElementById('splash');
        if (!splash) {
            console.warn('Splash element not found for hiding');
            return;
        }

        // 既に非表示の場合は何もしない
        if (splash.style.display === 'none') {
            return;
        }

        splash.style.animation = 'fadeOut 1s forwards';

        setTimeout(() => {
            splash.style.display = 'none';
            // クリーンアップ
            this.cleanup();
        }, 1000);
    }

    handleHashNavigation() {
        const hash = window.location.hash;
        if (!hash) return;

        const target = document.querySelector(hash);
        if (!target) {
            console.warn(`Hash target not found: ${hash}`);
            return;
        }

        // スプラッシュ終了後にスクロール（フェードアウト時間 + バッファを考慮）
        this.hashScrollTimer = setTimeout(() => {
            try {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } catch (error) {
                console.warn('Scroll to hash failed:', error);
                // フォールバック
                target.scrollIntoView();
            }
        }, 1600);
    }

    cleanup() {
        // タイマーのクリーンアップ
        if (this.animationTimer) {
            clearTimeout(this.animationTimer);
            this.animationTimer = null;
        }

        if (this.hashScrollTimer) {
            clearTimeout(this.hashScrollTimer);
            this.hashScrollTimer = null;
        }
    }

    // 手動でスプラッシュを非表示にするメソッド（デバッグ用）
    forceHide() {
        this.isPageLoaded = true;
        this.isAnimationDone = true;
        this.hideSplash();
    }
}

// --- 初期化 ---
let splashController;

// DOMが準備でき次第、またはすでに準備済みの場合に初期化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        splashController = new SplashController();
    });
} else {
    splashController = new SplashController();
}

// エラーハンドリング：予期しないエラーでスプラッシュが残らないように
window.addEventListener('error', (event) => {
    console.error('Unexpected error occurred:', event.error);
    if (splashController) {
        setTimeout(() => {
            splashController.forceHide();
        }, 3000); // 3秒後に強制非表示
    }
});

// ページ離脱時のクリーンアップ
window.addEventListener('beforeunload', () => {
    if (splashController) {
        splashController.cleanup();
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
