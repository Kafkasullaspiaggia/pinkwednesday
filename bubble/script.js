const bubbleContainer = document.querySelector('.bubble-container');
const images = [
  'https://raw.githubusercontent.com/Kafkasullaspiaggia/pinkwednesday/main/bubble/img/FR_HD.png',
  'https://raw.githubusercontent.com/Kafkasullaspiaggia/pinkwednesday/main/bubble/img/ITA_HD.png',
  'https://raw.githubusercontent.com/Kafkasullaspiaggia/pinkwednesday/main/bubble/img/NORD_HD.png',
];
const links = [
  'https://www.example1.com',
  'https://sites.google.com/google.com/it-hardware-guild/home',
  'https://www.example3.com',
];

function createBubble(image, link) {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  const img = document.createElement('img');
  img.src = image;
  bubble.appendChild(img);

  bubble.addEventListener('click', () => {
    window.open(link, '_blank'); // Open link in a new tab
  });

  bubbleContainer.appendChild(bubble);

  // Generate random values for position and size
  const newX = Math.random() * (window.innerWidth - bubble.offsetWidth);
  const newY = Math.random() * (window.innerHeight - bubble.offsetHeight);
  bubble.style.left = newX + 'px';
  bubble.style.top = newY + 'px';

  // Add bubble to animation loop
  moveBubbles(bubble);
}

function moveBubbles(bubble) {
  // Randomize speed
  const speedX = Math.random() * 10 - 8;
  const speedY = Math.random() * 10 - 8;

  // Update bubble position based on speed
  bubble.style.left = parseFloat(bubble.style.left) + speedX + 'px';
  bubble.style.top = parseFloat(bubble.style.top) + speedY + 'px';

  // Keep bubbles within the viewport boundaries
  const centralX = window.innerWidth / 2;
  const centralY = window.innerHeight / 2;
  const maxRadius = Math.min(centralX, centralY) - bubble.offsetWidth / 2; // Adjust for bubble size
  bubble.style.left = Math.max(centralX - maxRadius, Math.min(bubble.style.left, centralX + maxRadius));
  bubble.style.top = Math.max(centralY - maxRadius, Math.min(bubble.style.top, centralY + maxRadius));

  // Schedule the next animation frame
  requestAnimationFrame(function() {
    moveBubbles(bubble);
  });
}

// Create and animate 3 bubbles
for (let i = 0; i < 3; i++) {
  createBubble(images[i], links[i]);
}