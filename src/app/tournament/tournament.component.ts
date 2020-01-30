import { Component, OnInit } from '@angular/core';
import { Champion } from '../champions-list/champion/champion.model';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {
  battles: Array<any> = [];
  finalOpponents: Array<any> = [
    { id: null, name: 'Battle 1 Winner' },
    { id: null, name: 'Battle 2 Winner' }
  ];
  winner: Champion = new Champion('', 'Winner', '', true);

  constructor() { }

  ngOnInit() {
    this.loadTournamentBattles();
  }

  /**
   * Gets the 4 selected Champions from the localStorage and
   * divides them into 2 groups, which represents each battle
   */
  loadTournamentBattles() {
    var storage = JSON.parse(window.localStorage.getItem('champions'));
    const battle1 = [storage[0], storage[1]];
    const battle2 = [storage[2], storage[3]];

    this.battles.push(battle1, battle2);
  }

  /**
   * Selects the winner from each battle and disables the loser Champion
   * @param {Champion} champion The winner Champion from the first battle
   * @param {Array<Champion>} battleArr The array containing both Champions from each battle
   * @param {number} index Index of the winner Champion
   */
  onSelectOpponent(champion: Champion, battleArr: Array<Champion>, index: number) {
    if (!this.finalOpponents[index].id) {
      this.finalOpponents[index] = champion;

      battleArr.map((char, i) => {
        champion.id !== char.id ? this.battles[index][i].disabled = true : null;
      });
    }
  }

  /**
   * Defines wich Champion is the Tournament Winner
   * @param champion The last Champion
   * @param index Index of the winner Champion
   */
  onSelectWinner(champion: Champion, index: number) {
    if (this.finalOpponents[0].id && this.finalOpponents[1].id && !this.winner.id) {
      this.winner = champion;

      index ? this.finalOpponents[0].disabled = true : this.finalOpponents[1].disabled = true;
    }
  }

}
