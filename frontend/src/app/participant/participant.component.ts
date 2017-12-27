import { Component, OnInit } from '@angular/core';
import { Participant } from '../models/participant';
import { DataService } from "../data.service";
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {

  participants : Participant[];

  constructor(private data: DataService,
              private translate: TranslateService,
              private router: Router) {
                translate.setDefaultLang('en');
              }

  ngOnInit() {
    this.data.getParticipants(undefined).subscribe(res => this.participants = res);
  }

  edit(participant:Participant){
    this.router.navigate(['/participant-create',participant.id]);
  }
  
  delete(participant:Participant){
    this.data.deleteParticipant(participant);
  }


  sortition(){
    this.data.sortition().subscribe(res => this.participants = res);  
  }
}
