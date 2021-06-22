// chuyển slide 
var slideIndex;
var slides = document.getElementsByClassName("single_slide");
var dots = document.getElementsByClassName("dot");
var nextSlide = document.getElementById("owl_next");
var previousSlide = document.getElementById("owl_previous");
var timeoutSlide = null;

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
    slideIndex++;
    if (slideIndex > slides.length - 1) {
        slideIndex = 0;
    }
    clearTimeout(timeoutSlide);
    timeoutSlide = setTimeout(showSlides, 10000);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function addEventClickDot() {
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", () => {
            currentSlide(i);
        });
    }
}

// function addEventClickPreviousSlide() {
//     previousSlide.addEventListener("click", () => {
//         currentSlide(slideIndex-1); 
//     })
// }

function addEventClickNextSlide() {
    nextSlide.addEventListener("click", () => {
        // console.log(slideIndex);
        currentSlide(slideIndex);
    })
}

addEventClickNextSlide();
// addEventClickPreviousSlide();
addEventClickDot();

showSlides(slideIndex = 0);