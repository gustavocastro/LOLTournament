import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ChampionsListComponent } from './champions-list/champions-list.component';
import { TournamentComponent } from './tournament/tournament.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'champions', component: ChampionsListComponent },
  { path: 'tournament', component: TournamentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
