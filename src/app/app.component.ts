import { Component } from '@angular/core';
import { MqttService, MqttConnectionState } from 'angular2-mqtt';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  template: `
    <div class="container" *ngIf="(mqtt.state | async) === MqttConnectionState.CONNECTED">
      <div class="row">
        <div class="col-sm-12">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Using protobuf with mqtt in angular2</h3>
            </div>
            <div class="panel-body">
              <p>This is a demonstration of using protobuf with angular2 and mqtt.</p>
              <p>To keep this example simple, we just want to send an uint64 via mqtt.</p>
              <p>Here is our protobuf file <samp>value.proto</samp></p>
              <pre>syntax = &quot;proto3&quot;;&#10;&#10;package example;&#10;&#10;message Value &#123;&#10;  uint64 value = 1;&#10;&#125;</pre>
              <p>To actually use it, we have to compile it to a javascript file. The official protobuf compiler has a js compile target and different options. Unfortunately, its difficult to use with typescript</p>
              <p>Fortunately there exists <a href="https://github.com/dcodeIO/protobuf.js">protobuf.js</a>!</p>
              <p>Along the files you have to include in your project to encode or decode protobuf messages in general, <strong>protobuf.js</strong> has a command line interface to create the needed javascript files for our <samp>value.proto</samp> file and the typescript definitions. So we don't need protoc from <a href="https://github.com/google/protobuf">google/protobuf</a>.</p>
              <p>Now execute</p>
              <pre>./node_modules/protobufjs/bin/pbjs -t static-module -w commonjs -o ./src/protobuf/value.protobuf.js ./value.proto</pre>
              <p>to create the javascript file for our protobuf file and</p>
              <pre>./node_modules/protobufjs/bin/pbts -o ./src/protobuf/value.protobuf.d.ts ./src/protobuf/value.protobuf.js</pre>
              <p>to generate the corresponding typescript definitions.</p>
              <p>After the script placed the javascript file and the type definition at the desired place, we can start using protobuf by importing the bundle</p>
              <pre>import * as root from '../protobuf/value.protobuf.js';</pre>
              <p>As defined in <samp>value.proto</samp>, the object under root is the packagename <samp>example</samp> and then the only message type we defined <samp>Value</samp>. With it we can now create, encode, decode, verify and convert messages. For detailed information, what you can do with the <samp>Value</samp> object, you can hava a look at the typescript definition file <samp>./src/protobuf/value.protobuf.d.ts</samp></p>
              <p>Now click the "Subscribe" button below, and enter a number. Remember, we defined the value as a uint64. Then click "Publish".</p>
              <p>Now the following code is executed in the publish component</p>
              <pre>const buffer = root.example.Value.encode(&#123;value: 123456789&#125;).finish();&#10;this.mqtt.unsafePublish(&apos;angular2-protobuf-mqtt-example&apos;, buffer);</pre>
              <p>The subscribe component now will receive the encoded message and will decode it</p>
              <pre>const value: root.example.Value = root.example.Value.decode(message.payload);&#10;this.message = value.toJSON();</pre>
              <p><samp>this.message</samp> is then rendered in the component via the json pipe</p>
            </div>
          </div>
        </div>
      </div>
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
