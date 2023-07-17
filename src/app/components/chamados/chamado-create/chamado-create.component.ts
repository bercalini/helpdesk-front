import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  prioridade: FormControl = new FormControl(null, Validators.required);
  status: FormControl = new FormControl(null, Validators.required);
  titulo: FormControl = new FormControl(null, Validators.required);
  descricao: FormControl = new FormControl(null, Validators.required);
  tecnico: FormControl = new FormControl(null, Validators.required);
  cliente: FormControl = new FormControl(null, Validators.required);

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
    dataAbertura: '',
    dataFechamento: ''
  }

  constructor(private chamadoService: ChamadoService,
              private clienteService: ClienteService, 
              private tecnicoService: TecnicoService,
              private toastService: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.findAllTecnicos();
    this.findAllClientes();
  }

  create() {
    this.chamadoService.create(this.chamado).subscribe(response => {
      this.toastService.success('Chamando salvo com sucesso', 'Novo chamado');
      this.router.navigate(['chamados']);
    }, ex => {
      this.toastService.error(ex.error.error);
    });
  }

  findAllTecnicos() {
    this.tecnicoService.findAll().subscribe(response => {
      this.tecnicos = response;
    });
  }

  findAllClientes() {
    this.clienteService.findAll().subscribe(response => {
      this.clientes = response;
    });
  }

  validarCampos(): boolean {
    return this.prioridade.valid && this.prioridade.status && 
    this.titulo.valid && this.descricao.valid && this.tecnico.valid && this.cliente.valid;
  }
}
