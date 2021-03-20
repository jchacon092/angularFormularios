import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  miFormulario : FormGroup = this.fb.group({
    nombre : ['',[Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([
      ['Red dead redemption', Validators.required],
      [ 'Batman arkham knight', Validators.required]
    ], Validators.required)
  });

  nuevoFavorito : FormControl = this.fb.control('',Validators.required);

  
get faboritosArr(){
  return this.miFormulario.get('favoritos') as FormArray;
}
  

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
  }

  esValido(campo : string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  eliminar(i : number ){
    this.faboritosArr.removeAt(i);
  }

  agregarFavorito(){
    if (this.nuevoFavorito.invalid) {
      return;
    }
    this.faboritosArr.push(new FormControl(this.nuevoFavorito.value, Validators.required));
    this.nuevoFavorito.reset();
  }

  guardar(){
    //imprimir valor del form solo si es valido
    if (this.miFormulario.invalid) {
        this.miFormulario.markAllAsTouched();
        return;
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

}
