import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string= 'Ok';
  personas: any; // Para almacenar los datos que obtendrás

  constructor(private http: HttpClient) {  } 

   ngOnInit() {
    this.http.get('https://localhost:7287/api/Persona')//'https://jsonplaceholder.typicode.com/users')
    .subscribe( {
      next: response=> this.personas = response,
      error: error=> console.log(error),
      complete: ()=> console.log("La Solicitud esta Completa")
    });
   }


}