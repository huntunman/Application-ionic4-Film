import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { FavoriteService } from './../../services/favorite.service';
import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { TrackService } from '../../services/track.service';
import { Movie } from '../../models/movie';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

  encodText: number;
  scannedCode: {};
  barcodeScannerOptions: BarcodeScannerOptions;

  movie: Movie;
  isFavorite = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private film: MovieService,
    private track: TrackService,
    public favorite: FavoriteService,
    private router: Router,
    private barcodeScanner: BarcodeScanner
    ) {

    this.favorite.isFavorite(this.movie.id).then(isFav => {
      this.isFavorite = isFav;
    });

    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };

    this.encodText = this.movie.id;
  }

  ngOnInit() {
    const movieId = this.activatedRoute.snapshot.params['id'];
    this.getMovieDetail(movieId);
  }

  getMovieDetail(id: number) {
    this.film.getMovieDetail(id).subscribe(res => {
      this.movie = res;
      this.track.viewMovie(id, this.movie.title);
    });
  }

  favoriteMovie() {
    this.favorite.favoriteFilm(this.movie.id).then(() => {
      this.isFavorite = true;
    });
  }

  unFavoriteMovie() {
    this.favorite.favoriteFilm(this.movie.id).then(() => {
      this.isFavorite = false;
    });
  }

  onPersonDetail(id: number) {
    this.router.navigate(['person-detail', id]);
  }

  createCode() {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodText).then((encodedData) => {
      console.log(encodedData);
      this.encodText = encodedData;
    }, (err) => {
      console.log('Error occured : ' + err);
    });
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      alert('Barcode data ' + JSON.stringify(barcodeData));
      this.scannedCode = barcodeData;
    }).catch(err => {
      console.log('Error', err);
    });
      this.router.navigate(['movie-detail', this.scannedCode]);
  }
}
