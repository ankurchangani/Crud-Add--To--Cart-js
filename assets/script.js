let fnameInput = document.getElementById('fname');
let priceInput = document.getElementById('price');
let ratingInput = document.getElementById('rating');
let catagoryInput = document.getElementById('catagory');
let proDetailsInput = document.getElementById('proDetails');
let proReviewInput = document.getElementById('proReview');
// let carts = document.getElementById("carts");
// let addshow = document.getElementById('addShow');
let tbody = document.getElementById('View');

let isedit = false;
let isindex;

const getData = () => {
    let data = JSON.parse(localStorage.getItem('productDetails'));
    if (data) {
        return data;
    } else {
        return [];
    }
};

let adds = getData();

const addData = () => {
    if (isedit) {
        let obj = {
            id: isindex ? isindex : Math.floor(Math.random() * 10000),
            fname: fnameInput.value,
            price: priceInput.value,
            rating: ratingInput.value,
            catagory: catagoryInput.value,
            proDetails: proDetailsInput.value,
            proReview: proReviewInput.value,
        };

        let data = [...adds];

        const updatdeta = data.map((recode) => {
            if (recode.id == isindex) {
                return recode = obj;
            }
            else {
                return recode;
            }
        });

        adds = updatdeta;


        isedit = false;
        isindex = undefined;
    } else {
        let obj = {
            id: Math.floor(Math.random() * 10000),
            fname: fnameInput.value,
            price: priceInput.value,
            rating: ratingInput.value,
            catagory: catagoryInput.value,
            proDetails: proDetailsInput.value,
            proReview: proReviewInput.value,
        };

        adds = [...adds, obj];
    }

    dataDisplay();

    localStorage.setItem('productDetails', JSON.stringify(adds));
    dataDisplay();
    fnameInput.value = '';
    priceInput.value = '';
    ratingInput.value = '';
    catagoryInput.value = '';
    proDetailsInput.value = '';
    proReviewInput.value = '';

    return false;
};
// edit data

const singleRec = (id) => {
    let data = [...adds];

    let singleRec = data.filter((d) => {
        return d.id === id;
    });
    fname.value = singleRec[0].fname;
    price.value = singleRec[0].price;
    rating.value = singleRec[0].rating;
    catagory.value = singleRec[0].catagory;
    proDetails.value = singleRec[0].proDetails;
    proReview.value = singleRec[0].proReview;
    isedit = true;
    isindex = id;
};


// delete data
const deleteData = (id) => {
    let data = [...adds];

    let deletdeta = data.filter((del) => {
        return del.id !== id;
    });
    localStorage.setItem('studentsdata', JSON.stringify(deletdeta));

    adds = deletdeta;
    dataDisplay();
};      

//get cart
const getCart = () => {
    let cardData = JSON.parse(localStorage.getItem('product-item'));
    if (cardData) {
        return cardData;
    } else {
        return [];
    }
}

let Cart = getCart();


const addCount = () => {
    carts.innerHTML = Cart.length;
}
addCount();
let Storage = getData();

// selectProduct
const seletedproduct = (id) => {

    let data = [...adds];

    let addCart = data.filter((p) => {
        return p.id == id;
    })

    console.log("add cart", addCart[0]);
    Cart = [...Cart, addCart[0]];
    localStorage.setItem('product-item', JSON.stringify(Cart));
    addCount();
}


const dataDisplay = () => {
    tbody.innerHTML = '';

    adds.forEach((rec) => {
        tbody.innerHTML += `<tr>
            <td>${rec.id}</td>
            <td>${rec.fname}</td>
            <td>${rec.price}</td>
            <td>${rec.rating}</td>
            <td>${rec.catagory}</td>
            <td>${rec.proDetails}</td>
            <td>${rec.proReview}</td>           
            <td>
                <button type="button" class="btn btn-primary" onclick="singleRec(${rec.id})">Edit</button>
                <button type="button" class="btn btn-danger" onclick="deleteData(${rec.id})">Delete</button>

             
            </td>

            <td>
                    <button type="button" class="btn btn-primary mx-2" onclick=" return seletedproduct(${rec.id})">Add</button> 
            </td>
        </tr>`;
    });
};


dataDisplay();
