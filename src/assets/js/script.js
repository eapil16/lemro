'use strict';

document.addEventListener('DOMContentLoaded', () => {

	$('.menu-toggle-cont').click(function (e) {
   e.preventDefault();
    if (!$(this).hasClass('menu-toggle-cont_active')) { 
      $(this).addClass('menu-toggle-cont_active'); 
      $('.fixed-menu').slideDown(300); 
      $('body').addClass('hidd'); 
    } else { 
      $(this).removeClass('menu-toggle-cont_active'); 
      $('.fixed-menu').slideUp(300);
      $('body').removeClass('hidd');
    } 
  }); 

  document.querySelectorAll('.main-menu li a').forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();

			document.querySelectorAll('.main-menu li a').forEach(link => {
				link.classList.remove('active');
			});

			this.classList.add('active');

			const targetId = this.getAttribute('data-target');
			const targetElement = document.getElementById(targetId);

			if (targetElement) {
				targetElement.scrollIntoView({ behavior: 'smooth' });
			}
		});
	});

	function onScroll() {
		const sections = document.querySelectorAll('.block-content'); 
		const sidebarLinks = document.querySelectorAll('.main-menu li a');
		
		let currentSectionId = ''; 

		sections.forEach(section => {
			const sectionTop = section.getBoundingClientRect().top;
			const sectionHeight = section.offsetHeight;

			if (sectionTop <= window.innerHeight / 2 && sectionTop + sectionHeight > window.innerHeight / 2) {
				currentSectionId = section.getAttribute('id');
			}
		});

		sidebarLinks.forEach(link => {
			const targetId = link.getAttribute('data-target');
			if (targetId === currentSectionId) {
				link.classList.add('active');
			} else {
				link.classList.remove('active');
			}
		});
	}

	window.addEventListener('scroll', onScroll);

	window.addEventListener('load', onScroll);

  document.querySelector('body').addEventListener('click', e => {
    if (e.target.closest('.main-menu__link') && (window.innerWidth <= 991)) {
      $('.fixed-menu').slideUp(300);
      $('body').removeClass('hidd');
      $('.menu-toggle-cont').removeClass('menu-toggle-cont_active');
    }
    if (e.target.closest('.to-calculate')) {
      document.querySelector('#calculator').scrollIntoView({ behavior: 'smooth' });
    };
    if (e.target.closest('.button-edit')) {
      e.target.closest('.orders-item').querySelector('.form-group__hidden').classList.add('show');
    };
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      document.querySelector('.header').classList.add('sticky');
    } else {
      document.querySelector('.header').classList.remove('sticky');
    }
  });

  if (window.scrollY > 0) {
    document.querySelector('.header').classList.add('sticky');
  } else {
    document.querySelector('.header').classList.remove('sticky');
  }

  setTimeout(function() {
    $('select').styler();
  }, 100)
  
  jQuery(function($){
    $(".phone").mask("+7 (999) 999 - 99 - 99");
  });

  document.querySelectorAll('.form-file').forEach(function (formFile) {
    const actualBtn = formFile.querySelector('.actual-btn');
    const fileChosen = formFile.querySelector('.form-file__chosen');
    const fileCLabel = formFile.querySelector('.form-file__label');
    const fileButton = formFile.querySelector('.form-file__button');
    const clearButton = formFile.querySelector('.form-file__clear');

    if (actualBtn) {
      actualBtn.addEventListener('change', function () {
        if (this.files.length === 0) {  
          fileChosen.classList.remove('show');
          fileChosen.textContent = '';  
        } else {  
          fileChosen.textContent = this.files[0].name;  
          fileChosen.classList.add('show');
          fileCLabel.classList.add('hide');  
          fileButton.classList.add('button-hidden');
          clearButton.classList.add('show');  
        }
      });

      clearButton.addEventListener('click', function (event) {
        event.preventDefault();  
        actualBtn.value = '';  
        fileChosen.classList.remove('show'); 
        fileChosen.textContent = '';  
        fileCLabel.classList.remove('hide'); 
        fileButton.classList.remove('button-hidden');
        clearButton.classList.remove('show');  
      });
    }
  });




});
