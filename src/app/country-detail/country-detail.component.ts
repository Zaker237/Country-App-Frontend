import { OnInit, Component } from '@angular/core';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css',],
})
export class CountryDetailComponent implements OnInit{
  public title: string = '';
  public countryName: string = 'cameroon';
  public country;

  constructor(private _countryService: CountryService){

  }

  ngOnInit(){
    this._countryService.getCountryByName(this.countryName).subscribe(
      data=>this.country = data
    );
  }
}
