const flipcard = document.querySelector('.flipcard');

flipcard.addEventListener('mouseover', () => {
  flipcard.classList.add('flipped');
});

flipcard.addEventListener('mouseout', () => {
  flipcard.classList.remove('flipped');
});