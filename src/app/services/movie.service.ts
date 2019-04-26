import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly baseUrl: string = 'https://api.themoviedb.org/3/movie/popular?';
    private readonly params = {
      api_key: 'api_key=978094bc2f3c69b0c6122361ddf6fa13',
      language: 'fr-FR'
    };

    constructor(private readonly http: HttpClient) {
      console.log('Hello MovieApiProvider Provider');
    }

    private getParams(params?: any) {
      const obj = { ...this.params, ...params };
      const str = [];
      for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
      }
      return '?' + str.join('&');
    }

    getPopularMovies(page: number) {
      console.log(this.baseUrl);
      return this.http.get(`${this.baseUrl}/movie/popular${this.getParams({page: page})}`)
      .pipe(map((res: any) => <Movie[]> res.results))
      .pipe(delay(500));
    }

    searchMovies(query: string) {
      return this.http.get(`${this.baseUrl}/search/movie${this.getParams({ query: query })}`)
        .pipe(map((res: any) => <Movie[]>res.results));
    }

    getMovieDetail(id: number) {
      const append = '&append_to_response=credits';
      return this.http.get<Movie>(`${this.baseUrl}/movie/${id}${this.getParams()}${append}`);
    }

}
