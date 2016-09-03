// name: totalImportPowerLimit
// outputs: 1
if (!context.powerUpperLimit) {
    context.global.powerUpperLimit = 45;
}
 var PowerState = {
        UNDER_LIMIT: {fill:"green",shape:"dot",text:""},
        OVER_LIMIT: {fill:"red",shape:"ring",text:"over limit"}
 };
 
if (msg.topic != "EPR04Measurements") {
    return msg;
}
var REGISTER = global.get('epr04sregisters').REGISTER;
var upperLimitExceeded = false;
var totalImportActivePower = msg.payload[REGISTER.TotalImportActivePower/2];
var power = parseFloat(totalImportActivePower.value);
if (power > context.global.powerUpperLimit) {
    upperLimitExceeded = true;
}
msg.topic = "\"powerLimit\"";
if (upperLimitExceeded){
    msg.payload = {exceeded:true, powerValue:power};
    node.status(PowerState.OVER_LIMIT);
}
else {
    msg.payload = {exceeded:false, powerValue:power};
    node.status(PowerState.UNDER_LIMIT);
}
return msg;
