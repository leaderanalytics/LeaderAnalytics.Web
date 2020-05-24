import { Component, OnInit } from '@angular/core';
import { DialogsComponent, Dialog } from '../dialogs/dialogs.component';
import * as AOS from 'aos';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.Init();
  }

  async Init() {

    const pre_loader = $('#preloader');
    pre_loader.fadeOut('slow', function () {
      $(this).remove();
    });


    // Smooth scroll for the navigation menu and links with .scrollto classes
    $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function (e) {

      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        e.preventDefault();
        const target = $(this.hash);
        if (target.length) {

          let scrollto = target.offset().top;
          let scrolled = 20;

          if ($('#header').length) {
            scrollto -= $('#header').outerHeight()

            if (!$('#header').hasClass('header-scrolled')) {
              scrollto += scrolled;
            }
          }

          if ($(this).attr("href") == '#header') {
            scrollto = 0;
          }

          $('html, body').animate({
            scrollTop: scrollto
          }, 1500, 'easeInOutExpo');

          if ($(this).parents('.nav-menu, .mobile-nav').length) {
            $('.nav-menu .active, .mobile-nav .active').removeClass('active');
            $(this).closest('li').addClass('active');
          }

          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            $('.mobile-nav-overly').fadeOut();
          }
          return false;
        }
      }
    });

    // Mobile Navigation
    if ($('.nav-menu').length) {
      let $mobile_nav = $('.nav-menu').clone().prop({
        class: 'mobile-nav d-lg-none'
      });
      $('body').append($mobile_nav);
      $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
      $('body').append('<div class="mobile-nav-overly"></div>');

      $(document).on('click', '.mobile-nav-toggle', function (e) {
        $('body').toggleClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        $('.mobile-nav-overly').toggle();
      });

      $(document).on('click', '.mobile-nav .drop-down > a', function (e) {
        e.preventDefault();
        $(this).next().slideToggle(300);
        $(this).parent().toggleClass('active');
      });

      $(document).click(function (e) {
        const container = $(".mobile-nav, .mobile-nav-toggle");
        // if (!container.is(e.target) && container.has(e.target).length === 0) {
        if (!$(e.target).is(".mobile-nav, .mobile-nav-toggle") && $(e.target).has(".mobile-nav, .mobile-nav-toggle").length === 0) {
          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            $('.mobile-nav-overly').fadeOut();
          }
        }
      });
    } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
      $(".mobile-nav, .mobile-nav-toggle").hide();
    }


    $(".navbar-collapse a:not(.dropdown-toggle)").on('click', function () {
      $(".navbar-collapse.collapse").removeClass('in');
    });

    ($('#home') as any).owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      dots: false,
      autoplay: true,
      smartSpeed: 2500,
      animateOut: 'fadeOut',
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        1000: {
          items: 1
        }
      }
    });


    const owl = ($('#azure-carousel') as any).owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      dots: false,
      autoplay: true,
      animateOut: 'fadeOut',
      singleItem: true,
      items: 1

    });
    owl.trigger('refresh.owl.carousel');



    ($('#mobiledev-carousel') as any).owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      dots: false,
      autoplay: true,
      smartSpeed: 2500,
      animateOut: 'fadeOut',
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        768: {
          items: 2
        },
        992: {
          items: 2
        },
        1169: {
          items: 3
        }
      }
    });


    

    /*--------------------------
      Back to top button
    ---------------------------- */
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn('slow');
      } else {
        $('.back-to-top').fadeOut('slow');
      }
    });

    $('.back-to-top').click(function () {
      $('html, body').animate({
        scrollTop: 0
      }, 1500, 'easeInOutExpo');
      return false;
    });


    // Initi AOS

    setTimeout(function () {
      (AOS as any).init({
        duration: 1000,
        easing: "ease-in-out-back"
      });

    }, 1000);

    // Navigation active state on scroll
    let nav_sections = $('section');
    let main_nav = $('nav');

    $(window).on('scroll', function () {
      const cur_pos = $(this).scrollTop() + 150;

      nav_sections.each(function () {
        const top = $(this).offset().top;
        const bottom = top + $(this).outerHeight();

        if (top > cur_pos || bottom < cur_pos) {
          return; // continue
        }
        let thisDataTarget = null;
        let activeDataTarget = null;
        const thisNav = main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').first();
        const activeNav = main_nav.find('li.active').first();

        if (thisNav.length)
          thisDataTarget = $(thisNav).find('a').attr('data-target');

        if (activeNav.length)
          activeDataTarget = $(activeNav).find('a').attr('data-target');

        if (thisNav.length && activeNav.length) {
          if (thisDataTarget !== activeDataTarget) {
            $(activeNav).removeClass('active');
            $(thisNav).addClass('active');

          }
        }
        else if (thisNav.length) {
          $(thisNav).addClass('active');

        }
        else if (activeNav.length) {
          $(activeNav).removeClass('active');
        }

      });
    });
  }
  
}
