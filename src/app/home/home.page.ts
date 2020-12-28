import { Component } from '@angular/core';
import { EstudianteService } from "../services/estudiante.service";
import { Estudiante } from '../models/estudiante';
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public students:Estudiante[];

  constructor(private service:EstudianteService,private router:Router) {
    this.service.getStudents().subscribe(data=>{
      this.students=data.map(e=>{
        return{
          id:e.payload.doc.id,
          name:e.payload.doc.get("name"),
          controlnumber:e.payload.doc.get("controlnumber"),
          curp:e.payload.doc.get("curp"),
          age:e.payload.doc.get("age"),
          active:e.payload.doc.get("active")
        }as Estudiante
      })
    })
  }

  update(student:Estudiante,active:boolean){
    student.active=active;
    this.service.updateStudent(student,student.id);
  }

  detail(student:Estudiante){
    let navext:NavigationExtras ={
      queryParams:{
        special:JSON.stringify(student)
      }
    };
    this.router.navigate(['/detail'],navext);
  }
 
}
