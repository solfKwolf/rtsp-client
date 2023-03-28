RTSP-CLIENT
===

The RTSP client for Node.js


> so far only support rtsp over TCP.

## Getting Started


### Install

```sh
npm i --save @solfkwolf/rtsp-client
```

### Usage

You can see the example folder.

```js
const RTSPclient = require('@solfkwolf/rtsp-client')

const client = new RTSPClient();

// after play, receive data
client.on("data", (buf) => {
  console.log(buf)
})

// socket connected
client.on("connected", async () => {
  const option = await client.options();
  console.log("S --> C", option)
  const describe = await client.describe()
  console.log("S --> C", describe)
})

client.connect("rtsp://localhost:8554/mystream");
```


## Contributing

Please contribute features or commit issues!
