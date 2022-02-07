const mainPageItems = document.querySelector(".swiper-wrapper");
const catalogPageItems = document.querySelector(".products-catalog");
const items = document.querySelector(".item-product");
const checkbox = document.querySelector('#filters');


if(catalogPageItems || mainPageItems){

function addEvent(elem, type, handler){
    if(elem.addEventListener){
      elem.addEventListener(type, handler, false);
    } else {
      elem.attachEvent('on'+type, function(){ handler.call( elem ); });
    }
    return false;
}
}
async function getProducts(){
	const file = "json/products.json";
	let response = await fetch(file,{
		method:"GET"
	});

	if(response.ok){
		let result = await response.json();

		filter(result)
		loadProducts(result)
	}
}

if(catalogPageItems || mainPageItems){
function filter(data){
	if(catalogPageItems){
		checkbox.addEventListener('input',function(){
			const lights = [...checkbox.querySelectorAll('#light input:checked')].map(n => n.value);
			const colors = [...checkbox.querySelectorAll('#color input:checked')].map(n => n.value);

			loadProducts(data.filter(n =>
				(!lights.length || lights.includes(n.light)) &&
				(!colors.length || colors.includes(n.color))
				))
			})}
        }

function deleteItems(){
	while(catalogPageItems.firstChild){
		catalogPageItems.removeChild(catalogPageItems.lastChild);
	}
}

function loadProducts(items){
	if (catalogPageItems){
		deleteItems();

	}
	let productTemplateStart;

	items.forEach(d =>{
		const productId = d.id;
		const productUrl = d.url;
		const productImage = d.image;
		const productTitle = d.title;
		const productPrice = d.price;
		const productPriceOld = d.priceOld;
		const productLabels = d.labels;


		if((mainPageItems)){
			productTemplateStart = `<div data-id="${productId}" class="swiper-slide">`;
		}else if(catalogPageItems){
			productTemplateStart = `<div data-id="${productId}" class="item-product">`;
		}

		let productTemplateEnd = `</div>`;

		let productTemplateLabels = ``
		if(productLabels){
			let productTemplateLabelsStart = `<div class="item-product__labels">`;
			let productTemplateLabelsEnd = `</div>`;
			let productTemplateLabelsContent = "";

			productLabels.forEach(labelItem => {
				productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
			});

			productTemplateLabels += productTemplateLabelsStart;
			productTemplateLabels += productTemplateLabelsContent;
			productTemplateLabels += productTemplateLabelsEnd;
		}
		let productTemplateImage =
		` <a href="${productUrl}" class="item-product__image">
		<img id="image" src="${productImage}" alt="${productTitle}"></a>
		`
		let productTemplateBody = `
		<p class="item-product__title">${productTitle}</p>
		<p class="item-product__price">${productPrice}</p>
		`
		let productTemplatePrices = ``;
		let productTemplatePricesStart = `<div class="item-product__prices">`;
		let productTemplatePricesEnd = `</div>`;
		productTemplatePrices = productTemplatePricesStart;
		productTemplatePrices += productTemplatePricesEnd;
		let productTemplateButton = `
			<button class="button-cart addToCart">В корзину</button>
		`;
		let productTemplate = "";
		productTemplate += productTemplateStart;
	//	productTemplate += productTemplateLabels;
		productTemplate += productTemplateImage;
		productTemplate += productTemplateBody;
		productTemplate += productTemplatePrices;
		productTemplate += productTemplateButton;
		productTemplate += productTemplateEnd;
		if((mainPageItems)){
			mainPageItems.insertAdjacentHTML("beforeend", productTemplate);
		}else if(catalogPageItems){
			catalogPageItems.insertAdjacentHTML("beforeend", productTemplate);
            
		}
	});
	addToCart();
	itemCount();
}
const cart = document.querySelector('.cart__items');


addToCart = function() {
	if (catalogPageItems){
		var add = document.querySelectorAll('.item-product');
	}else if(mainPageItems){
		var add = document.querySelectorAll('.swiper-slide');
	}
		for(let i = 0; i<add.length;i++){

			addEvent(add[i].querySelector('.addToCart'), 'click', function(){
			let cartData = getCartData() || {},
				itemId = add[i].getAttribute('data-id'),
				itemTitle =add[i].querySelector('.item-product__title').innerHTML,
				itemPrice = add[i].querySelector('.item-product__price').innerHTML,
				itemImage = add[i].querySelector('#image').getAttribute('src');

				itemImage = `<img class="cart__image" src="${itemImage}">`;

				if(cartData.hasOwnProperty(itemId)){
					cartData[itemId][4] += 1;
					// itemCount +=1;
				} else {
					cartData[itemId] = [itemId, itemImage,itemTitle, itemPrice, 1];
				}
				setCartData(cartData)
				openCart();
		})}
	}

addEvent(cart, 'click', function(e){

	if(e.target.className === 'up-button') {
		let itemId = e.target.getAttribute('item-id');
		let cartData = getCartData();
		cartData[itemId][4] +=1;
		setCartData(cartData)
		openCart();
	}else if(e.target.className === 'down-button'){
		let itemId = e.target.getAttribute('item-id');
		let cartData = getCartData();
		cartData[itemId][4] -=1;
		setCartData(cartData)
		openCart();
	}else if(e.target.className === 'delete-button'){
		let itemId = e.target.getAttribute('item-id');
		let cartData = getCartData();
		delete cartData[itemId];
		setCartData(cartData);
		openCart();
	}
		})

function openCart(){
    let cartData = getCartData(),
    totalItems ='';
    if(cartData !== null){
    for(var items in cartData){
	let id = cartData[items][0];
	let img = cartData[items][1];
	let title = cartData[items][2];
	let price = cartData[items][3];
	let count = cartData[items][4];
	totalItems+= `<div class="cart__item item">`
	totalItems+= `<div class="item__id">${id}</div>`
	totalItems+= `<div class="item__img">${img}</div>`
	totalItems+= `<div class="item__title">${title}</div>`
	totalItems+= `<div class="item__price">${price} ₽</div>`

	totalItems += '<div class="upDownContainer">'
	
	if (count<=1){
		totalItems += `<input item-id =  ${id}    id='down' class= 'down-button' type='button' value='-' data-changer='2' disabled>`
	}else{
		totalItems += `<input item-id =  ${id}    id='down' class= 'down-button' type='button' value='-' data-changer='2'>`
	}
	totalItems+= `<div class="item__count">${count}</div>`
	totalItems += `<input item-id =  ${id}    class='up-button' id='up' type='button' value='+' data-changer='1'>`
	totalItems += '</div>';
    totalItems += `<input item-id = ${id} type="button" value='удалить' class="delete-button">`
	totalItems += '</div>';
	totalItems += '<hr class= "cart__hr">'
    }
	
	


    cart.innerHTML = totalItems;
} else {
    cart.innerHTML = 'В корзине пусто!';
}
itemCount();

}


function itemCount(){
	let countArray =[];
	let totalItemsCount = document.querySelector("#totalItemsCount");
	const spanContainer = document.querySelector('#spanContainer');
	[...document.querySelectorAll('.item__count')].map(v=>countArray.push(v.textContent))

	const reducer = (previousValue,currentValue) => +previousValue + +currentValue

	if(countArray.length !== 0){
		spanContainer.classList.add('spanContainer-green');
		totalItemsCount.innerHTML=countArray.reduce(reducer);
	}else{
		spanContainer.classList.remove('spanContainer-green');
		totalItemsCount.innerHTML ='';
	}
}




function setCartData(o){
    localStorage.setItem('cart', JSON.stringify(o));
}
function getCartData(){
    let a = JSON.parse(localStorage.getItem('cart'));
    return a;

}



const buttonOpenCart = document.querySelector('#buttonOpenCart');
const buttonOpenCartMobile = document.querySelector('#buttonOpenCartMobile');
const buttonCloseCart = document.querySelector('#buttonCloseCart');
const cartPage = document.querySelector('.cart');
const wrapper = document.querySelector('.wrapper');

buttonOpenCart.onclick = function(){
	cartPage.classList.add('_opened');
	wrapper.classList.add('_matteEffect');
	openCart()
}
buttonOpenCartMobile.onclick = function(){
	cartPage.classList.add('_opened');
	wrapper.classList.add('_matteEffect');
	openCart()
}

buttonCloseCart.onclick = function(){
	cartPage.classList.remove('_opened');
	wrapper.classList.remove('_matteEffect');
}
}



