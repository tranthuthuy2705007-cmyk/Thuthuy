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


// lưu các sản phẩm trong giỏ hàng
let cart = [];

// Hiển thị số lượng trên icon giỏ hàng
let cartCount = document.getElementById("cart-count");

// Nơi hiển thị danh sách sản phẩm
let cartItems = document.getElementById("cart-items");

// Nơi hiển thị tổng tiền
let cartTotal = document.getElementById("cart-total");

// Lấy tất cả nút "Thêm vào giỏ"
let cartButtons = document.querySelectorAll(".add-cart");


// Gắn sự kiện cho từng nút
cartButtons.forEach(function(button){

    button.addEventListener("click", function(){

        // Tìm thẻ sản phẩm chứa nút vừa bấm
        let card = this.closest(".card");

        // Lấy tên sản phẩm
        let name = card.querySelector("h4").innerText;

        // Lấy giá sản phẩm
        let priceText = card.querySelector(".price").innerText;

        // Chuyển "200.000đ" thành số 200000
        let price = parseInt(priceText.replace(/\D/g,""));

        // Lấy ảnh sản phẩm
        let image = card.querySelector("img").src;

        // Kiểm tra sản phẩm đã có trong giỏ chưa
        let item = cart.find(p => p.name === name);

        if(item){

            // Nếu có rồi thì tăng số lượng
            item.quantity++;

        }else{

            // Nếu chưa có thì thêm mới vào giỏ
            cart.push({
                name:name,
                price:price,
                image:image,
                quantity:1
            });

        }

        // Cập nhật lại giao diện giỏ hàng
        updateCart();

    });

});


// Hàm cập nhật giao diện giỏ hàng
function updateCart(){

    // Tổng số lượng sản phẩm
    let totalCount = 0;

    // Tổng tiền
    let totalPrice = 0;

    // Xóa danh sách cũ để render lại
    cartItems.innerHTML = "";

    // Duyệt từng sản phẩm trong giỏ
    cart.forEach(function(item,index){

        // Cộng dồn số lượng
        totalCount += item.quantity;

        // Cộng dồn tiền
        totalPrice += item.price * item.quantity;

        // Hiển thị sản phẩm ra HTML
        cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${item.image}" width="60">

                <span>${item.name}</span>

                <span>Số lượng: ${item.quantity}</span>

                <button onclick="removeItem(${index})">
                    Xóa
                </button>

            </div>
        `;
    });

    // Cập nhật số trên icon giỏ hàng
    cartCount.innerText = totalCount;

    // Hiển thị tổng tiền
    cartTotal.innerText =
        totalPrice.toLocaleString("vi-VN") + "đ";
}


// Hàm xóa sản phẩm khỏi giỏ
function removeItem(index){

    // Xóa sản phẩm theo vị trí
    cart.splice(index,1);

    // Cập nhật lại giao diện
    updateCart();
}
