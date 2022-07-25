import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuarios.model';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})

export class UsuariosListComponent implements OnInit {

  usuarios?: Usuarios[];
  currentUsuario: Usuarios = {};
  currentIndex = -1;
  nombre = '';

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.retrieveUsuarios();
  }

  retrieveUsuarios(): void {
    this.usuarioService.getAll()
      .subscribe({
        next: (data) => {
          this.usuarios = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveUsuarios();
    this.currentUsuario = {};
    this.currentIndex = -1;
  }

  setActiveUser(tutorial: Usuarios, index: number): void {
    this.currentUsuario = tutorial;
    this.currentIndex = index;
  }

  removeAllUsuarios(): void {
    this.usuarioService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchNombre(): void {
    this.currentUsuario = {};
    this.currentIndex = -1;
    this.usuarioService.findByNombre(this.nombre)
      .subscribe({
        next: (data) => {
          this.usuarios = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
