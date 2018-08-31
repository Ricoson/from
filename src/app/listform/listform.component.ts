import {FormService} from '../shared/form.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-listform',
  templateUrl: './listform.component.html',
  styleUrls: ['./listform.component.css'],
  
})
export class ListformComponent implements OnInit {
  public listform:any={}
  constructor(public formservice:FormService) {}

  ngOnInit() {
    console.log('tt'+this.formservice.formlist.username);
  }

}
