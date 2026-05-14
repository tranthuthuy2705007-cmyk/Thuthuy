let slideIndex = 0;
        let timer;
        
        showSlides(slideIndex);
        startTimer(); 
        function moveSlide(n) {
            showSlides(slideIndex += n);
            resetTimer();
        }
        function currentSlide(n) {
            showSlides(slideIndex = n);
            resetTimer();
        }

        function showSlides(n) {
            let i;
            let slides = document.getElementsByClassName("slide");
            let dots = document.getElementsByClassName("dot");
            
            if (n >= slides.length) { slideIndex = 0 }
            if (n < 0) { slideIndex = slides.length - 1 }
            
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            
            slides[slideIndex].style.display = "block";
            dots[slideIndex].className += " active";
        }

        function startTimer() {
            timer = setInterval(function() {
                moveSlide(1);
            }, 2000); 
        }

        function resetTimer() {
            clearInterval(timer);
            startTimer();
        }
document.addEventListener("DOMContentLoaded", function () {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const products = document.querySelectorAll(".card");
    const pageTitle = document.getElementById("page-title"); 
    filterBtns.forEach((btn) => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const filterValue = this.getAttribute("data-filter").toLowerCase();
            
            const categoryName = this.textContent.trim().toUpperCase(); 
            pageTitle.textContent = categoryName;

            products.forEach((item) => {
                const category = item.getAttribute("data-category").toLowerCase();

                item.style.opacity = "0";
                item.style.transform = "scale(0.9)";

                setTimeout(() => {
                    if (filterValue === "all" || category === filterValue) {
                        item.style.display = "block";
                        setTimeout(() => {
                            item.style.opacity = "1";
                            item.style.transform = "scale(1)";
                        }, 50);
                    } else {
                        item.style.display = "none";
                    }
                }, 300);
            });
        });
    });
});