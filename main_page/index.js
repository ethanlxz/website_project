const imageSlider = document.querySelector('.image-slider'); // Select the image slider container
const images = imageSlider.querySelectorAll('img'); // Select all images inside the container
let currentIndex = 0; // Initialize the current index to 0
const slideWidth = images[0].clientWidth; // Get the width of a single image

// Function to change the slide
function changeSlide(n) {
  currentIndex = n;
  imageSlider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Add event listeners to the navigation dots
const dots = document.querySelectorAll('.dot');
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    changeSlide(index);
  });
});

// Automatically change the slide every 3 seconds
setInterval(() => {
  changeSlide((currentIndex + 1) % images.length);
}, 3000);

const imageslider2 = document.querySelector('.imageslider2');
const slides = imageslider2.querySelectorAll('.slide');

slides.forEach(slide => {
  const img = slide.querySelector('img');
  const button = slide.querySelector('.button-overlay');

  // 设置按钮的椭圆形样式
  button.style.borderRadius = '50%';

  // 图片变暗效果
  slide.addEventListener('mouseenter', () => {
    img.style.filter = 'brightness(70%)';
  });

  slide.addEventListener('mouseleave', () => {
    img.style.filter = 'brightness(100%)';
  });
});

var video = document.getElementById("myVideo");

video.onended = function() {
  video.currentTime = 0; 
  video.play(); 
};