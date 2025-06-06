const wrapperStyle = () => {
    const visual = document.getElementById("visual");
    const visual_img = visual.querySelector("img");
    const wrapper = document.getElementById("wrapper");
    const hero_area = document.getElementById("hero-area");
    const h1 = document.querySelector("#hero-area h1");
    const images = h1.querySelectorAll("img");
    const footer = document.getElementsByTagName("footer")[0];
    const html_element = document.documentElement;

    const visual_width = visual_img.clientWidth;
    const visual_height = visual_img.clientHeight;
    const viewport_width = html_element.clientWidth;

    // iPad Pro対策: PCモードでもタッチデバイスならモバイル扱いに
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isProbablyDesktop = viewport_width > 1280;

    // --- PC向け処理 ---
    if (isProbablyDesktop) {
        const wrapper_width = viewport_width - visual_width;
        wrapper.style.width = wrapper_width + "px";
        wrapper.style.marginLeft = visual_width + "px";
        hero_area.style.height = "60vh";
        footer.style.width = wrapper_width + "px";
        footer.style.marginLeft = visual_width + "px";

    // --- タブレット・スマホ向け処理 ---
    } else {
        wrapper.style.width = "100%";
        wrapper.style.marginLeft = "0px";
        footer.style.marginLeft = "0px";
        hero_area.style.height = visual_height + "px";
        images.forEach(img => {
            img.style.height = (visual_height - 60) + "px";
        });
    }
};

window.addEventListener("load", wrapperStyle);
window.addEventListener("resize", wrapperStyle);
window.addEventListener("orientationchange", wrapperStyle);

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
