(function () {
  var btn = document.querySelector('.cv-print-btn');
  if (!btn) return;

  btn.addEventListener('click', function () {
    window.print();
  });
})();
