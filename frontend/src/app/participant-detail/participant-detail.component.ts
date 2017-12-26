import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from "../data.service";
import { Participant } from '../models/participant';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-participant-detail',
  templateUrl: './participant-detail.component.html',
  styleUrls: ['./participant-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ParticipantDetailComponent implements OnInit {

  participant: Participant = new Participant();
  
  constructor(private data: DataService, private route: ActivatedRoute,
    private translate: TranslateService) {
      translate.setDefaultLang('en');
    }
  ngOnInit() {    
    this.getParticipantDetail(this.route.snapshot.params['id']);
  }

  getParticipantDetail(id: number) {
    this.data.getParticipants(id).subscribe(data =>{
      data.forEach(f=> this.participant= f);
    });
  }
}
