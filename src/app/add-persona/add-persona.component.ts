import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addpersona',
  templateUrl: './add-persona.component.html',
  styleUrl: './add-persona.component.css'
})
export class AddpersonaComponent implements OnInit {
  personaForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.personaForm = this.fb.group({
      numeroIdentificacion: ['', Validators.required],
      nombre: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      fechaNacimiento: ['', Validators.required],
      esEmpleado: [false],
      salario: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.personaForm.valid) {
      const personaData = this.personaForm.value;
      this.http.post('https://localhost:7287/api/Persona', personaData)
        .subscribe(response => {
          // console.log('Persona guardada con éxito:', response);
          this.successMessage = 'Persona guardada con éxito';
          this.personaForm.reset();  // Resetea el formulario después de guardarlo
        }, error => {
          this.errorMessage = 'Error al guardar la persona. Inténtalo de nuevo.';
          console.error('Error al guardar la persona:', error);
        });
    }
  }
}