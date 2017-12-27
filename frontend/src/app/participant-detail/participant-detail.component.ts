import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  participant: Participant;
  
  constructor(private data: DataService, private route: ActivatedRoute, private router : Router,
    private translate: TranslateService) {
      translate.setDefaultLang('en');
    }
  ngOnInit() {    
    this.participant = new Participant();
    this.getParticipantDetail(this.route.snapshot.params['id']);
  }

  getParticipantDetail(id: number) {
    this.data.getParticipantsById(id).subscribe(data =>{
      console.log(data);
      this.participant = data;
    });
  }

  edit(participant:Participant){
    this.router.navigate(['/participant-create',participant._id]);
  }
  delete(participant:Participant){
    this.data.deleteParticipant(participant).toPromise().then((data) => {
      this.router.navigate(['/']);
    });
  }
}
