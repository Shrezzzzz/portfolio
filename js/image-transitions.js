/* ── IMAGE HOVER TRANSITIONS ── */
(function() {
  const profileImg = document.getElementById('profileImg');
  const imgContainer = document.querySelector('.aboutImgContainer');

  if (!profileImg || !imgContainer) return;

  // Add hover listener for B&W → Color transition
  imgContainer.addEventListener('mouseenter', () => {
    imgContainer.classList.add('hov-img');
  });

  imgContainer.addEventListener('mouseleave', () => {
    imgContainer.classList.remove('hov-img');
  });

  // Touch support for mobile
  imgContainer.addEventListener('touchstart', (e) => {
    e.preventDefault();
    imgContainer.classList.add('hov-img');
    setTimeout(() => {
      imgContainer.classList.remove('hov-img');
    }, 2000);
  });

  console.log('Image transitions initialized.');
})();
