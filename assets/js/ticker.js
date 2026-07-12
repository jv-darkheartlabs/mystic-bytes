// Ticker — CSS marquee with JS fallback when animation is unavailable
(function () {
  var track = document.querySelector('.ticker__track');
  if (!track) return;

  var ticker = track.closest('.ticker');
  if (!ticker) return;

  var paused = false;

  function cssMarqueeActive() {
    var style = getComputedStyle(track);
    return style.animationName !== 'none' && style.animationDuration !== '0s';
  }

  function setPaused(next) {
    paused = next;
    if (cssMarqueeActive()) {
      track.style.animationPlayState = paused ? 'paused' : 'running';
    }
  }

  ticker.addEventListener('mouseenter', function () {
    setPaused(true);
  });

  ticker.addEventListener('mouseleave', function () {
    setPaused(false);
  });

  if (cssMarqueeActive()) return;

  // Fallback: slow horizontal scroll (e.g. prefers-reduced-motion or older engines)
  var loopWidth = track.scrollWidth / 2;
  if (!loopWidth) return;

  var speed = 48;
  var offset = 0;
  var last = performance.now();

  function step(now) {
    if (!paused) {
      var dt = Math.min((now - last) / 1000, 0.05);
      offset += speed * dt;
      if (offset >= loopWidth) offset -= loopWidth;
      track.style.transform = 'translate3d(' + (-offset) + 'px, 0, 0)';
    }
    last = now;
    requestAnimationFrame(step);
  }

  track.style.animation = 'none';
  requestAnimationFrame(step);
})();
