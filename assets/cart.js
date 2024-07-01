

let carts = document.getElementById("carts");
let addshow = document.getElementById('cart-view-show');

const getCart = () => {
    let cartData = JSON.parse(localStorage.getItem('product-item'));
    if (cartData) {
        cartData = cartData.map(product => ({
            ...product,
            quantity: product.quantity || 1 
        }));
        return cartData;
    } else {
        return [];
    }
};



const viewCart = () => {
    addshow.innerHTML = "";
    let totalPrice = 0;
    
    if (Cart.length > 0) {
        Cart.forEach((product) => {
            addshow.innerHTML += `<tr>
                                    <th>${product.id}</th>
                                    <td>${product.fname}</td>
                                    <td>${product.price}</td>
                                    <td>${product.rating}</td>
                                    <td>${product.catagory}</td>
                                    <td>${product.proDetails}</td>
                                    <td>${product.proReview}</td>
                                    <td>
                                    <button class="btn btn-outline-success p-2" onclick="increaseQuantity(${product.id})">+</button>
                                    <span class="text-warning mx-2">${product.quantity}</span>
                                    <button class="btn btn-outline-info p-2" onclick="decreaseQuantity(${product.id})">-</button>
                                    </td>
                                    <td>
                                    <button class="btn btn-outline-danger p-2" onclick="productdelete(${product.id})">
                                    <i class="bi bi-trash3-fill"></i>
                                    </button>
                                    </td>
                                    </tr>`;
                                    totalPrice += (product.quantity * product.price);
                                });
                                
                                addshow.innerHTML += `<tr>
                                <td colspan="8" class="text-end fw-bold">Total Price:</td>
                                <td colspan="2">${calculateTotalPrice()}</td>
                                </tr>`;
                            } else {
                                addshow.innerHTML = "<tr><td colspan='10' class='text-center'>Cart is empty</td></tr>";
    }
};



const increaseQuantity = (id) => {
    Cart = Cart.map((product) => {
        if (product.id === id) {
            return { ...product, quantity: (product.quantity || 0) + 1 };
        }
        return product;
    });
    localStorage.setItem("product-item", JSON.stringify(Cart));
    viewCart();
};

const decreaseQuantity = (id) => {
    Cart = Cart.map((product) => {
        if (product.id === id && (product.quantity || 0) > 0) {
            return { ...product, quantity: (product.quantity || 0) - 1 };
        }
        return product;
    });
    localStorage.setItem("product-item", JSON.stringify(Cart));
    viewCart();
};

//  productdelete

const productdelete = (id) => {
    console.log("productdelete")
    
    Cart = [...Cart];
    
    let deletdeta = Cart.filter((delid) => {
        return delid.id !== id;
    });
    
    localStorage.setItem("product-item", JSON.stringify(deletdeta));
    Cart = getCart();
    
    viewCart();
};
let Cart = getCart();
const calculateTotalPrice = () => {
    let totalPrice = Cart.reduce((total, product) => {
        return total + (product.quantity * product.price);
    }, 0);
    return totalPrice.toFixed(2);
};


viewCart(); 

