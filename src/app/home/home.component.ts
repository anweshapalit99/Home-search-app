import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
  <section>
    <form>
      <div>
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </div>
      <div class="results">
        <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>
      </div>
    </form>
  </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  filteredLocationList: HousingLocation[] = [];
  housingService : HousingService = inject(HousingService)
  housingLocationList: HousingLocation[] = [];
  constructor(){
    /* this.housingLocationList = this.housingService.getAllHousingLocation();
    this.filteredLocationList = this.housingLocationList; */
    this.housingService.getAllHousingLocation().then((housingLocationList: HousingLocation[])=>{
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    })
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }
  
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
