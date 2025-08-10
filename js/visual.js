// シンプルなデバイス・向き検出
function getDeviceInfo() {
    const userAgent = navigator.userAgent.toLowerCase();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const aspectRatio = screenWidth / screenHeight;

    // 1. スマホかどうか（画面サイズで判定）
    const isPhone = Math.min(screenWidth, screenHeight) < 767;

    // 2. 横向きか縦向きか
    const isLandscape = screenWidth > screenHeight;

    // 3. 画面比率（横長かどうか）
    const isWideScreen = aspectRatio > 1.2; // 比率1.2以上を横長とする

    return {
        isPhone,
        isLandscape,
        isWideScreen,
        aspectRatio: Math.round(aspectRatio * 100) / 100 // 小数点2桁で丸める
    };
}

const wrapperStyle = () => {
    const visual = document.getElementById("visual");
    const visual_img = visual.querySelector("img");
    const wrapper = document.getElementById("wrapper");
    const hero_area = document.getElementById("hero-area");
    const h1 = document.querySelector("#hero-area h1");
    const footer = document.getElementsByTagName("footer")[0];
    const html_element = document.documentElement;

    if (!visual_img || !wrapper || !hero_area || !h1 || !footer) {
        console.warn('必要なDOM要素が見つかりません');
        return;
    }

    const visual_width = visual_img.clientWidth;
    const visual_height = visual_img.clientHeight;
    const viewport_width = html_element.clientWidth;

    const deviceInfo = getDeviceInfo();

    console.log('デバイス情報:', {
        ...deviceInfo,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        userAgent: navigator.userAgent.split(' ')[0]
    });

    // 横向きかつワイドなら「横向きレイアウト」、それ以外（縦向き or スマホ）は「縦向きレイアウト」
    const useDesktopLayout = deviceInfo.isLandscape && deviceInfo.isWideScreen;

    if (useDesktopLayout) {
        let wrapper_width = viewport_width - visual_width;
        wrapper.style.width = wrapper_width + "px";
        wrapper.style.marginLeft = visual_width + "px";
        footer.style.width = wrapper_width + "px";
        footer.style.marginLeft = visual_width + "px";
        h1.style.height = "auto";
        console.log('横向きレイアウト適用');
    } else {
        wrapper.style.width = "100%";
        wrapper.style.marginLeft = "0px";
        footer.style.width = "100%";
        footer.style.marginLeft = "0px";
        h1.style.height = (visual_height - 60) + "px";
        console.log('縦向きレイアウト適用');
    }
};

// イベントリスナー
function handleResize() {
    // リサイズ時は少し遅延を入れる（向き変更対応）
    setTimeout(wrapperStyle, 100);
}

window.addEventListener("load", wrapperStyle);
window.addEventListener("resize", handleResize);
window.addEventListener("orientationchange", handleResize);