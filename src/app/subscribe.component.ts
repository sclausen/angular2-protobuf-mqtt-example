import { Component, OnDestroy } from '@angular/core';
import { MqttService, MqttMessage } from 'angular2-mqtt';
import { Subscription } from 'rxjs/Subscription';
import * as root from '../protobuf/value.protobuf.js';

@Component({
  selector: 'subscribe',
  template: `
  <div class="panel panel-default">
    <table class="table table-bordered">
      <tbody>
        <tr>
          <td class="col-sm-12">
            topic: angular2-protobuf-mqtt-example
          </td>
          <td>
            <button *ngIf="!subscribed" type="button" class="btn btn-success" (click)="subscribe()">Subscribe</button>
            <button *ngIf="subscribed" type="button" class="btn btn-danger" (click)="unsubscribe()">Unsubscribe</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading">
      <div class="panel-title">Message</div>
    </div>
    <div class="panel-body">
      <pre *ngIf="message">{{message | json}}</pre>
    </div>
  </div>
  `
})
export class SubscribeComponent implements OnDestroy {
  private subscription: Subscription;
  private subscribed: boolean = false;
  private message;

  constructor(private mqtt: MqttService) {

  }

  public subscribe($topic: string) {
    this.subscribed = true;
    this.subscription = this.mqtt
      .observe('angular2-protobuf-mqtt-example')
      .subscribe((message: MqttMessage) => {
        try {
          const value: root.example.Value = root.example.Value.decode(message.payload);
          this.message = value.toJSON();
        } catch (e) {
          console.error(e);
        }
      });
  }

  public unsubscribe($topic: string) {
    this.subscribed = false;
    this.message = null;
    this.subscription ? this.subscription.unsubscribe() : null;
  }

  public ngOnDestroy() {
    this.subscription ? this.subscription.unsubscribe() : null;
  }
}