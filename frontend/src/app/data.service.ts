import { Injectable } from '@angular/core';
import { Participant } from './models/participant';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DataService {
  private apiRoot = `${location.origin}/participants`;
  private apiRaffle = `${location.origin}/raffle/`;

  private participants = new BehaviorSubject<Array<Participant>>(new Array<Participant>());
  participant = this.participants.asObservable();

  constructor(private http: HttpClient) { }

  getParticipants(): Observable<Participant[]> {
    const participants = this.http.get<Participant[]>(this.apiRoot);
    this.participant = participants;
    return participants;
  }

  getParticipantsById(id: any): Observable<Participant> {
    const uri = `${this.apiRoot}${id}`;
    const participant = this.http.get<Participant>(uri);
    return participant;
  }

  saveParticipant(participant: Participant): Observable<any> {
    return this.http.post(this.apiRoot, participant);
  }

  updateParticipant(participant: Participant): Observable<any> {
    return this.http.put(`${this.apiRoot}${participant._id}`, participant);
  }

  deleteParticipant(participant: Participant): Observable<any> {
    return this.http.delete(`${this.apiRoot}${participant._id}`);
  }

  sortitionParticipants(): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.apiRaffle, {});
  }

}
