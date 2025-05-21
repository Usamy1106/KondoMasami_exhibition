function switchLang(lang) {
    // 通常の要素のテキスト切り替え
    document.querySelectorAll('[data-lang-' + lang + ']').forEach(el => {
        const newText = el.getAttribute('data-lang-' + lang);
        if (newText) {
            el.textContent = newText;
        }
    });

    // img の alt 切り替え
    document.querySelectorAll('img').forEach(img => {
        const altText = img.getAttribute(`data-lang-${lang}-alt`);
        if (altText) {
            img.setAttribute('alt', altText);
        }
    });
}

document.getElementById('jp').addEventListener('click', () => switchLang('jp'));
document.getElementById('en').addEventListener('click', () => switchLang('en'));

switchLang('jp'); // 初期表示
