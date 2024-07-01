

let carts = document.getElementById("carts");
let addshow = document.getElementById('cart-view-show');

const getCart = () => {
    let cartData = JSON.parse(localStorage.getItem('product-item'));
    if (cartData) {
        return cartData;
    } else {
        return [];
    }
};

let Cart = getCart();

const viewCart = () => {
    addshow.innerHTML = "";
    if (Cart.length > 0) {
        Cart.forEach((product) => {
            addshow.innerHTML += `<tr>
                                    <th>${product.id}</th>
                                    <td>${product.fname}</td>
                                    <td>${product.price}</td>
                                    <td>${product.rating}</td>
                                    <td>${product. catagory}</td>
                                    <td>${product.proDetails}</td>
                                    <td>${product.proReview}</td>
                                    <td>
                                        <button class = "btn  btn-outline-success p-2">+</button>
                                        <span class="text-warning mx-2">1</span>
                                        <button class="btn btn-outline-info p-2">-</button>
                                    </td>
                                    <td>
                                        <button class="btn btn-outline-danger p-2"><i class="bi bi-trash3-fill"></i></button>
                                    </td>
                                   </tr>`;
        });
    }
};

viewCart();
