import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';
import * as data from '../DATA.json';

document.addEventListener("DOMContentLoaded", function() { 
	const hamburgerButtonElement = document.querySelector("#hamburger-btn");
	const hamburgerIcon = hamburgerButtonElement.querySelector('i');
	const navbarDesktop = document.querySelector("#navbar-desktop");
	const navbarMobile = document.querySelector("#navbar-mobile");
	const classNavbarMobile = document.querySelector(".navbar-mobile");
	const navbarItemList = document.querySelector("#navbar-item-list");
	const mainElement = document.querySelector("main");
	
	window.onresize = checkWindowWidth
	window.onload = checkWindowWidth
	getRestaurantsData()

	hamburgerButtonElement.addEventListener("click", event => {
		event.stopPropagation();
		navbarMobile.classList.toggle("open");
		if (classNavbarMobile.classList.contains("open")) {
			hamburgerIcon.className = 'fa fa-times'
		} else {
			hamburgerIcon.className = 'fa fa-bars'
		}
	});

	mainElement.addEventListener("click", event => {
		classNavbarMobile.classList.remove("open");
		hamburgerIcon.className = 'fa fa-bars';
		event.stopPropagation();
	});
	
	function checkWindowWidth() {
		if (window.innerWidth > 768) {
			navbarDesktop.appendChild(navbarItemList)
			navbarMobile.classList.remove("open")
			hamburgerIcon.className = 'fa fa-bars'
			return
		} else {
			navbarMobile.appendChild(navbarItemList)
		}
	}

	function getRestaurantsData() {
		let domRestaurant = ''

		data.restaurants.forEach(function(restaurant) {
		    domRestaurant += `
				<div class="col-12 col-md-3" id="restaurant-${restaurant.id}">
				    <a href="#" class="restaurant-item" title="${restaurant.name}">
				        <article>
				            <img src="${restaurant.pictureId}" class="restaurant-item__image" alt="${restaurant.name} Image">
				            <div class="restaurant-item__container-text">
				                <h3 class="restaurant-item__name">
				                    ${restaurant.name}
				                </h3>
				                <div class="restaurant-item__location">
				                    <i class="fa fa-map-marker location-icon" aria-hidden="true"></i>
				                    ${restaurant.city}
				                </div>
				                <div class="restaurant-item__rating">
				                    <i class="fa fa-star star-icon" aria-hidden="true"></i>
				                    ${restaurant.rating}
				                </div>
				                <div class="restaurant-item__description text-truncate">
				                    ${restaurant.description}
				                </div>
				            </div>
				        </article>
				    </a>
				</div>
		    `
		})

		document.getElementById('restaurant-list__container').innerHTML = domRestaurant
	}
})

