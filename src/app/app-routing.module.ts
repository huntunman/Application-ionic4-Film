import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'search-movie', pathMatch: 'full' },
  { path: 'search-movie', loadChildren: './pages/search-movie/search-movie.module#SearchMoviePageModule' },
  { path: 'movie-detail', loadChildren: './pages/movie-detail/movie-detail.module#MovieDetailPageModule' },
  { path: 'favorite', loadChildren: './pages/favorite/favorite.module#FavoritePageModule' },
  { path: 'other', loadChildren: './pages/other/other.module#OtherPageModule' },
  { path: 'person-detail', loadChildren: './pages/person-detail/person-detail.module#PersonDetailPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
