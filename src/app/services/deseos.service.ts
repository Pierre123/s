import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root',
})
export class DeseosService {
  listasTareas: Lista[] = [];

  constructor() {
    // console.log('Servicio Inicializado');
    // Cargar informacion del Local storage
    this.cargarStorage();
  }

  crearLista(titulo: string) {
    const nuevaLista = new Lista(titulo);
    this.listasTareas.push(nuevaLista);
    this.guardarStorage();
    return nuevaLista.id;
  }

  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listasTareas));
  }

  cargarStorage() {
    if (localStorage.getItem('data')) {
      this.listasTareas = JSON.parse(localStorage.getItem('data'));
    } else {
      this.listasTareas = [];
    }
  }

  obtenerLista(id: string | number) {
    id = Number(id);
    return this.listasTareas.find((listData) => listData.id === id);
  }

  borrarTarea(id: string | number) {
    id = Number(id);
    return this.listasTareas.splice(id, 1);
  }
}
