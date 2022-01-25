
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

async function getProducts(){
	const file = "json/products.json";
	let response = await fetch(file,{
		method:"GET"
	});

	if(response.ok){
		let result = await response.json();
		filterProducts(result);
		console.log(result);
	}
}





async function getProducts(){
	const file = "json/products.json";
	let response = await fetch(file,{
		method:"GET"
	});

	if(response.ok){
		let result = await response.json();
		loadProducts(result);
	}
}

function loadProducts(data){
	const mainPageItems = document.querySelector(".swiper-wrapper");
	const catalogPageItems = document.querySelector(".products-catalog");
	let url = window.location.href;
	let clean_url = url.replace(/(\\|\/)/g,'')
	let productTemplateStart;
	
	data.products.forEach(item =>{
		const productId = item.id;
		const productUrl = item.url;
		const productImage = item.image;
		const productTitle = item.title;
	//	const productText = item.text;
		const productPrice = item.price;
		const productPriceOld = item.priceOld;
		const productLabels = item.labels;
		const productPopularity = item.popular;


	
			
		

		if((clean_url== 'http:localhost:3000index.html' || clean_url== 'http:localhost:3000' )){
			productTemplateStart = `<div data-pid="${productId}" class="swiper-slide">`;
		}else if(clean_url == 'http:localhost:3000catalog.html'){
			productTemplateStart = `<div data-pid="${productId}" class="item-product">`;
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
		<img src="${productImage}" alt="${productTitle}"></a>
		`

		let productTemplateBody = `
		<p class="item-product__title">${productTitle}</p>
		<p class="item-product__price">${productPrice}</p>
		`

		let productTemplatePrices = ``;
		let productTemplatePricesStart = `<div class="item-product__prices">`;
		let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
		let productTemplatePricesOld = `<del class="item-product__price item-product__oldPrice">Rp ${productPriceOld}</del>`;
		let productTemplatePricesEnd = `</div>`;

		productTemplatePrices = productTemplatePricesStart;
		productTemplatePrices += productTemplatePricesCurrent;

		if(productPriceOld){
			productTemplatePrices += productTemplatePricesOld;
		}
		productTemplatePrices += productTemplatePricesEnd;

		let productTemplateButton = `
		<div class="item-product__button">
			<button class="button-cart">В корзину</button>
		</div>
		`;
		
		let productTemplate = "";
		productTemplate += productTemplateStart;
	//	productTemplate += productTemplateLabels;
		productTemplate += productTemplateImage;
		productTemplate += productTemplateBody;
		productTemplate += productTemplatePrices;
		productTemplate += productTemplateButton;
		productTemplate += productTemplateEnd;



		if((clean_url== 'http:localhost:3000index.html' || clean_url== 'http:localhost:3000')){
			mainPageItems.insertAdjacentHTML("beforeend", productTemplate);
		}else if(clean_url == 'http:localhost:3000catalog.html'){
			catalogPageItems.insertAdjacentHTML("beforeend", productTemplate);
		}
	
	});

}



window.onload = function(){
    getProducts();
    let url = window.location.href;
	let clean_url = url.replace(/(\\|\/)/g,'')
    if(window.outerWidth >= windowTrigger && clean_url== 'http:localhost:3000index.html' || clean_url== 'http:localhost:3000'){
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

console.log(swiper);
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
		console.log("spiwer destroyed");
	}
}
if(clean_url== 'http:localhost:3000index.html'){
onresize = function(){
	let width = window.innerWidth;
	if(width >= windowTrigger){
			swiperInit();
			
	}else{
			swiperDestroy();
		
		}
}
}





