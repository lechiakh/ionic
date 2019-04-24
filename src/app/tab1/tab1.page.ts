import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
	lat : any;
	lng : any;
	//data : any;
	constructor(public geolocation: Geolocation/*, public hotspot : Hotspot*/ ) {
		this.ionViewDidLoad();
	}
	ionViewDidLoad(){
		this.geolocation.getCurrentPosition().then((pos) => {
		this.lat = pos.coords.latitude;
		this.lng = pos.coords.longitude;
		console.log(this.lat);

		}).catch((error) => {
		console.log('Error getting location', error);
		});
		
	 /*this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
		this.data = networks;
		console.log(networks);
});*/

	}

}
