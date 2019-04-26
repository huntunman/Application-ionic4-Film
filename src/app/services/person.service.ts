import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { Person } from '../models/person';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class PersonService {
    private readonly baseUrl = 'https://api.themoviedb.org/3';
    private readonly params = {
    api_key: 'api_key=978094bc2f3c69b0c6122361ddf6fa13',
    language: 'fr-FR'
  };

  constructor(private http: HttpClient) {}

  searchPerson(name: string) {
    return this.http.get(`${this.baseUrl}/search/person${this.getParams({ query: name })}`)
    .pipe(map((res: any) => {
      if (res && res.results && res.results.length > 0) { return <Person>res.results[0]; }
      return null;
    }));
  }

  getPopularPerson(page: number) {
      return this.http.get(`${this.baseUrl}/person/popular${this.getParams({page: page})}`)
      .pipe(map((res: any) => <Person[]>res.results))
      .pipe(delay(500));
  }

  getPersonDetail(id: number) {
    const append = '&append_to_response=credits';
    return this.http.get<Person>(`${this.baseUrl}/person/${id}${this.getParams()}${append}`);
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
}
