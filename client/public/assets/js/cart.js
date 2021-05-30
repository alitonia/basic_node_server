// var id = 1;
// var product_name = "A Clothe";
// var price = 20;
// var img = "./assets/gen_images/product/1.jpg";
// var quantity = 2;
// var total = 0;
// total = quantity * price;

// const { response } = require("express");

product_1 = {id: 1, product_name:"John Gucci", img: "./gen_images/product/1.jpg",price : 20,quantity:2,color:'Black',size:'M'};
product_2 = {id: 2, product_name:"A Clothe LV", img: "./gen_images/product/2.jpg",price : 10,quantity:5,color:'White',size:'L'};
var an_array= new Array(product_1);
an_array.push(product_2);
var len_array = an_array.length;
const product_url = "/product/1";
fetch(product_url)
.then(response => response.json())
.then(data => {
    var new_product = {id:data[0]["id"],product_name:"John Gucci", img: "./gen_images/product/1.jpg",price : 20,quantity:2,color:'Black',size:'M'};
    an_array.push(new_product)
})
.catch(err => {
    alert('Something went wrong');
})



function loadData(){
   
    // document.getElementById("id").innerHTML = id;
    // document.getElementById("name").innerHTML = product_name;
    // document.getElementById("price").innerHTML = price;
    // document.getElementById("quantity").innerHTML = quantity;
    // document.getElementById("img").innerHTML = img;
    for (i=0;i<len_array;i++){
        // document.write(an_array[i]["id"]);
    }
}
// function setup() {
//     var els = document.getElementsByClassName("remove");
//     for (var i = 0; i < els.length; i++) {
//         els[i].addEventListener('click', function (e) {
//             e.preventDefault();
//             e.target.closest('div.a_product').remove();

//         });
//     }
// }
// setup();
