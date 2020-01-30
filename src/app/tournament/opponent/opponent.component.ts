import { Component, OnInit, Input } from '@angular/core';
import { Champion } from 'src/app/champions-list/champion/champion.model';

@Component({
  selector: 'app-opponent',
  templateUrl: './opponent.component.html',
  styleUrls: ['./opponent.component.scss']
})
export class OpponentComponent {
  @Input() opponent: Champion;
  @Input() disabledOpponent: boolean = false;

  constructor() { }

}
