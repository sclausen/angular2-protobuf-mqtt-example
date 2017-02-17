import { Angular2ProtobufMqttExamplePage } from './app.po';

describe('angular2-protobuf-mqtt-example App', () => {
  let page: Angular2ProtobufMqttExamplePage;

  beforeEach(() => {
    page = new Angular2ProtobufMqttExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
