import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Answers } from '@ionic-native/fabric';


@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(
    private platform: Platform
  ) {}

  private viewContent(id: number, name: string, type: string) {
    if (this.platform.is('cordova')) {
      Answers.sendContentView(name, type, String(id));
    }
  }

  viewMovie(id: number, title: string) {
    this.viewContent(id, title, 'movie');
  }

  viewPerson(id: number, name: string) {
    this.viewContent(id, name, 'person');
  }

  viewFavorite(id: number, title: string) {
    this.viewContent(id, title, 'movie');
  }

}
