import { PersonService } from './../../services/person.service';
import { FavoriteService } from './../../services/favorite.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.page.html',
  styleUrls: ['./search-movie.page.scss'],
})
export class SearchMoviePage implements OnInit {

  segment: string;
  page: number;
  movies: Movie[];
  searchInput = '';


  constructor(private router: Router,
    private film: MovieService,
    public favorite: FavoriteService,
    private person: PersonService,
    private loadingCtrl: LoadingController) { }

  onInput(event: any) {
    this.performSearch(this.searchInput);
  }

  onClear(event: any) {
    this.movies = null;
  }

  onSearch() {
    this.router.navigate(['search']);
  }

  onMovieDetail(id: number) {
    this.router.navigate(['movie-detail', id]);
  }

  getFavoriteMovie(id: number) {
    this.router.navigate(['favorite', id]);
  }

  ngOnInit() {
    this.onTabSelected('popular');
  }

  onTabSelected(segmentValue: string) {
    this.segment = segmentValue;
    this.page = 1;
    this.movies = null;
    this.loadMovies();
  }

  private async loadMovies() {
    let service;
    switch (this.segment) {
      case 'popular':  service = this.film.getPopularMovies(this.page); break;
      case 'Favorite': service = this.favorite.favoriteFilm(this.page); break;
      case 'Persons': service = this.person.getPopularPerson(this.page); break;
    }
    // const loadingOpts = ;
    const loading = await this.loadingCtrl.create({ translucent: true, spinner: 'crescent' });
    loading.present();
    service.subscribe(res => {
      if (!this.movies) { this.movies = []; }
      this.movies = this.movies.concat(res);
      loading.dismiss();
    }, err => {
      this.movies = [];
      loading.dismiss();
    });
  }

  private performSearch(query: string) {
    if (!query || query.trim().length <= 0) { return; }
    this.film.searchMovies(query).subscribe(res => {
      this.movies = res;
    });
  }

}
