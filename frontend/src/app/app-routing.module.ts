import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ParticipantComponent } from './participant/participant.component';
import { ParticipantDetailComponent } from './participant-detail/participant-detail.component';
import { ParticipantCreateComponent } from './participant-create/participant-create.component';

const routes: Routes = [
  {
    path: 'participants',
    component: ParticipantComponent,
    data: { title: 'Participant List' }
  },
  {
    path: 'participant-details/:id',
    component: ParticipantDetailComponent,
    data: { title: 'Participant Details' }
  },
  {
    path: 'participant-create/:id',
    component: ParticipantCreateComponent,
    data: { title: 'Edit Participant' }
  },
  {
    path: 'participant-create',
    component: ParticipantCreateComponent,
    data: { title: 'Create Participant' }
  },
  {
    path: '',
    redirectTo: '/participants',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
