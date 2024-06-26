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
    const speedX = Math.random() * 4 - 2;
    const speedY = Math.random() * 4 - 2;
  
    // Update bubble position based on speed and scrollSpeed
    bubble.style.left = parseFloat(bubble.style.left) + speedX + scrollSpeed + 'px';
    bubble.style.top = parseFloat(bubble.style.top) + speedY + scrollSpeed + 'px';
  
    // Keep bubbles within the viewport boundaries
    const bubbleWidth = bubble.offsetWidth;
    const bubbleHeight = bubble.offsetHeight;
    bubble.style.left = Math.max(0, Math.min(bubble.style.left, window.innerWidth - bubbleWidth));
    bubble.style.top = Math.max(0, Math.min(bubble.style.top, window.innerHeight - bubbleHeight));
  
    // Schedule the next animation frame
    requestAnimationFrame(function() {
      moveBubbles(bubble);
    });
  }
  
  // Create and animate 3 bubbles
  for (let i = 0; i < 3; i++) {
    createBubble(images[i], links[i]);
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', function() {
    const deltaY = window.scrollY - scrollSpeed; // Calculate scroll delta
    scrollSpeed = window.scrollY; // Update scrollSpeed
  
    // Adjust bubble movement based on scroll direction
    if (deltaY > 0) {
      // Scroll down
      scrollSpeed += 0.1; // Increase scroll speed
    } else if (deltaY < 0) {
      // Scroll up
      scrollSpeed -= 0.1; // Decrease scroll speed
    }
  });
  
  function detectBubbleCollisions(bubble) {
    const allBubbles = document.querySelectorAll('.bubble');
  
    for (let otherBubble of allBubbles) {
      if (bubble !== otherBubble) {
        const distanceX = bubble.style.left - otherBubble.style.left;
        const distanceY = bubble.style.top - otherBubble.style.top;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  
        const combinedRadius = bubble.offsetWidth / 2 + otherBubble.offsetWidth / 2;
  
        if (distance <= combinedRadius) {
          // Collision detected!
          const angle = Math.atan2(distanceY, distanceX);
          const speedX1 = speedX * Math.cos(angle) - speedY * Math.sin(angle);
          const speedY1 = speedX * Math.sin(angle) + speedY * Math.cos(angle);
          const speedX2 = -speedX1;
          const speedY2 = -speedY1;
  
          bubble.style.left = parseFloat(bubble.style.left) + speedX1 + 'px';
          bubble.style.top = parseFloat(bubble.style.top) + speedY1 + 'px';
          otherBubble.style.left = parseFloat(otherBubble.style.left) + speedX2 + 'px';
          otherBubble.style.top = parseFloat(otherBubble.style.top) + speedY2 + 'px';
        }
      }
    }
  }