import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library/library.component';
import { AlbumSearchComponent } from './album-search/album-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/library', pathMatch: 'full' },
  { path: 'albums', component: AlbumSearchComponent },
  { path: 'library', component: LibraryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}