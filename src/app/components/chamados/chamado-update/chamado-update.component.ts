import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

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
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.findAllTecnicos();
    this.findAllClientes();
    this.chamado.id = this.route.snapshot.paramMap.get('id')
    this.findById();
  }

  update() {
    this.chamadoService.update(this.chamado).subscribe(response => {
      this.toastService.success('Chamando atualizado com sucesso', 'Atualizado');
      this.router.navigate(['chamados']);
    }, ex => {
      this.toastService.error(ex.error.error);
    });
  }

  findById() {
    this.chamadoService.findById(this.chamado.id).subscribe(response => {
      this.chamado = response;
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

  retornaStatus(status: any): string {
    if(status == '0') {
      return 'ABERTO';
    } else if(status == '1') {
      return 'EM ANDAMENTO';
    } else {
      return 'ENCERRADO';
    }
  }

  retornaPrioridade(prioridade: any): string {
    if(prioridade == '0') {
      return 'BAIXA';
    } else if(prioridade == '1') {
      return 'MEDIA';
    } else {
      return 'ALTA';
    }
  }
}
