import { Component, OnInit, OnDestroy } from '@angular/core';
import { MqttService, MqttMessage } from 'angular2-mqtt';

import * as root from '../protobuf/value.protobuf.js';

@Component({
  selector: 'publish',
  template: `
    <div class="panel panel-default">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <td class="col-sm-12">
              <input type="number" class="form-control" [(ngModel)]="$message" placeholder="A uint64 number" />
            </td>
            <td>
              <button type="button" class="btn btn-primary" (click)="publish($message)">Publish</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class PublishComponent {

  constructor(private mqtt: MqttService) {

  }

  public publish($message: string) {
    const buffer = root.example.Value.encode({value: $message}).finish();
    this.mqtt.unsafePublish('angular2-protobuf-mqtt-example', buffer);
  }

}