import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs/Observable';
import { Participant } from "./models/participant";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  private apiRoot:string = `${location.origin}/participant/`;
  private apiRaffle:string = `${location.origin}/raffle/`;

  private participants = new BehaviorSubject<Array<Participant>>(new Array<Participant>());
  participant = this.participants.asObservable();

  constructor(private http: HttpClient) { }

  getParticipants():Observable<Participant[]> {
    let participants = this.http.get<Participant[]>(this.apiRoot);
    this.participant = participants;
    return participants;
  }

  getParticipantsById(id:any):Observable<Participant> {
    let uri = `${this.apiRoot}${id}`;
    let participant = this.http.get<Participant>(uri);
    return participant;
  }

  saveParticipant(participant:Participant):Observable<any> {
    return this.http.post(this.apiRoot, participant);
  }

  updateParticipant(participant:Participant):Observable<any> {
    return this.http.put(`${this.apiRoot}${participant._id}`, participant);
  }

  deleteParticipant(participant:Participant):Observable<any> {
    return this.http.delete(`${this.apiRoot}${participant._id}`);
  }
  
  sortitionParticipants():Observable<Participant[]> {
    return this.http.get<Participant[]>(this.apiRaffle,{});
  }

}
