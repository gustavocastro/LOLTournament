import { Component, OnInit, DoCheck,  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Champion } from './champion/champion.model';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-champions-list',
  templateUrl: './champions-list.component.html',
  styleUrls: ['./champions-list.component.scss']
})
export class ChampionsListComponent implements OnInit, DoCheck {
  champions: Array<Champion> = [];
  disabled: boolean = true;
  newChampion = { name: '', photo: '', addedByUser: true }; 

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.loading = true;

    this.http.get('https://lol-tournament-ab595.firebaseio.com/champions.json')
        .subscribe(res => {
          for (let key in res) {
            var newChampion = new Champion(key, res[key].name, res[key].photo, res[key].addedByUser)
            this.champions.push(newChampion);
            this.loadingService.loading = false;
          }
        });
  }

  ngDoCheck() {
    var storage = JSON.parse(window.localStorage.getItem('champions')) || [];
    
    if (storage.length == 4)
      this.disabled = false;
    else
      this.disabled = true;
  }

  /**
   * Add a new Champion by user input
   * @param {event} e The event trigged is only used to prevent default submit
   */
  onAddNewChampion(e) {
    e.preventDefault();
    this.loadingService.loading = true;
    
    this.http.post('https://lol-tournament-ab595.firebaseio.com/champions.json', this.newChampion)
        .subscribe(res => {
          var id = res["name"];
          var { name, photo, addedByUser } = this.newChampion;
          var champ = new Champion(id, name, photo, addedByUser);

          this.champions.push(champ);
          this.newChampion = { name: '', photo: '', addedByUser: true };
          this.loadingService.loading = false;
        },
        err => {
          console.log(err);
        });
  }

  /**
   * Removes visually a specific Champion from the list
   * If the Champion was selected, it also removes from the storage
   * @param {string} id The id of the Champion we want to remove
   */
  onChampionRemoved(id: string) {
    var storage = JSON.parse(window.localStorage.getItem('champions')) || [];

    this.champions.map((champ, i) => {
      if (champ.id === id)
        this.champions.splice(i, 1);
    });

    storage.map((champ, i) => {
      if (champ.id === id) {
        storage.splice(i, 1);
        window.localStorage.setItem('champions', JSON.stringify(storage));
      }
    });
  }

}
