let url= window.location.href;
let urlParams = new URLSearchParams(url.split("?")[1])
let id=urlParams.get("id")
let data
console.log(id);

async function getDetails() {
    const res=await fetch(`https://dummyjson.com/products/${id}`);
    data=await res.json()
    console.log(data);

    const originalPrice = calculateOriginalPrice(data.price, data.discountPercentage);

    let img=``
    data.images.map((image)=>{
        img+=`<img src=${image} alt="no image" onmouseover="changePic('${image}')"/>`
    })
    document.getElementById("images").innerHTML=img
    document.getElementById("container").innerHTML=`
    <div id="container1"> 
        <div id="image">
            <img id="img1" src="${data.thumbnail}" alt="">
        </div>
        <div id="productDetails">
            <div id="brand">${data.brand}</div>
            <div id="title">${data.title}</div>
            <div id="originalPrice">Rs.<del>${originalPrice.toFixed(2)}</del></div>
           <div id="price">Rs.${data.price}</div>
           
            <div id="offer">${data.discountPercentage}% offer</div>
             <div id="rating">Rating : ${data.rating}</div>
    <div id="btns">
        <button id="buy">Buy Now</button>
     <button id="add" onclick="Addtocart()">Add to Cart</button>
    </div>
        </div>`
  
        
    
    
}
getDetails()

function changePic(image){
    console.log(image);
    document.getElementById("img1").src=image;
    
}
function calculateOriginalPrice(discountedPrice, offerPercentage) {
    return discountedPrice / (1 - (offerPercentage / 100));
}

function Addtocart(){
    console.log(data);
    localStorage.setItem(data.id,JSON.stringify(data))
    window.location.href='./cart.html';

    
}