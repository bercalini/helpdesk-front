import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

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
              private route: Router) { }

  ngOnInit(): void {
  }

  create() {
    this.clienteService.create(this.cliente).subscribe(response => {
      this.toastService.success('Cliente Cadastrado com sucesso', 'Cadastro');
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
