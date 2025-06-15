const track = document.getElementById('slider-track');

// 必要なだけ picture 要素を複製してループを滑らかに
function duplicateItems() {
    const pictures = track.querySelectorAll('picture');
    const cloneCount = pictures.length;
    for (let i = 0; i < cloneCount; i++) {
        const clone = pictures[i].cloneNode(true);
        track.appendChild(clone);
    }
}

window.addEventListener('load', () => {
    const sliderWraps = document.querySelectorAll('.gallery-slider__wrap');

    sliderWraps.forEach((wrap) => {
        const slider = wrap.querySelector('.gallery-slider');

        if (!slider) return; // 念のため

        // 複製して追加
        const clone = slider.cloneNode(true);
        wrap.appendChild(clone);

        // 幅を取得してCSS変数で設定
        const totalWidth = slider.offsetWidth;
        wrap.style.setProperty('--scroll-width', `${totalWidth}px`);
    });
});

duplicateItems();