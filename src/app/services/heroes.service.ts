import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-app-10c1e-default-rtdb.firebaseio.com';

/**
 * constructor
 * @param http
 */
  constructor ( private http: HttpClient, ) { }


/**
 * crearHeroe
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
 * actualizarHeroe
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
   * borrarHeroe
   * @param id
   * @returns
   */
  borrarHeroe ( id: string ) {
    return this.http.delete( `${ this.url }/heroes/${ id }.json` );
  }

  /**
   * getHeroe
   * @param id
   * @returns
   */
  getHeroe ( id: string) {
    return this.http.get( `${ this.url }/heroes/${ id }.json` );
  }

  /**
   * getHeroes
   * @returns
   */
  getHeroes () {
    return this.http.get( `${ this.url }/heroes.json` )
      .pipe(
        map( this.crearArreglo ),
        delay( 2000 ),
      );
  }

  /**
   * crearArreglo
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
  // private crearArreglo ( heroesObj: any ) {
  //   const heroes: HeroeModel[] = [];
  //   if ( heroesObj === null ) { return []; }
  //   for ( let registro in heroesObj ) {
  //     heroesObj[ registro ].id = registro;
  //     heroes.push( heroesObj[ registro ] );
  //   }
  //   console.log( heroes );
  //   return heroes;
  // }
}
