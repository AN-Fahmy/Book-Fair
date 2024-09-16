import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { BooksService } from '../../core/services/books.service';
import { IBooks } from '../../core/interfaces/ibooks';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';
import { ScrollDirective } from '../../core/directives/scroll.directive';


@Component({
  selector: 'app-books',
  standalone: true,
  imports: [FormsModule ,CarouselModule,MatButtonModule, MatCardModule,MatDividerModule,MatIconModule ,RouterLink,MatPaginatorModule, FormsModule, MatFormFieldModule, MatInputModule, ScrollDirective],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit {
  private readonly _BooksService = inject(BooksService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)

  pageList:WritableSignal<IBooks[]> = signal([])
  currentPage:WritableSignal<number> = signal(1)
  totalPage:WritableSignal<number> = signal(1)
  pageSize = 1;
  pageIndex = 0;
  pageSizeOptions = [1];
  searchValue:WritableSignal<string> = signal('')
  searchData:WritableSignal<IBooks[]> = signal([])

  hidePageSize = true;
  showPageSizeOptions = false;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayHoverPause:true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false,
  }

  ngOnInit(): void {
    this.getPage()
  }

  getPage():void{
    this._BooksService.getAllPages(this.currentPage().toString()).subscribe({
      next:(res)=>{
        this.pageList.set(res.results)
        this.totalPage.set(Math.floor(res.count / res.results.length))
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.totalPage.set(e.length)
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.currentPage.set(this.pageIndex + 1)
    this.getPage()
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  searchBook():void{
    if(isPlatformBrowser(this._PLATFORM_ID)){
      this._BooksService.searchBooks(this.searchValue()).subscribe({
        next:(res)=>{
          this.searchData.set(res.results)
          if(this.searchValue()){
            if(this.searchData().length >= 1){
              this.searchData()
            } else if(this.searchData().length == 0){
              this._ToastrService.error('Sorry, This book is not available in our library.')
              this.searchData.set([])
            }
          } else{
            this._ToastrService.error('Please Enter Book Name.')
            this.searchData.set([])
          }
        }
      })
    }

  }
}
