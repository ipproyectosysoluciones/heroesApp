import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-app-10c1e-default-rtdb.firebaseio.com';

/**
 *
 * @param http
 */
  constructor ( private http: HttpClient, ) { }


/**
 *
 * @param heroe
 * @returns
 */
  crearHeroe ( heroe: HeroeModel ) {
    return this.http.post( `${ this.url }/heroes.json`, heroe )
      .pipe(
        map( ( resp: any ) => {
          heroe.id = resp.name;
          return heroe;
        } )
      );
  }

/**
 *
 * @param heroe
 * @returns
 */
  actualizarHeroe ( heroe: HeroeModel ) {
    const heroeTemp = {
      ...heroe
    }

    delete heroeTemp.id;

    return this.http.put( `${ this.url }/heroes/${ heroe.id }.json`, heroeTemp );
  }

  /**
   *
   * @returns
   */
  getHeroes () {
    return this.http.get( `${ this.url }/heroes.json` )
      .pipe(
        map( this.crearArreglo )
      );
  }

  /**
   *
   * @param heroeObj
   * @returns
   */
  private crearArreglo ( heroesObj: object ) {
    const heroes: HeroeModel[] = [];

    if ( heroesObj === null ) { return []; };

    Object.keys( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[ key ];
      heroe.id = key;

      heroes.push( heroe );
    })

    return heroes;
  }
}
