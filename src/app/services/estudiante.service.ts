import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Estudiante } from "src/app/models/estudiante";


@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private firestore:AngularFirestore) { }

  getStudents(){
    return this.firestore.collection('estudiante').snapshotChanges();
  }
  updateStudent(student:Estudiante,id:string){
    this.firestore.doc('estudiante/'+id).update(student);
  }
}
