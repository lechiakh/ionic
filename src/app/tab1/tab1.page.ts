import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController } from 'ionic-angular';
import { Network } from '@ionic-native/network/ngx';
import { BatteryStatus } from '@ionic-native/battery-status/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
	lat : any;
	lng : any;
	networkState : any;
	connectionInfos : any;
	levelStatus : any;
	isPluggedStatus : any;
	//data : any;
	constructor(public geolocation: Geolocation, private network: Network, private batteryStatus: BatteryStatus ) {
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
			let watch = this.geolocation.watchPosition();
			watch.subscribe((data) => {
			 // data can be a set of coordinates, or an error (if an error occurred).
			  this.lat = data.coords.latitude;
			  this.lng = data.coords.longitude;
			});
		
	 			// watch network for a disconnection
			let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
				this.connectionInfos = 'network was disconnected :-(';
			  console.log('network was disconnected :-(');
			});

			// stop disconnect watch
			disconnectSubscription.unsubscribe();


			// watch network for a connection
			let connectSubscription = this.network.onConnect().subscribe(() => {
			  console.log('network connected!');
			  this.connectionInfos = 'network connected!';

			  // We just got a connection but we need to wait briefly
			   // before we determine the connection type. Might need to wait.
			  // prior to doing any api requests as well.
			  setTimeout(() => {
			    if (this.network.type === 'wifi') {
   				this.connectionInfos = 'we got a wifi connection, woohoo';
			      console.log('we got a wifi connection, woohoo!');
			    }
			  }, 3000);
			});
			 this.networkState = this.network.type;
			// stop connect watch
			connectSubscription.unsubscribe();
			const subscription = this.batteryStatus.onChange().subscribe(status => {
   			console.log(status.level, status.isPlugged);
   			this.isPluggedStatus = status.isPlugged;
   			this.levelStatus = status.level;
});

			// stop watch
			subscription.unsubscribe();
	}

	 /*checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    this.networkState = states[networkState];
}*/


}
