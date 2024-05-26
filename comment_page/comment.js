const allStar = document.querySelectorAll('.rating .star');
const ratingValue = document.querySelector('.rating input');
const reviewForm = document.getElementById('reviewForm');
const reviewList = document.querySelector('.review-list');

allStar.forEach((item, idx) => {
    item.addEventListener('click', function () {
        let click = 0;
        ratingValue.value = idx + 1;

        allStar.forEach(i => {
            i.classList.replace('bxs-star', 'bx-star');
            i.classList.remove('active');
        });
        for (let i = 0; i < allStar.length; i++) {
            if (i <= idx) {
                allStar[i].classList.replace('bx-star', 'bxs-star');
                allStar[i].classList.add('active');
            } else {
                allStar[i].style.setProperty('--i', click);
                click++;
            }
        }
    });
});

reviewForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const rating = ratingValue.value;
    const opinion = reviewForm.opinion.value.trim();

    if (rating && opinion) {
        const review = { rating, opinion };
        saveReview(review);
        renderReviews();
        reviewForm.reset();
        allStar.forEach(star => {
            star.classList.replace('bxs-star', 'bx-star');
            star.classList.remove('active');
        });
        ratingValue.value = '';
    }
});

function saveReview(review) {
    let reviews = getReviews();
    reviews.push(review);
    document.cookie = `reviews=${JSON.stringify(reviews)}; path=/`;
}

function getReviews() {
    const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('reviews='));
    return cookie ? JSON.parse(cookie.split('=')[1]) : [];
}

function renderReviews() {
    reviewList.innerHTML = '';
    const reviews = getReviews();
    reviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');

        const reviewRating = document.createElement('div');
        reviewRating.classList.add('review-rating');
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('i');
            star.classList.add('bx', i < review.rating ? 'bxs-star' : 'bx-star', 'star');
            reviewRating.appendChild(star);
        }

        const reviewText = document.createElement('div');
        reviewText.classList.add('review-text');
        reviewText.textContent = review.opinion;

        reviewItem.appendChild(reviewRating);
        reviewItem.appendChild(reviewText);

        reviewList.appendChild(reviewItem);
    });
}

document.querySelector('.btn.cancel').addEventListener('click', () => {
    reviewForm.reset();
    allStar.forEach(star => {
        star.classList.replace('bxs-star', 'bx-star');
        star.classList.remove('active');
    });
    ratingValue.value = '';
});

renderReviews();
