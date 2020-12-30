import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { Estudiante } from "../models/estudiante";
import { EstudianteService } from '../services/estudiante.service';
import { ToastController } from "@ionic/angular";
import { FormGroup,FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  student:Estudiante;

  public myForm:FormGroup; 


  public nameS=true;
  public controlnumberS=true;
  public curpS=true;
  public ageS=true;


  constructor(
    private actroute: ActivatedRoute, 
    private router:Router, 
    private toast: ToastController,
    private fb:FormBuilder,
    private studentService:EstudianteService
  ) { 
    this.actroute.queryParams.subscribe(
      params =>{
        if(params && params.special){
          this.student=JSON.parse(params.special) as Estudiante;
          console.log(this.student);
        }
      }
    )
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      name:new FormControl({value: this.student.name, disabled: false}),
      controlnumber:new FormControl({value: this.student.controlnumber, disabled:false}),
      curp:new FormControl({value: this.student.curp, disabled:false}),
      age:new FormControl({value: this.student.age, disabled:false}),
      active:new FormControl({value: this.student.active, disabled:false })
    });
    
  }

  update(){
      this.student = {
        id:this.student.id,
        name:this.myForm.controls.name.value,
        controlnumber:this.myForm.controls.controlnumber.value,
        curp:this.myForm.controls.curp.value,
        age:this.myForm.controls.age.value,
        active:this.myForm.controls.active.value
      }

      this.studentService.updateStudent(this.student,this.student.id);
    this.presentToast();
    this.setAllDisabled();
    this.ngOnInit();

  }
  setAllDisabled():void{
    this.nameS=true;
    this.controlnumberS=true;
    this.curpS=true;
    this.ageS=true;
  }


  async presentToast() {
    const toast = await this.toast.create({
      message: 'Se han guardado los cambios.',
      duration: 2000
    });
    toast.present();
  }




}
