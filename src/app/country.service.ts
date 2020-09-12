import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICountry } from './country';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private _url= 'http://127.0.0.1:5000/';
  //private _url = "https://restcountries.eu/rest/v2/all";

  constructor(private http: HttpClient) { }

  getCountrys(): Observable<ICountry[]>{
    return this.http.get<ICountry[]>(this._url);
  }

  getCountryByName(name: string): Observable<ICountry>{
    let url = 'https://restcountries.eu/rest/v2/name/';
    return this.http.get<ICountry>(url+'{'+name+'}');
  }
}
