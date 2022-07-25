import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuarios } from 'src/app/models/usuarios.model';

@Component({
  selector: 'app-usuarios-details',
  templateUrl: './usuarios-details.component.html',
  styleUrls: ['./usuarios-details.component.css']
})

export class UsuarioDetailsComponent implements OnInit {

  @Input() viewMode = false;
  @Input() currentUsuario: Usuarios = {
    nombre: '',
    email: '',
    estado: false
  };

  message = '';

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getUsuarios(this.route.snapshot.params["id"]);
    }
  }

  getUsuarios(id: string): void {
    this.usuarioService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUsuario = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateEstado(status: boolean): void {
    const data = {
      nombre: this.currentUsuario.nombre,
      email: this.currentUsuario.email,
      estado: status
    };
    this.message = '';
    this.usuarioService.update(this.currentUsuario.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentUsuario.estado = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateUsuario(): void {
    this.message = '';
    this.usuarioService.update(this.currentUsuario.id, this.currentUsuario)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This usuario was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteUsuario(): void {
    this.usuarioService.delete(this.currentUsuario.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/usuarios']);
        },
        error: (e) => console.error(e)
      });
  }

}
