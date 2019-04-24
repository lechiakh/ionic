import { Component , OnInit } from '@angular/core';
import { Tab2Service, SearchType } from './../services/tab2.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
	
	results: Observable<any>;
  searchTerm: string = '';
  author: string = '';

 
  /**
   * Constructor of our first page
   * @param movieService The movie Service to get data
   */
  constructor(private movieService: Tab2Service) { 
  //this.searchChanged(); 
  }
 
  ngOnInit() { }
  searchChanged() {
    // Call our service function which returns an Observable
    this.results = this.movieService.searchData(this.searchTerm, this.author);
  }
 /* searchChanged() {
    // Call our service function which returns an Observable
    this.movieService.searchData(this.searchTerm , this.author).then((data)=>{
		console.log("data",data)
		  this.array = data;

	});
  }*/
}

