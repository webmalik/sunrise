import $ from "jquery";
import Swiper from "swiper";
import { Navigation, Autoplay, Pagination } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export function isWebp() {
	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});
}

export function burgerMenu() {
	$('.header__burger').on("click", function (event) {
		$('.header__nav').toggleClass('active');
		$('.header__icon').toggleClass('open');
		$('body').toggleClass('lock');
	});
}

export function nav_mobile() {
	// Функція для додавання або видалення класу
	function toggleClass(element, className) {
		if (element.classList.contains(className)) {
			element.classList.remove(className);
		} else {
			element.classList.add(className);
		}
	}

	// Функція, яка обробляє клік на елементі аккордеону
	function handleAccordionClick(event) {
		event.preventDefault();
		const listItem = event.currentTarget.parentNode;
		toggleClass(listItem, "active");

		// Згортаємо/розгортаємо аккордеони в інших елементах
		const otherListItems = document.querySelectorAll(".header__dropdown.active");
		otherListItems.forEach((item) => {
			if (item !== listItem) {
				item.classList.remove("active");
			}
		});
	}

	// Функція для додавання обробника кліку на елементи аккордеону
	function addAccordionEventHandlers() {
		const dropdownLinks = document.querySelectorAll(".header__dropdown > a");
		dropdownLinks.forEach((link) => {
			link.addEventListener("click", handleAccordionClick);
		});
	}

	addAccordionEventHandlers();

}

export function bannerSlide() {
	const Banner = new Swiper('.swiper', {
		modules: [Navigation],
		slidesPerView: 1,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-prev',
			prevEl: '.swiper-button-next',
		},
		centeredSlides: true,

	})

	Banner.init()
}

export function tabs() {
	// Отримуємо всі елементи табів (посилання і контент)
	const tabLinks = document.querySelectorAll('.tabs__link');
	const tabContents = document.querySelectorAll('.tabs__content');

	// Функція для переключення активного табу
	function switchTab(event) {
		event.preventDefault();

		// Приховуємо всі контенти табів
		tabContents.forEach(content => {
			content.classList.remove('active');
		});

		// Знімаємо активний стан з усіх посилань табів
		tabLinks.forEach(link => {
			link.classList.remove('active');
		});

		// Додаємо активний стан до обраного табу
		const targetTab = document.querySelector(this.getAttribute('href'));

		setTimeout(() => {
			targetTab.classList.add('active');
		}, 500);
		this.classList.add('active');
	}

	// Додаємо обробник події для кожного посилання табу
	tabLinks.forEach(link => {
		link.addEventListener('click', switchTab);
	});
}

export function sticky() {
	window.addEventListener('scroll', function () {
		$('header').toggleClass('sticky', window.scrollY > 0);
	});
}

export function pageNav() {
	const headerLinks = $('.header__link');

	headerLinks.each(function () {
		$(this).on('click', function (event) {
			event.preventDefault();

			const targetId = $(this).attr('href');
			const targetElement = $(`${targetId}:first`);
			const targetOffset = targetElement.offset().top - 100;
			$('html, body').animate({
				scrollTop: targetOffset
			}, 800);
		});
	});

	function activateMenuItem() {
		const scrollPosition = $(window).scrollTop();

		headerLinks.each(function () {
			const section = $(`${$(this).attr('href')}:first`);
			if (
				section.offset().top <= scrollPosition + 105 &&
				section.offset().top + section.outerHeight() > scrollPosition + 105
			) {
				headerLinks.removeClass('active');
				headerLinks.parent().removeClass('active');
				$(this).addClass('active');
				$(this).parent().addClass('active');
			}
		});
	}

	$(window).on('scroll', activateMenuItem);
}

export function aos_js() {
	Aos.init();
}

export function slider() {
	const slider = new Siema({
		selector: '.slider',
		loop: true,
		onChange: updatePagination,
		duration: 1000,
		perPage: 4,
		easing: 'ease-out',
	});

	function updatePagination() {
		const paginationItems = Array.from(document.querySelectorAll('.slider-pagination li'));
		paginationItems.map((item, index) => {
			if (index === slider.currentSlide) {
				item.classList.add('active');
			} else {
				item.classList.remove('active');
			}
		});
	}

	function startAutoPlay(intervalTime) {
		let autoPlayInterval = setInterval(function () {
			slider.next();
			updatePagination();
		}, intervalTime);
	}
	updatePagination();
	startAutoPlay(5000);
}

export function tel() {
	var input = document.getElementById("phone-ip");

	input.onfocus = function (e) {
		if (this.value === '') {
			this.value += '+38 (';
		}
	};

	input.onkeyup = function (e) {
		var len = this.value.length;
		if (len === 8) {
			this.value += ') ';
		}
		if (len === 9) {
			this.value += ' ';
		}
		if (len === 12) {
			this.value += '-';
		}
	}
	if (len === 15) {
		this.value += '-';
	}
}