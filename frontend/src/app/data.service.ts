import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs/Observable';
import { Participant } from "./models/participant";
import { HttpClient } from '@angular/common/http';

@Injectable()

export class DataService {
  private apiRoot:string = `${location.origin}/participant/`;

  private participants = new BehaviorSubject<Array<Participant>>(new Array<Participant>());
  participant = this.participants.asObservable();

  constructor(private http: HttpClient) { }

  getParticipants(id:any):Observable<Participant[]> {
    let uri = id==undefined?this.apiRoot:`${this.apiRoot}${id}`
    let participants = this.http.get<Participant[]>(uri);
    this.participant = participants;
    return participants;
  }

  saveParticipant(participant:Participant):Observable<any> {
    return this.http.post(this.apiRoot, participant);
  }

  updateParticipant(participant:Participant):Observable<any> {
    return this.http.put(`${this.apiRoot}${participant.id}`, participant);
  }

  deleteParticipant(participant:Participant):Observable<any> {
    return this.http.delete(`${this.apiRoot}${participant.id}`);
  }
  sortition():Observable<Participant[]> {
    let participants = this.http.get<Participant[]>(`${this.apiRoot}ruffle`);
    this.participant = participants;
    return participants;
  }

}
