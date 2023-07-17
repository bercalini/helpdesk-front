import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delet',
  templateUrl: './tecnico-delet.component.html',
  styleUrls: ['./tecnico-delet.component.css']
})
export class TecnicoDeletComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(private tecnicoService: TecnicoService, private toastService: ToastrService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.tecnicoService.findById(this.tecnico.id).subscribe(response => {
      response.perfis = [];
      this.tecnico = response;
    });
  }

  delete(): void {
    this.tecnicoService.delete(this.tecnico.id).subscribe(response => {
      this.toastService.success('Tecnico excluido com sucesso', 'Delete');
      this.router.navigate(['tecnicos']);
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
}
