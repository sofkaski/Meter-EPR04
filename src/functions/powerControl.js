// name: Power control
// outputs: 1
if (msg.topic === "powerLimit") {
    msg.topic = "relayControl";
    msg.payload.relay = 0;
    if (msg.payload.data.exceeded) {
        msg.payload.state = 1;
    }
    else {
        msg.payload.state = 0;
    }
}
return msg