import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const STRORAGE_KEY = 'favorite';

@Injectable({
    providedIn: 'root'
})

export class FavoriteService {

    // favorite: number[] = [];

    constructor(public storage: Storage) { }

    /*addFavorite(id: number) {
        this.favorite.push(id);
    }

    removeFavorite(id: number) {
        const index = this.favorite.indexOf(id);
        if ( index > -1) {
            this.favorite.splice(index, 1);
        }
    }*/

    async isFavorite(id: number) {
        const result = await this.getAllFavorite();
        return result && result.indexOff(id) !== -1;
    }

    async favoriteFilm(id: number) {
        const result = await this.getAllFavorite();
        if (result) {
            result.push(id);
            return this.storage.set(STRORAGE_KEY, result);
        } else {
            return this.storage.set(STRORAGE_KEY, [id]);
        }
    }

    async unFavorite(id: number) {
        const result = await this.getAllFavorite();
        if (result) {
            const index = result.indexOff(id);
            result.splice(index, 1);
            return this.storage.set(STRORAGE_KEY, result);
        }
    }

    getAllFavorite() {
        return this.storage.get(STRORAGE_KEY);
    }


}
