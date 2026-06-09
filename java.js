// lấy tất cả ảnh
let slides = document.querySelectorAll(".slide");

// lấy tất cả chấm tròn
let dots = document.querySelectorAll(".dot");

// ảnh đầu tiên
let slideIndex = 0;


// hàm hiện ảnh
function showSlide() {

    // ẩn tất cả ảnh
    slides.forEach(function(slide) {

        slide.style.display = "none";

    });

    // bỏ active tất cả dot
    dots.forEach(function(dot) {

        dot.classList.remove("active");

    });

    // hiện ảnh hiện tại
    slides[slideIndex].style.display = "block";

    // active dot hiện tại
    dots[slideIndex].classList.add("active");
}



// nút next
function moveSlide(n) {

    // đổi ảnh
    slideIndex = slideIndex + n;

    // nếu quá ảnh cuối
    if (slideIndex >= slides.length) {

        slideIndex = 0;

    }

    // nếu nhỏ hơn 0
    if (slideIndex < 0) {

        slideIndex = slides.length - 1;

    }

    // hiện ảnh
    showSlide();
}



// bấm dot
function currentSlide(n) {

    slideIndex = n;

    showSlide();
}



// tự chạy slide
setInterval(function() {

    moveSlide(1);

}, 2000);


// hiện ảnh đầu tiên
showSlide();


// lấy nút lọc
let filterButtons = document.querySelectorAll(".filter-btn");

// lấy sản phẩm
let products = document.querySelectorAll(".card");

// tiêu đề
let title = document.getElementById("page-title");



// chạy từng nút
filterButtons.forEach(function(button) {

    // khi bấm nút
    button.onclick = function(e) {

        e.preventDefault();

        // lấy loại
        let filter = button.getAttribute("data-filter");

        // đổi tiêu đề
        title.innerText = button.innerText;

        // chạy từng sản phẩm
        products.forEach(function(product) {

            // loại sản phẩm
            let category = product.getAttribute("data-category");

            // nếu là tất cả
            if (filter == "all") {

                product.style.display = "block";

            }

            // nếu giống loại
            else if (filter == category) {

                product.style.display = "block";

            }

            // khác loại thì ẩn
            else {

                product.style.display = "none";

            }

        });

    };

});


// PHẦN GIỎ HÀNG
// ====================

let count = 0;

// lấy icon số
let cartCount = document.getElementById("cart-count");

// lấy tất cả nút
let cartButtons = document.querySelectorAll(".add-cart");

// kiểm tra có tìm thấy không
console.log(cartButtons);

// thêm sự kiện
cartButtons.forEach(function(button){

    button.addEventListener("click", function(){

        count++;

        cartCount.innerText = count;

        alert("Đã thêm vào giỏ hàng");

    });

});
