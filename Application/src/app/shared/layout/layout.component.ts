import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.scrollTo(fragment);
      }
    });  }


    scrollTo(id: string): void {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }
    }

    
  addScrollEventListeners(): void {
    const navLinks = document.querySelectorAll('.nav a');

    navLinks.forEach(link => {
      link.addEventListener('click', (e: Event) => {
        e.preventDefault();

        const targetId = (link as HTMLAnchorElement).getAttribute('href')?.substring(1);
        const targetSection = document.getElementById(targetId!);

        targetSection?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }


}
