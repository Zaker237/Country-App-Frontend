import { OnInit, Component } from '@angular/core';
import { CountryService } from '../country.service';
import { ICountry } from '../country';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
})
export class CountryListComponent implements OnInit{
  public title: string = 'Country list';
  public countrys = [];
  private _countryFilter = 'cameroun';
  public filteredCountrys: ICountry[] = [];
  private _countryClassificator: string = 'name';
  public order: boolean;

  constructor(private _countryService: CountryService){}

  ngOnInit(){
    this._countryService.getCountrys().subscribe(
      data=>{
        this.countrys = data;
        this.filteredCountrys = data;
      }
    );


    this._countryFilter = '';

  }

  public get countryFilter(): string{
    return this._countryFilter;
  }

  public set countryFilter(filter: string){
    this._countryFilter = filter;

    this.filteredCountrys = this.countryFilter ? this.filterCountrys(this.countryFilter) : this.countrys;
  }

  private filterCountrys(criteria: string): ICountry[]{
    criteria.toLowerCase();
    const res=this.countrys.filter(
      (country: ICountry)=>country.name.toLowerCase().indexOf(criteria) != -1
    );

    return res;
  }

  public get countryClassificator(): string{
    return this._countryClassificator;
  }

  public set countryClassificator(countryClassifificator: string){
    this._countryClassificator = countryClassifificator;
    this.filteredCountrys = this.countryClassificator ? this.classifyCountrys(this.countryClassificator) : this.filteredCountrys;
  }

  private compareName(a: ICountry, b: ICountry){
    const bandA = a.name.toUpperCase();
    const bandB = b.name.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

  private compareCapital(a: ICountry, b: ICountry){
    const bandA = a.capital.toUpperCase();
    const bandB = b.capital.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

  private classifyCountrys(classificator: string): ICountry[]{
    switch(classificator) {
      case 'name':
        classificator.toLowerCase();
        let res = this.filteredCountrys.sort(
          (country1: ICountry, country2: ICountry)=> this.compareName(country1, country2)
        );
        return res;
      case 'capital':
        classificator.toLowerCase();
        let res1 = this.filteredCountrys.sort(
          (country1: ICountry, country2: ICountry)=> this.compareCapital(country1, country2)
        );
        return res1;
      case 'area':
         return this.filteredCountrys.sort(
          (country1: ICountry, country2: ICountry)=> { return country1.area- country2.area;}
        );
      case 'population':
        return this.filteredCountrys.sort(
          (country1: ICountry, country2: ICountry)=> { return country1.population- country2.population;}
        );
      case 'gini':
        return this.filteredCountrys.sort(
          (country1: ICountry, country2: ICountry)=> { return country1.gini- country2.gini;}
        );
      default:
        return this.filteredCountrys;
    }
  }

  public toggleIsOrder(): void{
    this.order = !this.order;
    this.filteredCountrys.reverse();
  }
}
