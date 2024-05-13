document.addEventListener("DOMContentLoaded", function() {
    const pleaseBlurElement = document.querySelector('.pleaseblur');
    const goBlurItems = document.querySelectorAll('.go-blur');

    goBlurItems.forEach(item => {
        item.addEventListener("mouseenter", function() {
            pleaseBlurElement.classList.add("blur");
        });

        item.addEventListener("mouseleave", function() {
            pleaseBlurElement.classList.remove("blur");
        });
    });
});
