import { Component, OnInit } from '@angular/core';
import { DialogsComponent, Dialog } from '../dialogs/dialogs.component';
import { Title, Meta } from '@angular/platform-browser';
import * as AOS from 'aos';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  

  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle("Leader Analytics Oceanside, CA");
    this.metaService.updateTag({ name: "description", content: "Leader Analytics provides custom software development, custom web development, and custom mobile application development.  We are also the company behind Vyntix, a platform for managing economic and financial data." });
  }

  ngOnInit(): void {
    this.Init();
  }

  async Init() {

    const pre_loader = $('#preloader');
    pre_loader.fadeOut('slow', function () {
      $(this).remove();
    });


    // Initi AOS

    setTimeout(function () {
      (AOS as any).init({
        duration: 1000,
        easing: "ease-in-out-back"
      });

    }, 1000);

    return;

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
