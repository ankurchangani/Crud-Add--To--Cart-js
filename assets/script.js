        let fnameInput = document.getElementById('fname');
        let priceInput = document.getElementById('price');
        let ratingInput = document.getElementById('rating');
        let catagoryInput = document.getElementById('catagory');
        let proDetailsInput = document.getElementById('proDetails');
        let proReviewInput = document.getElementById('proReview');
        // err- genartor

        let errname = document.getElementById('errname');
        let errprice = document.getElementById('errprice');
        let errRating = document.getElementById('errRating');
        let errCategory = document.getElementById('errCategory');
        let errDitails = document.getElementById('errDitails');
        let errReview = document.getElementById('errReview');

        // view
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
                if (fnameInput.value === "") {
                    errname.innerHTML = "Full name is required";
                } else {
                    errname.innerHTML = "";
                }

                if (priceInput.value === "") {
                    errprice.innerHTML = "Please enter the Price";
                } else {
                    errprice.innerHTML = "";
                }

                if (ratingInput.value === "") {
                    errRating.innerHTML = "Please enter The Rating";
                } else {
                    errRating.innerHTML = "";
                }

                if (catagoryInput.value === "") {
                    errCategory.innerHTML = "Please enter The Category";
                } else {
                    errCategory.innerHTML = "";
                }

                if (proDetailsInput.value === "") {
                    errDitails.innerHTML = "Please enter the Product Details";
                } else {
                    errDitails.innerHTML = "";
                }

                if (proReviewInput.value === "") {
                    errReview.innerHTML = "Please enter the Product Review";
                } else {
                    errReview.innerHTML = "";
                }
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
            fnameInput.value = singleRec[0].fname;
            priceInput.value = singleRec[0].price;
            ratingInput.value = singleRec[0].rating;
            catagoryInput.value = singleRec[0].catagory;
            proDetailsInput.value = singleRec[0].proDetails;
            proReviewInput.value = singleRec[0].proReview;
            isedit = true;
            isindex = id;
        };


        // delete data
        const deleteData = (id) => {
            let data = [...adds];

            let deletdeta = data.filter((del) => {
                return del.id !== id;
            });
            localStorage.setItem('productDetails', JSON.stringify(deletdeta));

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


        // add count 
        const addCount = () => {
            carts.innerHTML = Cart.length;
        }
        addCount();
        let Storage = getData();

        const seletedproduct = (id) => {
            let data = [...adds];
        
            let selectedProduct = data.find((p) => p.id === id);
        
            if (!selectedProduct) {
                console.error(`Product with ID ${id} not found.`);
                return;
            }
        
            let existingItem = Cart.find((item) => item.id === selectedProduct.id);
        
            if (existingItem) {
                existingItem.quantity += 1;  // Increment quantity if already in cart
            } else {
                selectedProduct.quantity = 1; // Initialize quantity if not in cart
                Cart.push(selectedProduct);
            }
        
            localStorage.setItem('product-item', JSON.stringify(Cart)); // Update localStorage
            addCount();
        };


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
                        <button type="button" class="btn btn-primary" onclick="singleRec(${rec.id})"><i class="bi bi-pencil-square"></i></button>
                        <button type="button" class="btn btn-danger" onclick="deleteData(${rec.id})"><i class="bi bi-trash-fill"></i></button>

                    
                    </td>

                    <td>
                            <button type="button" class="btn btn-primary mx-2" onclick=" return seletedproduct(${rec.id})"><i class="bi bi-plus-square"></i></button> 
                    </td>
                </tr>`;
            });
        };


        

        dataDisplay();
