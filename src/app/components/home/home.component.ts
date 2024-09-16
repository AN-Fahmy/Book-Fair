import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostListener, inject, OnInit, PLATFORM_ID, RendererFactory2, signal, ViewChild, WritableSignal } from '@angular/core';
import { BooksService } from '../../core/services/books.service';
import { IBooks } from '../../core/interfaces/ibooks';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ScrollDirective } from '../../core/directives/scroll.directive';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,ScrollDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  private readonly _BooksService = inject(BooksService)
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)
  private readonly _Renderer2 = inject(RendererFactory2).createRenderer(null, null)

  getAllBooks:WritableSignal<IBooks[]> = signal([])
  countBooks:WritableSignal<number> = signal(0)
  bestBooks:WritableSignal<IBooks[]> = signal([])

  ngOnInit(): void {
    if(isPlatformBrowser(this._PLATFORM_ID)){
      this._BooksService.getAllBooks().subscribe({
        next:(res)=>{
          this.getAllBooks.set(res.results)
        }
      })

      this._BooksService.getAllPages('50').subscribe({
        next:(res)=>{
          this.bestBooks.set(res.results)
        }
      })
    }
  }

  customOptions: OwlOptions = {
    loop: true,
    mergeFit:true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplaySpeed: 1500,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }
}