function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});


const burger = document.querySelector(".burger");
const nav = document.querySelector(".header__list");
const burgerContainer = document.querySelector(".burgerContainer");

burger.onclick = function() {
    burger.classList.toggle("_active");
    nav.classList.toggle("_active");
    document.body.classList.toggle("_lock");
    burgerContainer.classList.toggle("burgerContainer--right");
}



window.onload = function(){
    if(catalogPageItems|| mainPageItems) {
        getProducts();
        openCart();
        itemCount();
    }
    if(window.outerWidth >= windowTrigger && mainPageItems){
        swiperInit();
        setTimeout(function () {
            swiper.update(swiper);
             }, 500);
    }
}
let swiper = null;
let windowTrigger = 768;
let swiperContainer = document.querySelector('.swiper-container');
let url = window.location.href;
let clean_url = url.replace(/(\\|\/)/g,'')

if(mainPageItems){

function swiperInit(){
	if(!swiper){
		swiper = new Swiper('.swiper-container', {
			// Optional parameters
			slidesPerView:3,
			loop: true,
			direction: "horizontal",
			spaceBetween: 50,
			// Navigation arrows
			navigation: {
			    nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			// And if we need scrollbar
			scrollbar: {
			el: '.swiper-scrollbar',
			},
});
}
}

function swiperDestroy(){
	if(swiper){
		swiper.destroy();
		swiper= null;
		
	}
}

onresize = function(){
	let width = window.innerWidth;
	if(width >= windowTrigger){
			swiperInit();
			
	}else{
			swiperDestroy();
		
		}
}


}





const filterBlur= document.querySelector('#filterGreen');
const filterBluePurple = document.querySelector('#filterPurple');

const errorPage = document.querySelector('.error-page');
const deliveryPage = document.querySelector('.delivery');
const aboutPage = document.querySelector('.about');
const faqPage = document.querySelector('.faq');

if(errorPage || faqPage){
    filterBlur.classList.remove('filterBlurGreen');
    filterBlur.classList.add('filterBlurBlue');
    filterBluePurple.classList.remove('filterBlurPurple');
    filterBluePurple.classList.add('filterBlurBLue');
}
if(deliveryPage){
    filterBlur.classList.remove('filterBlurGreen');
    filterBlur.classList.add('filterBlurBrown');
    filterBluePurple.classList.remove('filterBlurPurple');
    filterBluePurple.classList.add('filterBlurBrown');
}
if(aboutPage){
    filterBlur.classList.remove('filterBlurGreen');
    filterBlur.classList.add('filterBlurYellow');
    filterBluePurple.classList.remove('filterBlurPurple');
    filterBluePurple.classList.add('filterBlurYellow');
}

/*

const screenWidth = window.screen.width;
const header = document.querySelector('.header');
const heading = document.querySelector('.main__heading')
const headingMobile = document.querySelector('.heading__mobile');

if(screenWidth <= 767.98){
    window.addEventListener('scroll', function() {
        console.log(window.pageYOffset)
        if(window.pageYOffset >= 850){
            headingMobile.style.display ="block";
            
        }
        if(window.pageYOffset <= 850){
            headingMobile.style.display ="none";
           
        }
    });
}
*/