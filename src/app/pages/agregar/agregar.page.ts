import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  lista: Lista;
  nombreItem = '';
  constructor(
    private deseosService: DeseosService,
    private route: ActivatedRoute
  ) {
    const listaId = this.route.snapshot.paramMap.get('listaId');
    this.lista = this.deseosService.obtenerLista(listaId);
    console.log(this.lista);
  }

  ngOnInit() {}

  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    this.nombreItem = '';
    this.deseosService.guardarStorage();
  }

  cambioCheck(item: ListaItem) {
    // console.log(item);
    const pendientes = this.lista.items.filter((itemData) => {
      return !itemData.completado;
    }).length;
    // console.log({ pendientes });
    if (pendientes === 0) {
      this.lista.terminadoEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadoEn = null;
      this.lista.terminada = false;
    }
    this.deseosService.guardarStorage();
    console.log(this.deseosService.listasTareas);
  }

  borrar(index: number) {
    this.lista.items.splice(index, 1);
    this.deseosService.guardarStorage();
  }
}
