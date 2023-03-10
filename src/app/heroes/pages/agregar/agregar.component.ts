import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  .agregar-contenedor{
    display: flex;
  }
  .column{
    margin: 10px;
    width: 50%;
  }
  .column-form{
    width: 100%;
  }
  .buttons-container{
    display: flex;
    flex: space-around;
  }
  @media (max-width: 768px) {
    .column {
      width: 100%;
      display: block;
      float: none;
    }
  }
  `]
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: "DC Comics",
      desc: "DC - Comics"
    },
    {
      id: "Marvel Comics",
      desc: "Marvel - Comics"
    }
  ];
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }
  constructor(private heroesService : HeroesService,
              private activatedRouted : ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private matDialog : MatDialog){}

  ngOnInit(){
    if(!this.router.url.includes('editar')){
    }
    this.activatedRouted.params
    .pipe(
      switchMap(({id}) => this.heroesService.getHeroePorId(id))
    )
    .subscribe( heroe => this.heroe = heroe);
  }

  guardar(){
    if(this.heroe.superhero.trim.length == 0) return;
    if(this.heroe.id){
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe(heroe => this.mostarSnackBar("Registro actualizado"))
    }else{
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe(resp => {
        this.router.navigate(["/heroe/editar", this.heroe.id]);
        this.mostarSnackBar("Registro creado")
      });
    }
  }

  mostarSnackBar(mensaje: string){
    this.snackBar.open(mensaje, 'Ok!', {
      duration: 2500
    })
  }
  borrarHeroe(){
    const dialog = this.matDialog.open( ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    })
    dialog.afterClosed().subscribe(
      (result) => {
        this.heroesService.borrarHeroe(this.heroe.id!)
    .subscribe(resp =>{
      this.router.navigate(['/heroes']);
    });
      }
    )
  }


}
