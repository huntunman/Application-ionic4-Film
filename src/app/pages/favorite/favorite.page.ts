import { Movie } from './../../models/movie';
import { FavoriteService } from './../../services/favorite.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  favorite: FavoriteService;
  movie: Movie;

  constructor(private router: Router,
    favoriteService: FavoriteService) { }

  ngOnInit() {
  }

  /*private initFavoriteMovies() {
    this.favoriteService.getFavoriteMovie(yop)
     .then(favs => (this.favorite = favs));
  }*/

  onMovieDetail(id: number) {
    this.router.navigate(['movie-detail', id]);
  }

}
