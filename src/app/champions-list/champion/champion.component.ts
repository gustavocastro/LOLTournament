import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Champion } from './champion.model';
import { LoadingService } from 'src/app/loading.service';

@Component({
  selector: 'app-champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.scss']
})
export class ChampionComponent implements OnInit {
  @Input() champion: Champion;
  @Output() removeChampion: EventEmitter<string> = new EventEmitter();
  selectedClass: boolean = false;
  championImage: string = '../../../assets/images/default-champion.png';

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  ngOnInit() {
    var storage = JSON.parse(window.localStorage.getItem('champions')) || [];
    storage.map(champ => {
      champ.id === this.champion.id ? this.selectedClass = true : null;
    });

    if (this.champion.photo)
      this.championImage = this.champion.photo;
  }

  /**
   * Selects a Champion for the battle and stores them in the localStorage
   * @param {Champion} champion Select a Champion when user clicks its card
   */
  onSelectChampion(champion: Champion) {
    var storage = JSON.parse(window.localStorage.getItem('champions')) || [];

    if (storage.length) {
      for (let i = 0; i < storage.length; i++) {
        if (champion.id === storage[i].id) {
          storage.splice(i, 1);
          this.selectedClass = false;
        }
        else if (storage.length < 4 && i === storage.length - 1) {
          storage.push(champion);
          this.selectedClass = true;
          break;
        }
      }
    }
    else {
      storage.push(champion);
      this.selectedClass = true;
    }

    window.localStorage.setItem('champions', JSON.stringify(storage));
  }

  /**
   * Deletes a specific Champion from the database
   * @param {Champion} champion Champion we want to delete
   */
  onRemoveChampion(champion: Champion) {
    this.loadingService.loading = true;

    this.http.delete(`https://lol-tournament-ab595.firebaseio.com/champions/${champion.id}.json`)
        .subscribe(res => {
          this.removeChampion.emit(champion.id);
          this.loadingService.loading = false;
        },
        err => {
          console.log(err)
        });    
  }

}
