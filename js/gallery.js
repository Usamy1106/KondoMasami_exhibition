function layoutMasonry() {
  const container = document.getElementById('masonry');
  const items = container.getElementsByClassName('item');

  const isMobile = window.innerWidth <= 768;
  const columns = isMobile ? 3 : 4;

  const containerWidth = container.clientWidth;
  const gap = 32; // item間の余白(px)

  // 各itemの実際の幅を計算：item幅×columns + gap×(columns -1) = containerWidth
  const itemWidth = (containerWidth - gap * (columns - 1)) / columns;

  const columnHeights = new Array(columns).fill(0);

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    item.style.width = `${itemWidth}px`; // 幅をJSで指定

    // 一番低い列に追加
    const minCol = columnHeights.indexOf(Math.min(...columnHeights));
    const x = minCol * (itemWidth + gap);
    const y = columnHeights[minCol];

    item.style.transform = `translate(${x}px, ${y}px)`;
    columnHeights[minCol] += item.offsetHeight + gap;
  }

  // コンテナの高さを更新
  container.style.height = `${Math.max(...columnHeights)}px`;
}
// 初回・リサイズでレイアウト実行
window.addEventListener('load', layoutMasonry);
window.addEventListener('resize', () => {
  clearTimeout(window._masonryTimer);
  window._masonryTimer = setTimeout(layoutMasonry, 200);
});

// 拡大表示用モーダルの制御
document.querySelectorAll('#masonry .item img').forEach(img => {
  img.addEventListener('click', () => {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modalImg.src = img.src;
    modal.classList.add('show');
  });
});

// 背景（モーダル全体）をクリックで閉じる
document.getElementById('imageModal').addEventListener('click', (e) => {
  if (e.target.id === 'imageModal') {
    e.currentTarget.classList.remove('show');
  }
});

