import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements  OnInit  {

  value = '';
  equalVal :any = 0;
  total:any;
  show:any = false;
  message:any = "";
  title:any ="Title";
  details:any = [];

  constructor(private appService:AppService)
  {}
  ngOnInit(): void {
    this.getDetails()
  }
  onClick(val:any)
  {
    if(this.equalVal === 1)
    {
      this.equalVal = 0;
    }
    this.value += val;
  }

  equal()
  {
   this.equalVal = 1;
     this.total= eval(this.value);
    if (Number.isNaN(this.total) || !Number.isFinite(this.total)) {
      this.showMessage('Invalid !')
    }
    if (Number.isInteger(this.total)) {
      this.value =this.total.toString();
    } else {
      this.value =this.total.toFixed(2).toString();
    }

  }

  clear()
  {
    this.value = '';
  }

  erase()
  {
    this.value = this.value.substr(0, this.value.length - 1);
  }

  save()
  {
    console.log("Save the data");
    this.appService.createDetails({title:this.title,value:this.value}).subscribe((res)=>{
      if(res)
      {
       console.log(res);
       this.getDetails()
       this.showMessage('saved succesfully !')
      }
    },(err)=>{
      this.showMessage('unexpected error !')
      
    })
  }

  getDetails()
  {
    this.appService.getDetails().subscribe((res:any)=>{
      if(res)
      {
        this.details = res.data;
      }
    })
  }

  delete(id:any)
  {
    this.appService.deleteDetail(id).subscribe((res)=>{
      if(res)
      {
        this.showMessage('deleted succesfully !');
        this.getDetails();
      }
    },(err)=>{
      this.showMessage('unexpected error !')
    })
  }
  showMessage(msg:any)
  {
    this.show = true;
    this.message = msg;
    setTimeout(()=>{
      this.show = false;
    },1500)
  }
}
