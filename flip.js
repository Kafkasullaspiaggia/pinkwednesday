const imageContainers = document.querySelectorAll('.image-container');

imageContainers.forEach(container => {
  container.addEventListener('mouseover', () => {
    container.classList.add('flipped');
  });

  container.addEventListener('mouseout', () => {
    container.classList.remove('flipped');
  });
});