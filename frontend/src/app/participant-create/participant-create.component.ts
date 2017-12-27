import { Component, OnInit,ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from "../data.service";
import { Participant } from '../models/participant';

import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-participant-create',
  templateUrl: './participant-create.component.html',
  styleUrls: ['./participant-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ParticipantCreateComponent implements OnInit {

  participant: Participant;
  isUpdate:boolean = false;
  constructor(private data: DataService, private route: ActivatedRoute, private router: Router,
    private translate: TranslateService) {
      translate.setDefaultLang('en');
    }

  ngOnInit() {
    this.participant = new Participant();
    if(this.route.snapshot.params['id']== undefined) {       
       this.isUpdate = false;
    } else {
      this.isUpdate = true;
      this.getParticipantDetail(this.route.snapshot.params['id']);
    }
  }

  getParticipantDetail(id: number) {
    this.data.getParticipantsById(id).subscribe(data =>{
      this.participant = data;
    });
  }

  save(){
      this.data.saveParticipant(this.participant).subscribe(res =>{
        let id = res['_id'];
        this.router.navigate(['/participant-details',id]);
      }, err => {console.log(err);});    
  }  

  update(){
      this.data.updateParticipant(this.participant).subscribe(res =>{
        let id = res['_id'];
        this.router.navigate(['/participant-details',id]);
      }, err => {console.log(err);});    
  }
  
}
