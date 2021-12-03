import { Component, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  devices:any[] = [];
  
  constructor(private ble:BLE,private ngZone: NgZone,public alertController: AlertController) 
  {
    
  }
  
  async Scan(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Hi !',
      subHeader: 'Info',
      message: 'Please Turn on Bluetooth before scan if not enabled.',
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
    console.log("Bluetooth button clicked")
    this.devices = [];
    this.ble.scan([],15).subscribe(
      device => this.onDeviceDiscovered(device)
    );
  }

  onDeviceDiscovered(device){
    console.log('Discovered' + JSON.stringify(device,null,2));
    this.ngZone.run(async ()=>{
      this.devices.push(device)
    })
  }

  async BleInfo(device){
      if(device.name = "Nokia-53-F9"){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: 'Response Fail',
        message: 'Waiting for 5G receiver API',
        buttons: ['OK']
      });
      await alert.present();
      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }
    else {
      console.log('Response Error');
    }
  }

  }
  