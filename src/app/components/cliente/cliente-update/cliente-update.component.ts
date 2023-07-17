import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    cpf: '',
    dataCriacao: '',
    email: '',
    nome: '',
    senha: '',
    perfis: []
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  senha: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.required);
  cpf: FormControl = new FormControl(null, Validators.required);


  constructor(private toastService: ToastrService, 
              private clienteService: ClienteService,
              private route: Router,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.cliente.id = this.router.snapshot.paramMap.get('id');
    this.findById();
  }

  update() {
    this.clienteService.update(this.cliente).subscribe(response => {
      this.toastService.success('Cliente Atualizado com sucesso', 'Update');
      this.route.navigate(['clientes']);
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toastService.error(element.message);
        });
      } else {
          this.toastService.error(ex.error.message);
      }
    });
  }

  findById() {
    this.clienteService.findById(this.cliente.id).subscribe(response => {
      response.perfis = [];
      this.cliente = response;
    });
  }

  validarCampos(): boolean {
    return this.nome.valid && this.senha.valid && this.email.valid;
  }

  addPerfil(perfil: any): void {
    if(this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else {
      this.cliente.perfis.push(perfil);
    }
  }

}
