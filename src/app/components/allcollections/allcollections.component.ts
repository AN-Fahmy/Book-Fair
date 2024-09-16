import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal, WritableSignal } from '@angular/core';
import { BooksService } from '../../core/services/books.service';
import { IBooks } from '../../core/interfaces/ibooks';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-allcollections',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, RouterLink, MatPaginatorModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './allcollections.component.html',
  styleUrl: './allcollections.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class AllcollectionsComponent {
  private readonly _ToastrService = inject(ToastrService)

  searchValue:WritableSignal<string> = signal('')
  msgUndefined:WritableSignal<string> = signal('')

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText:["",""],
    items:1,
    nav: true,
  }


}
