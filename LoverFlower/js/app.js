
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


