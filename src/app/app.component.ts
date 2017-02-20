import { Component } from '@angular/core';
import { MqttService, MqttConnectionState } from 'angular2-mqtt';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  template: `
    <div class="container" *ngIf="(mqtt.state | async) === MqttConnectionState.CONNECTED">
      <div class="row">
        <div class="col-sm-6">
          <subscribe></subscribe>
        </div>
        <div class="col-sm-6">
          <publish></publish>
        </div>
      </div>
    </div>
    <div class="container">
      <h1 *ngIf="(mqtt.state | async) === MqttConnectionState.CONNECTING">Connecting to MQTT Broker</h1>
      <h1 *ngIf="(mqtt.state | async) === MqttConnectionState.CLOSED">MQTT Connection Closed</h1>
    </div>
  `
})
export class AppComponent {
  public MqttConnectionState = MqttConnectionState;
  public connectionState: Observable<MqttConnectionState>;
  public jsonObject;

  constructor(private mqtt: MqttService) {

  }
}
