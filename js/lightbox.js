// Lightweight reusable lightbox for slideshow images
// Features: click to open, arrow navigation (buttons + keyboard), ESC to close
// Accessibility: role, focus management, ARIA labels

(function(){
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role','dialog');
  overlay.setAttribute('aria-modal','true');
  overlay.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Schliessen">×</button>
      <button class="lightbox-prev" aria-label="Vorheriges Bild">‹</button>
      <img alt="Vergrößertes Bild" />
      <button class="lightbox-next" aria-label="Nächstes Bild">›</button>
    </div>
  `;
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector('img');
  const btnClose = overlay.querySelector('.lightbox-close');
  const btnPrev = overlay.querySelector('.lightbox-prev');
  const btnNext = overlay.querySelector('.lightbox-next');

  let currentImages = []; // NodeList
  let currentIndex = -1;
  let originatingTrigger = null;

  function openLightbox(images, index, trigger){
    currentImages = Array.from(images);
    currentIndex = index;
    originatingTrigger = trigger || images[index];
    updateImage();
    overlay.classList.add('active');
    btnClose.focus();
    document.addEventListener('keydown', onKey);
  }

  function closeLightbox(){
    overlay.classList.remove('active');
    document.removeEventListener('keydown', onKey);
    if(originatingTrigger) originatingTrigger.focus();
  }

  function updateImage(){
    if(currentIndex < 0 || currentIndex >= currentImages.length) return;
    const src = currentImages[currentIndex].getAttribute('src');
    const alt = currentImages[currentIndex].getAttribute('alt') || 'Bild';
    imgEl.src = src;
    imgEl.alt = alt + ' (vergrößert)';
    // hide prev/next if only one
    const single = currentImages.length <= 1;
    btnPrev.style.display = single ? 'none':'block';
    btnNext.style.display = single ? 'none':'block';
  }

  function prev(){
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateImage();
  }
  function next(){
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateImage();
  }
  function onKey(e){
    if(e.key === 'Escape') closeLightbox();
    else if(e.key === 'ArrowLeft') prev();
    else if(e.key === 'ArrowRight') next();
  }

  // Event listeners
  btnClose.addEventListener('click', closeLightbox);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);
  overlay.addEventListener('click', (e)=>{ if(e.target === overlay) closeLightbox(); });

  // Delegate: only open lightbox when clicking directly on the ACTIVE image (not arrows / container)
  document.addEventListener('click', (e) => {
    const target = e.target;
    if(!(target instanceof HTMLElement)) return;
    if(!target.matches('.slideshow img.active')) return; // only active image triggers
    const slideshow = target.closest('.slideshow');
    if(!slideshow) return;
    const images = slideshow.querySelectorAll('img');
    const index = Array.from(images).indexOf(target);
    openLightbox(images, index, target);
  });

  // Enable lightbox for standalone images with the class 'lightbox-trigger'
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.matches('.lightbox-trigger')) return; // Only trigger for standalone images
    const images = [target]; // Treat the single image as an array
    const index = 0; // Single image, so index is 0
    openLightbox(images, index, target);
  });

  // Prevent arrow clicks from bubbling & accidentally triggering other handlers (defensive)
  document.addEventListener('click', (e) => {
    const t = e.target;
    if(!(t instanceof HTMLElement)) return;
    if(t.matches('.slide-arrow')) {
      e.stopPropagation();
    }
  });
})();
