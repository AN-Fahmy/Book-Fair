import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BooksService } from '../../core/services/books.service';
import { IBooks } from '../../core/interfaces/ibooks';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ScrollDirective } from '../../core/directives/scroll.directive';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [FormsModule ,MatButtonModule, MatCardModule,MatDividerModule,MatIconModule ,RouterLink,MatPaginatorModule, FormsModule, MatFormFieldModule, MatInputModule, ScrollDirective],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class CollectionComponent implements OnInit{
  private readonly _BooksService = inject(BooksService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ToastrService = inject(ToastrService)

  collectionList:WritableSignal<IBooks[]> = signal([])


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


  ngOnInit(): void {
    this.getPage()
  }

  getPage():void{
    let searchValue!:string | null
    let searchPage!:string | null

    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        searchValue = params.get('name')
        searchPage = this.currentPage().toString()

        this._BooksService.searchCollection(searchPage,searchValue).subscribe({
          next:(res)=>{
            console.log(res);
            this.collectionList.set(res.results)
            this.totalPage.set(Math.floor(res.count / res.results.length))
          }
        })
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
}
