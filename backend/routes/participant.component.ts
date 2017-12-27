import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Participant } from '../models/participant';
import { DataService } from "../data.service";
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css'],
  
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('participants',[
      transition('* => *',[
        query(':enter', style({ opacity: 0}), {optional : true}),
        query(':enter', stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({ opacity: 0, transform :'translateY(-75%)', offset: 0}),
            style({ opacity: .5, transform :'translateY(35px)', offset: .3}),
            style({ opacity: 1, transform :'translateY(0)', offset: 1}),
          ]))]), {optional : true}),
        query(':leave', stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({ opacity: 1, transform :'translateY(0)', offset: 0}),
            style({ opacity: .5, transform :'translateY(35px)', offset: .3}),
            style({ opacity: 0, transform :'translateY(-75%)', offset: 1}),
          ]))]), {optional : true})
      ])
    ])
  ]
})
export class ParticipantComponent implements OnInit {

  participants : Participant[];

  constructor(private data: DataService,
              private translate: TranslateService,
              private router: Router) {
                translate.setDefaultLang('en');
              }

  ngOnInit() {
    this.data.getParticipants().subscribe(res => this.participants = res);
  }

  
  
  viewDetails(participant:Participant){
    console.log(participant);
    this.router.navigate(['/participant-details',participant._id]);
  }


  sortition(){
    this.data.sortition(this.participants);     
    this.router.navigate(['/']); 
  }
}
