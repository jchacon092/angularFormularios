import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { nombreApellidoPattern, emailPattern, noPuedeSerStrider } from '../../shared/validator/validaciones';
import { EmailValidatorService } from '../../shared/validator/email-validator.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  miFormulario : FormGroup = this.fb.group({
    nombre : ['', [Validators.required, Validators.pattern(this.validatorSErvice.nombreApellidoPattern)]],
    email : ['', [Validators.required, Validators.pattern(this.validatorSErvice.emailPattern)], [this.emailValidator]],
    username : ['', [Validators.required, this.validatorSErvice.noPuedeSerStrider]],
    password : ['', [Validators.required, Validators.minLength(6)]],
    password2 : ['', [Validators.required]],
  },{
    validators : [this.validatorSErvice.camposIguales('password','password2')]
  })


 

  get emailErrorMsg () : string {
    const errors = this.miFormulario.get('email')?.errors;

    if (errors?.required) {
      return 'Email es obligatorio'
    }else if (errors?.pattern) {
      return 'Email no sigue el formato';
    } else if (errors?.emailTomado) {
      return 'Email ya usado'
    }

    return '';
  }

  constructor(private fb : FormBuilder,
              private validatorSErvice :  ValidatorService,
              private emailValidator : EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre : 'Joaquin chacon',
      email : 'jchacon092@hotmail.com',
      username : 'jchacon09'
    })
  }

  campoNoValido(campo : string){
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  


  submitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
