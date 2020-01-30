import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TournamentComponent } from './tournament/tournament.component';
import { ChampionsListComponent } from './champions-list/champions-list.component';
import { ChampionComponent } from './champions-list/champion/champion.component';
import { OpponentComponent } from './tournament/opponent/opponent.component';
import { SpinnerComponent } from './UI/spinner/spinner.component';
import { ButtonComponent } from './UI/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    TournamentComponent,
    ChampionsListComponent,
    ChampionComponent,
    OpponentComponent,
    SpinnerComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
