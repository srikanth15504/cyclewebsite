const navbarEmail = document.querySelector('#navbar-email');
const desktopMenu = document.querySelector('#desktop-menu');
const navbarShoppingCar = document.querySelector('#navbar-shopping-cart');
const producDetail = document.querySelector('#product-detail');
const cardsContainer = document.querySelector('#cards-container');
const menu = document.querySelector('#menu');
const mobileMenu = document.querySelector('#mobile-menu');
const productDetails = document.querySelector('#product-details');
const productDetailsRigthAsideImg = document.querySelector('#product-details-rigth-aside-img');
const productDetailsRigthAsidePrice = document.querySelector('#product-details-rigth-aside-price');
const productDetailsRigthAsideName = document.querySelector('#product-details-rigth-aside-name');
const productDetailsRigthAsideDescription = document.querySelector('#product-details-rigth-aside-description');
const productDetailsClose = document.querySelector('#product-details-close');
const containerListProduct = document.querySelector('#container-list-product');
const totalValue = document.querySelector('#total-value');
const productCounter = document.querySelector('#product-counter');
const containerAsideAdd = document.querySelector('#container-aside-add');

let productList = [];
let allProduct= [];

class NewProducts{
    constructor(name,price,photo,description){
        this.name = name;
        this.price = price;
        this.photo = photo;
        this.description = description;
    };
};

let bike = new NewProducts('Bike',120,'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940','A bike with the best tools to cover any terrain');
let superBycicle = new NewProducts('Super Bycicle',250,'https://i.pinimg.com/564x/30/93/1d/30931d7db5773497aa6ba7c9971c8d4c.jpg','Super Bycicle is an great product!');
let montainCycle = new NewProducts('Montain Bycicle',240,'https://i.pinimg.com/564x/5c/13/14/5c131489b8abdf65559cd973039a9aa1.jpg','This is an great montain bycicle for youngs');

productList.push(bike,superBycicle,montainCycle);

// events of click
navbarShoppingCar.addEventListener('click',showAside);
navbarEmail.addEventListener('click',showdesktopMenu);
menu.addEventListener('click',showBurguer);
productDetailsClose.addEventListener('click',closeProductDetails);
cardsContainer.addEventListener('click',addToBag);
containerAsideAdd.addEventListener('click',addToBagTwo);

function addToBag(e) {
    if(e.target.classList.contains('btn-add-cart')) {
        const productElement = e.target.parentElement.parentElement.parentElement.parentElement

        const objetProduct = {
            quantity : 1,
            title : productElement.querySelector('h3').textContent,
            price : productElement.querySelector('p').textContent,
            image : productElement.querySelector('img').textContent,
        };
        // allProduct = [...allProduct,objetProduct];
        console.log(objetProduct,allProduct,productElement.querySelector('img'));

        const ifProduct = allProduct.some(product => product.title == objetProduct.title);

        if(ifProduct) {
            const validation = allProduct.map(product => {
                if(product.title === objetProduct.title) {
                    product.quantity++;
                    return product;
                } else {
                    return product;
                };
            });
            allProduct = [...validation];
        } else {
            allProduct = [...allProduct,objetProduct];
        }

        // console.log(ifProduct);
        showHTML();
        console.log('sigue escuchando');
    };
};
function addToBagTwo(e) {
    if(e.target.classList.contains('primary-button')) {
        const productElement = e.target.parentElement;
        const objetProduct = {
            quantity : 1,
            title : productElement.querySelector('span').textContent,
            price : productElement.querySelector('p').textContent,
            image : productElement.querySelector('img').textContent,
        };
         // allProduct = [...allProduct,objetProduct];
         console.log(productElement);

         const ifProduct = allProduct.some(product => product.title == objetProduct.title);

         if(ifProduct) {
             const validation = allProduct.map(product => {
                 if(product.title === objetProduct.title) {
                     product.quantity++;
                     return product;
                 } else {
                     return product;
                 };
             });
             allProduct = [...validation];
         } else {
             allProduct = [...allProduct,objetProduct];
         }

         // console.log(ifProduct);
        showHTML();
        console.log('sigue escuchando');
    };
};
// cardsContainer.addEventListener('click', e=>{
//     if(e.target.classList.contains('btn-add-cart')) {
//         const productElement = e.target.parentElement.parentElement.parentElement.parentElement

//         const objetProduct = {
//             quantity : 1,
//             title : productElement.querySelector('h3').textContent,
//             price : productElement.querySelector('p').textContent,
//             image : productElement.querySelector('img').textContent,
//         };
//         // allProduct = [...allProduct,objetProduct];
//         console.log(objetProduct,allProduct,productElement.querySelector('img'));

