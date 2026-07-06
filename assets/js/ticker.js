// Ticker pauses on hover for readability (matches Lovable interaction intent)
(function () {
  var track = document.querySelector('.ticker__track');
  if (!track) return;

  var ticker = track.closest('.ticker');
  if (!ticker) return;

  ticker.addEventListener('mouseenter', function () {
    track.style.animationPlayState = 'paused';
  });

  ticker.addEventListener('mouseleave', function () {
    track.style.animationPlayState = 'running';
  });
})();
