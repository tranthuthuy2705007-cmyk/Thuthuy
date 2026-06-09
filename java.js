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


// ==================== 3. PHẦN GIỎ HÀNG (SỬA LẠI ĐỂ HOẠT ĐỘNG VỚI THANH TRƯỢT) ====================

// Thêm các biến đóng mở thanh trượt giỏ hàng
let sidebarCart = document.getElementById("sidebar-cart");
let cartOverlay = document.getElementById("cart-overlay");

// Hàm Đóng / Mở giỏ hàng
function openCart() {
    sidebarCart.classList.add("open");
    cartOverlay.classList.add("open");
}
function closeCart() {
    sidebarCart.classList.remove("open");
    cartOverlay.classList.remove("open");
}

// Bấm vào icon Giỏ hàng trên header thì mở giỏ hàng ra
document.querySelector(".cart-icon").addEventListener("click", function(e) {
    e.preventDefault(); // Ngăn trang web chuyển hướng
    openCart();
});

// Bấm nút X hoặc bấm ra ngoài màn hình mờ thì đóng giỏ hàng
document.getElementById("close-cart-btn").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);


// --- ĐOẠN LOGIC CỦA BẠN (Đã sửa lại ID cho khớp với HTML) ---
let cart = [];
let cartCount = document.getElementById("cart-count");
let cartItems = document.getElementById("cart-items-container"); 
let cartTotal = document.getElementById("cart-total-price");    
let cartButtons = document.querySelectorAll(".add-cart");

cartButtons.forEach(function(button){
    button.addEventListener("click", function(){
        let card = this.closest(".card");
        let name = card.querySelector("h4").innerText;
        let priceText = card.querySelector(".price").innerText;
        let price = parseInt(priceText.replace(/\D/g,""));
        let image = card.querySelector("img").src;

        let item = cart.find(p => p.name === name);

        if(item){
            item.quantity++;
        }else{
            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }

        updateCart();
        openCart(); // THÊM: Tự động trượt giỏ hàng ra khi khách vừa bấm mua
    });
});

function updateCart(){
    let totalCount = 0;
    let totalPrice = 0;
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `<p style="text-align: center; color: #999; margin-top: 20px;">Giỏ hàng của bạn đang trống.</p>`;
        cartCount.innerText = "0";
        cartTotal.innerText = "0đ";
        return;
    }

    cart.forEach(function(item, index){
        totalCount += item.quantity;
        totalPrice += item.price * item.quantity;

        // Thay đổi giao diện HTML hiển thị cho đẹp giống mẫu bạn yêu cầu
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" class="item-img">
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p class="item-price">${item.price.toLocaleString("vi-VN")}đ</p>
                    <div class="item-qty">
                        <button class="qty-btn" onclick="changeQuantity(${index}, -1)">-</button>
                        <input type="number" value="${item.quantity}" readonly>
                        <button class="qty-btn" onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <span class="delete-item" onclick="removeItem(${index})">Xóa</span>
            </div>
        `;
    });

    cartCount.innerText = totalCount;
    cartTotal.innerText = totalPrice.toLocaleString("vi-VN") + "đ";
}

// THÊM: Hàm tăng giảm số lượng bằng nút + và - trực tiếp trong giỏ hàng
window.changeQuantity = function(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1); // Nếu giảm xuống 0 thì xóa luôn sản phẩm
    }
    updateCart();
}

// Hàm xóa sản phẩm khỏi giỏ
window.removeItem = function(index){
    cart.splice(index, 1);
    updateCart();
}
