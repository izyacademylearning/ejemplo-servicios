import { Component, OnInit } from '@angular/core';
import { TareaPendiente } from './services/tarea-pendiente';
import { TareasService } from './services/tareas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private tareasService: TareasService) { }
  nombreTarea = ""
  public tareas: TareaPendiente[] = []
  ngOnInit() {
    this.obtenerTareas();
  }

  guardarTarea(inputNombre:string) {
    console.log(inputNombre)
    const nuevaTarea = new TareaPendiente(inputNombre);
    this.tareas.push(nuevaTarea);
    this.tareasService.guardarTareas(this.tareas);
    this.obtenerTareas();
    // Y limpiamos el input
    this.nombreTarea = "";
  }
  /*
  Nota: aquí utilizo el índice porque solo trabajo con un array. Si tú usas
  una base de datos probablemente quieras usar el ID del elemento en lugar del índice
   */
  eliminarTarea(indice: string) {
    // Primero le preguntamos al usuario
    const confirma = confirm("¿Realmente quiere eliminar la tarea?");
    if (!confirma) {
      return;
    }
    // Eliminamos del arreglo y guardamos
    this.tareas.splice(parseInt(indice), 1);
    this.tareasService.guardarTareas(this.tareas);
  }
  cambiarEstadoDeTarea(indice:string) {
    this.tareasService.guardarTareas(this.tareas);
  }
  obtenerTareas() {
    this.tareas = this.tareasService.obtenerTareas();
  }

}