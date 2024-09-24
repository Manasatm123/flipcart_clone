
function getcart() {
    console.log(localStorage.length);
    total = 0;
    let str = ``;
    let str1 = ``;
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));

        total += value.price;

        
        const originalPrice = calculateOriginalPrice(value.price, value.discountPercentage);

        
        str += `
            <div id="subcontainer">
                <div id="imgcontainer">
                    <div id="image">
                        <img src="${value.thumbnail}" alt="Product Image">
                    </div>
                    <div id="details">
                        <div id="brand">${value.brand}</div>
                        <div id="title">${value.title}</div>
                        <div id="prices">
                            <span id="originalPrice">Rs.<del>${originalPrice.toFixed(2)}</del></span>
                             <span id="price">Rs.${value.price}</span>
                             <div id="offer">${value.discountPercentage}% off</div>
                        </div>
                    </div>
                </div>
                <button id="btn" onclick="removeItem(${value.id})">Remove from Cart</button>
            </div>
        `;
    }

    
    str1 = `
        <div id="lst1">
            <li>Amount: Rs.${total.toFixed(2)}</li>
            <li>Discount: 2%</li>
            <li>Delivery Fee: Rs.40</li>
        </div>
    `;

    
    document.getElementById("container").innerHTML = str;
    document.getElementById("listmain").innerHTML = str1;

    
    const discountAmount = (total / 100) * 2;
    const finalAmount = (total - discountAmount) + 80;
    
   
    const totalAmountHTML = `
        <div style="margin-left: 20px;font-size: 20px;" id="tot">Total Amount</div>
        <div id="add">Rs.${finalAmount.toFixed(2)}</div>
    `;
    document.getElementById("totamt").innerHTML = totalAmountHTML;

    console.log("Total Price:", total);
    console.log("Final Amount:", finalAmount);
}

getcart();


function calculateOriginalPrice(discountedPrice, offerPercentage) {
    return discountedPrice / (1 - (offerPercentage / 100));
}


function removeItem(key) {
    localStorage.removeItem(key);
    if (localStorage.length === 0) {
        window.location.href = "./index.html"; 
    } else {
        getcart();  
    }
}


function order() {
    alert("Order Placed Successfully! Thank you.");
}
