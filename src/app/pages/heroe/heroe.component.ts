import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { HeroeModel } from './../../models/heroe.model';
import { HeroesService } from './../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {
  }

  guardar ( form: NgForm ) {

    if ( form.invalid ) {
      console.log( 'Formulario no Válido' );
    }

    Swal.fire( {
      title: 'Espere',
      text: 'Guardando informaciión',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
    } );
    Swal.showLoading( Swal.getDenyButton());

    let peticion: Observable<any>;

    if ( this.heroe.id ) {
      peticion = this.heroesService.actualizarHeroe( this.heroe );
    } else {
      peticion = this.heroesService.crearHeroe( this.heroe );
    }

    peticion.subscribe( resp => {
      Swal.fire( {
        title: this.heroe.nombre,
        text: 'Se Actualizo correctamente',
        icon: 'success',
      })
    })

  }

}
