import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent,FormsModule],
  template: `
  <section>
    <form>
      <div>
        <input name="searchInput" type="text" [ngModel]="defaultString" (ngModelChange)="filterResults($event)"  placeholder="Start typing to search by city..." #filter>
        <button class="primary" type="button">Sort by</button>
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
  defaultString : String = ""
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

  test(value:String){
    console.log("Testing on change event",value)
  }
}
