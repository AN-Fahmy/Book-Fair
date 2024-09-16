import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BooksComponent } from './components/books/books.component';
import { DetailsComponent } from './components/details/details.component';
import { CollectionComponent } from './components/collection/collection.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { AuthorbooksComponent } from './components/authorbooks/authorbooks.component';
import { AllcollectionsComponent } from './components/allcollections/allcollections.component';

export const routes: Routes = [
  {path:'',redirectTo:'home', pathMatch:'full'},
  {path:'home',component:HomeComponent, title:'Home'},
  {path:'books',component:BooksComponent, title:'Books'},
  {path:'details/:id',component:DetailsComponent, title:'Details'},
  {path:'authors',component:AuthorsComponent, title:'Authors'},
  {path:'authorbooks/:author',component:AuthorbooksComponent, title:"Author's Books"},
  {path:'collection/:page/:name',component:CollectionComponent, title:'Collection Books'},
  {path:'allcollections',component:AllcollectionsComponent, title:'All Collections'},
  {path:'**',component:NotfoundComponent, title:'Not Found'},
];