//         const ifProduct = allProduct.some(product => product.title == objetProduct.title);

//         if(ifProduct) {
//             const validation = allProduct.map(product => {
//                 if(product.title === objetProduct.title) {
//                     product.quantity++;
//                     return product;
//                 } else {
//                     return product;
//                 };
//             });
//             allProduct = [...validation];
//         } else {
//             allProduct = [...allProduct,objetProduct];
//         }

//         // console.log(ifProduct);
//         showHTML();
//         console.log('escuchando');
//     };
// });
containerListProduct.addEventListener('click', (e) => {
    if(e.target.classList.contains('icon-close')){
        const product = e.target.parentElement;
        const title = product.querySelector('h3').textContent;

        allProduct = allProduct.filter(
            product => product.title !== title
        );
        console.log(product,title,allProduct);
        showHTML();
    }
});
// cardsContainer.addEventListener('click', e => {
//     console.log('Evento click activado para el elemento:', e.target);
//     console.log('¿Tiene la clase "btn-add-cart"?', e.target.classList.contains('btn-add-cart'));
//   });
function showAside() {
    producDetail.classList.toggle('inactive');
    desktopMenu.classList.add('inactive');
    mobileMenu.classList.add('inactive');
    productDetails.classList.add('inactive');
};
function showdesktopMenu() {
    producDetail.classList.add('inactive');
    desktopMenu.classList.toggle('inactive');
};
function showBurguer() {
    mobileMenu.classList.toggle('inactive');
    producDetail.classList.add('inactive');
};
function showDetailsProduct() {
    productDetails.classList.toggle('inactive');
    showDetailsProducts();
};
function showCards() {
    for(const product of productList){

        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        cardsContainer.appendChild(productCard);

        const img = document.createElement('img');
        img.setAttribute('src',product.photo);
        productCard.appendChild(img);
        // img.addEventListener('click',showDetailsProduct);
        img.addEventListener('click',function(){
            showProductDetails();
            showDetailsProducts(product.photo,product.price,product.name,product.description);
        });

        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');
        const frameDiv = document.createElement('div');
        productCard.appendChild(productInfo);
        productInfo.appendChild(frameDiv);

        const price = document.createElement('p');
        price.innerText = '$' + product.price;
        price.setAttribute('class','price');
        frameDiv.appendChild(price);

        const name = document.createElement('h3');
        name.innerText = product.name;
        frameDiv.appendChild(name);

        const figure = document.createElement('figure');
        productInfo.appendChild(figure);

        const label = document.createElement('label');
        label.setAttribute('for',product.name);
        figure.appendChild(label);

        const icon = document.createElement('img');
        icon.setAttribute('src','./public/icons/bt_add_to_cart.svg');
        icon.setAttribute('class','btn-add-cart');
        label.appendChild(icon);

        // const input = document.createElement('input');
        // input.setAttribute('type','radio');
        // input.setAttribute('id',product.name);
        // input.classList.add('inactive');
        // figure.appendChild(input);
    };
};
function showProductDetails() {
    if(productDetails.classList.contains('inactive') === productDetails.classList.contains('inactive')) {
        productDetails.classList.remove('inactive');
    } else {
        return;
    };
};
function showDetailsProducts(image,price,name,description) {
    productDetailsRigthAsideImg.setAttribute('src',image);
    productDetailsRigthAsidePrice.innerText = '$' + price;
    productDetailsRigthAsideName.innerText = name;
    productDetailsRigthAsideDescription.innerText = description;
};
function closeProductDetails() {
    productDetails.classList.add('inactive');
};
const showHTML = () => {

    let total = 0;
    let totalOfProduct = 0;

    containerListProduct.innerHTML = '';

    allProduct.forEach(product => {
        const containerOnlyProduct = document.createElement('div');
        containerOnlyProduct.classList.add('my-order-content');

        containerOnlyProduct.innerHTML = `
        <div class="shopping-cart">
        <div>
        <p>${product.quantity}</p>
        </div>
        <h3>${product.title}</h3>
        <p>${product.price}</p>
        <img src="./public/icons/icon_close.png" class="icon-close" alt="close">
      </div>
        `;
        containerListProduct.appendChild(containerOnlyProduct);
        total = total + parseInt(product.quantity * product.price.slice(1));
        totalOfProduct = totalOfProduct + product.quantity;
    });

    totalValue.innerText = '$' + `${total}`;
    productCounter.innerText = totalOfProduct;
};

window.addEventListener('load',showCards)