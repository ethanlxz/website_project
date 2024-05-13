var slideIndex = 1;
showSlides(slideIndex);

// 自动滑动图片
var slideInterval = setInterval(function() {
    plusSlides(1); // 每隔一段时间调用 plusSlides() 函数来滑动到下一张图片
}, 3000); // 设置滑动间隔时间为3秒（3000毫秒）

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("image-slider__container")[0].getElementsByTagName("img");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

// 当鼠标悬停在图片上时，停止自动滑动
document.querySelector('.image-slider__container').addEventListener('mouseenter', function() {
    clearInterval(slideInterval);
});

// 当鼠标移出图片时，重新开始自动滑动
document.querySelector('.image-slider__container').addEventListener('mouseleave', function() {
    slideInterval = setInterval(function() {
        plusSlides(1);
    }, 1800);
});

// 原来的按钮点击事件保持不变
document.querySelector('.prev').addEventListener('click', function() {
    plusSlides(-1);
});

document.querySelector('.next').addEventListener('click', function() {
    plusSlides(1);
});