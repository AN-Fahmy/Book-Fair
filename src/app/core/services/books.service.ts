import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private readonly _HttpClient = inject(HttpClient)

  getAllBooks():Observable<any>{
    return this._HttpClient.get(`https://gutendex.com/books/`)
  }

  getDetailsBook(id:string | null):Observable<any>{
    return this._HttpClient.get(`https://gutendex.com/books/?ids=${id}`)
  }

  getAllPages(pageNum:string | null):Observable<any>{
    return this._HttpClient.get(`https://gutendex.com/books/?page=${pageNum}`)
  }

  searchBooks(search:string | null):Observable<any>{
    return this._HttpClient.get(`https://gutendex.com/books/?search=${search}`)
  }

  searchCollection(pageNum:string | null , search:string | null):Observable<any>{
    return this._HttpClient.get(`https://gutendex.com/books/?page=${pageNum}&search=${search}`)
  }
}
