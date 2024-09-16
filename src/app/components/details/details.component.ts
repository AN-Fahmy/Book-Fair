import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../core/services/books.service';
import { IBooks } from '../../core/interfaces/ibooks';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _BooksService = inject(BooksService)

  getDetails:WritableSignal<IBooks[]> = signal([])
  subjects:WritableSignal<[]> = signal([])
  bookShelves:WritableSignal<[]> = signal([])

  ngOnInit(): void {
    let bookId!:string | null

    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        bookId = param.get('id')
          this._BooksService.getDetailsBook(bookId).subscribe({
            next:(res)=>{
              this.getDetails.set(res.results)
              this.subjects.set(res.results[0].subjects)
              this.bookShelves.set(res.results[0].bookshelves)
            }
          })
      }
    })
  }
}
