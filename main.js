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
    const wrapper_width = viewport_width - visual_width;

    if (viewport_width > 1024) {
        wrapper.style.width = wrapper_width + "px";
        wrapper.style.marginLeft = visual_width + "px";
        hero_area.style.height = 60 + "vh";
        footer.style.width = wrapper_width + "px";
        footer.style.marginLeft = visual_width + "px";
    } else {
        wrapper.style.width = 100 + "%";
        wrapper.style.marginLeft = 0 + "px";
        footer.style.marginLeft = 0 + "px";
        hero_area.style.height = visual_height + "px";
        images.forEach(img => {
            img.style.height = visual_height - 40 + "px";
        });
}
};
window.addEventListener("load", wrapperStyle);
window.addEventListener("resize", wrapperStyle);
window.addEventListener("orientationchange", wrapperStyle);

document.addEventListener("DOMContentLoaded", () => {
    const spans = document.querySelectorAll("#splash p span");
    spans.forEach((span, index) => {
        span.style.animationDelay = `${index * 0.25}s`; // 0.1秒ずつ遅延
    });
    // 3秒後にスプラッシュをフェードアウト + メインを表示
    setTimeout(() => {


        const splash = document.getElementById("splash");
        splash.style.animation = "fadeOut 1s forwards";

        // アニメーション終了後に非表示にしてメインを表示
        setTimeout(() => {
            splash.style.display = "none";

        }, 1000); // フェードアウト時間と合わせる
    }, 3000); // 最初の表示時間
});

//ハンバーガーメニュー
document.querySelector('.g-nav-openbtn').addEventListener('click', function () {
    this.classList.toggle('active'); // ボタンに 'active' クラスを付与・除去
    document.getElementById('g-nav').classList.toggle('panelactive'); // ナビゲーションに 'panelactive' クラスを付与・除去
});

// ナビゲーションのリンクがクリックされたときの処理
document.querySelectorAll('#g-nav a').forEach(function (navLink) {
    navLink.addEventListener('click', function () {
        document.querySelector('.g-nav-openbtn').classList.remove('active'); // ボタンの 'active' クラスを除去
        document.getElementById('g-nav').classList.remove('panelactive'); // ナビゲーションの 'panelactive' クラスを除去
    });
});
