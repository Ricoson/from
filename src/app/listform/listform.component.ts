import { Component, OnInit } from '@angular/core';
import { FormService } from '../shared/form.service';

@Component({
  selector: 'app-listform',
  templateUrl: './listform.component.html',
  styleUrls: ['./listform.component.css'],
  
})
export class ListformComponent implements OnInit {
  constructor(public formservice:FormService) {}

  ngOnInit() {
    if(localStorage.getItem("express")){
      this.formservice.formlist=JSON.parse(localStorage.getItem("express"))
    }
  }
  public onClick(i){
    this.formservice.formlist=this.formservice.formlist.filter(function(element, index, self){return index!=i})
    var RoyW=JSON.stringify(this.formservice.formlist);
    localStorage.setItem("express",RoyW)
  }
  
}
