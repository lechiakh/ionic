import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Typescript custom enum for search types (optional)
export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode'
}
 
@Injectable({
  providedIn: 'root'
})

export class Tab2Service {

  url = 'http://ieeexploreapi.ieee.org/api/v1/search/articles?parameter';
  apiKey = '6ufdd32cmv4s5gyqkpqt6cdf'; // <-- Enter your own key here!
 
  /**
   * Constructor of the Service with Dependency Injection
   * @param http The standard Angular HttpClient to make requests
   */
  constructor(private http: HttpClient) { } 
 
  /**
  * Get data from the OmdbApi 
  * map the result to return only the results that we need
  * 
  * @param {string} title Search Term
  * @param {string} author movie, series, episode or empty
  * @returns Observable with the search results
  */
  searchData(title: string, author: string) {
    //return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`).pipe(
	return this.http.get(`${this.url}?article_title=${encodeURI(title)}&author=${encodeURI(author)}&apikey=${this.apiKey}`).pipe(
      map(results => results['articles'])

    );

	/*return new Promise((resolve,reject)=>{
		this.http.get(`${this.url}?article_title=${title}&author=${author}&apikey=${this.apiKey}`).subscribe((response) => {
    //console.log(response.articles);
	  resolve(response.articles)
          map((results) => {results['articles'];
        console.log(results);
    })
});
	}) */

     // map(results => results['Search'])
    //);
  }
 
  /**
  * Get the detailed information for an ID using the "i" parameter
  * 
  * @param {string} id imdbID to retrieve information
  * @returns Observable with detailed information
  */
  getDetails(id) {
    return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
  }
}

