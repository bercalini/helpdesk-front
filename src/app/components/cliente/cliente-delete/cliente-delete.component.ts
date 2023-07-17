import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    cpf: '',
    dataCriacao: '',
    email: '',
    nome: '',
    senha: '',
    perfis: []
  }

  constructor(private toastService: ToastrService, 
              private clienteService: ClienteService,
              private route: Router,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.cliente.id = this.router.snapshot.paramMap.get('id');
    this.findById();
  }

  remove() {
    this.clienteService.delete(this.cliente.id).subscribe(response => {
      this.toastService.success('Cliente Removido com sucesso', 'Delete');
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
}
