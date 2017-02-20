# Using protobuf with mqtt in angular2
This project is a demonstration of using protobuf with angular2 and mqtt.

The article for this example is located [here](http://blog.sebastian-clausen.de/2017-02-20-reduce-message-payload-in-an-iot-setup/)

## Prequisites
You need a running mqtt server with websocket support under port 9001.
I can recommend [mosquitto](https://mosquitto.org/).
My mosquitto.conf with websockets enabled looks as follows
```
pid_file /var/run/mosquitto.pid

persistence true
persistence_location /var/lib/mosquitto/

log_dest file /var/log/mosquitto/mosquitto.log

listener 1883

listener 9001 127.0.0.1
protocol websockets

include_dir /etc/mosquitto/conf.d
```
You also need angular-cli.
```
npm install -g @angular/cli
```
## Install dependencies
``` sh
npm install
./node_modules/protobufjs/bin/pbjs -t static-module -w commonjs -o ./src/protobuf/value.protobuf.js ./value.proto
./node_modules/protobufjs/bin/pbts -o ./src/protobuf/value.protobuf.d.ts ./src/protobuf/value.protobuf.js
```

## Run the app
Run `ng serve` for a server then navigate to `http://localhost:4200/` to see the example in action.
