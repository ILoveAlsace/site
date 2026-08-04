
(() => {
  const header=document.querySelector('.seo-header');
  const menu=document.querySelector('[data-seo-menu]');
  menu?.addEventListener('click',()=>header?.classList.toggle('open'));

  const box=document.querySelector('.seo-lightbox');
  const boxImg=box?.querySelector('img');
  document.querySelectorAll('[data-lightbox]').forEach(link=>link.addEventListener('click',e=>{
    e.preventDefault(); if(!box||!boxImg)return; boxImg.src=link.href; boxImg.alt=link.querySelector('img')?.alt||''; box.classList.add('open'); document.body.style.overflow='hidden';
  }));
  const closeBox=()=>{box?.classList.remove('open');document.body.style.overflow=''};
  box?.querySelector('button')?.addEventListener('click',closeBox);
  box?.addEventListener('click',e=>{if(e.target===box)closeBox()});
  window.addEventListener('keydown',e=>{if(e.key==='Escape')closeBox()});

  document.querySelectorAll('[data-puzzle]').forEach(puzzle=>{
    let items=[]; try{items=JSON.parse(puzzle.dataset.items||'[]')}catch(_){return}
    const tiles=[...puzzle.querySelectorAll('[data-puzzle-tile]')];
    if(!tiles.length||!items.length)return;
    let cursor=tiles.length, tileCursor=0, paused=matchMedia('(prefers-reduced-motion: reduce)').matches, timer;
    const toggle=puzzle.parentElement?.querySelector('[data-puzzle-toggle]');
    const next=puzzle.parentElement?.querySelector('[data-puzzle-next]');
    const updateLabel=()=>{if(toggle)toggle.textContent=paused?(toggle.dataset.play||'Lecture'):(toggle.dataset.pause||'Pause')};
    const change=()=>{
      const tile=tiles[tileCursor%tiles.length], item=items[cursor%items.length]; if(!tile||!item)return;
      const pre=new Image(); pre.src=item.image; pre.onload=()=>{tile.classList.add('seo-changing');setTimeout(()=>{const img=tile.querySelector('img'),strong=tile.querySelector('strong');if(img){img.src=item.image;img.alt=item.alt}if(strong)strong.textContent=item.name;tile.href=item.url;tile.classList.remove('seo-changing')},260)};
      tileCursor=(tileCursor+1)%tiles.length;cursor=(cursor+1)%items.length;
    };
    const start=()=>{clearInterval(timer);if(!paused&&!document.hidden)timer=setInterval(change,3400)};
    toggle?.addEventListener('click',()=>{paused=!paused;updateLabel();start()});
    next?.addEventListener('click',()=>{for(let i=0;i<Math.min(3,tiles.length);i++)change()});
    document.addEventListener('visibilitychange',start); puzzle.addEventListener('mouseenter',()=>clearInterval(timer));puzzle.addEventListener('mouseleave',start);
    updateLabel();start();
  });

  const finder=document.querySelector('[data-finder]');
  if(finder){
    const capacity=finder.querySelector('[data-capacity]'), checks=[...finder.querySelectorAll('[data-feature]')], cards=[...document.querySelectorAll('[data-stay-card]')], count=document.querySelector('[data-result-count]'), empty=document.querySelector('[data-no-results]');
    const run=()=>{const cap=Number(capacity?.value||0), selected=checks.filter(c=>c.checked).map(c=>c.value);let n=0;cards.forEach(card=>{const okCap=!cap||Number(card.dataset.capacity||0)>=cap;const features=(card.dataset.features||'').split(',');const okFeat=selected.every(s=>features.includes(s));const show=okCap&&okFeat;card.classList.toggle('seo-hidden',!show);if(show)n++});if(count)count.textContent=`${n} ${count.dataset.suffix||''}`;empty?.classList.toggle('seo-hidden',n!==0)};
    finder.addEventListener('change',run);finder.addEventListener('submit',e=>{e.preventDefault();run()});run();
  }
})();
