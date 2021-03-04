import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  tareaBorrada: boolean;
  constructor(
    public deseosService: DeseosService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async agregarLista() {
    //  this.router.navigateByUrl('tabs/tab1/agregar');
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Nueva Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');
          },
        },
        {
          text: 'Crear',
          role: '',
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0) {
              return;
            }
            const idLista = this.deseosService.crearLista(data.titulo);
            this.router.navigateByUrl(`tabs/tab1/agregar/${idLista}`);
          },
        },
      ],
    });

    alert.present();
  }

  listaSeleccionada(lista: Lista) {
    this.router.navigateByUrl(`tabs/tab1/agregar/${lista.id}`);
  }

  borrarTarea(id: number | string) {
   this.deseosService.borrarTarea(id);
   this.deseosService.guardarStorage();
  }
}
