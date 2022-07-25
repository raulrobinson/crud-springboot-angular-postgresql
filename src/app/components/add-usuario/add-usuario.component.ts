import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuarios.model';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})

export class AddUsuarioComponent implements OnInit {

  usuario: Usuarios = {
    nombre: '',
    email: '',
    estado: false
  };

  submitted = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  saveUsuario(): void {
    const data = {
      nombre: this.usuario.nombre,
      email: this.usuario.email
    };
    this.usuarioService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newUsuario(): void {
    this.submitted = false;
    this.usuario = {
      nombre: '',
      email: '',
      estado: false
    };
  }

}
