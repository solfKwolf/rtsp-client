const RTSPClient = require("../index")
const SemanticSDP	= require("semantic-sdp");
const client = new RTSPClient();

client.on("data", (buf) => {
  console.log(buf)
})

client.on("connected", async () => {
  console.log("connected success")

  const option = await client.options();
  console.log("S --> C", option)
  const describe = await client.describe()
  console.log("S --> C", describe)
  const sdp = describe.body.plain
  var offer = SemanticSDP.SDPInfo.process(sdp);
  let videoOffer = offer.getMedia("video");
  const setup = await client.setup(videoOffer.control, "RTP/AVP/TCP;unicast;interleaved=0-1")
  console.log("S --> C", setup)
  let sessionId = "";
  setup.headers.forEach(item => {
    if(item.name == "Session") {
      sessionId = item.values[0].value
    }
  })
  console.log("sessionId", sessionId)
  client.setSession(sessionId)
  const play  = await client.play()
  console.log("S --> C", play);
})

client.connect("rtsp://localhost:8554/mystream");
