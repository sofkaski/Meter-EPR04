if (!context.global.powerUpperLimit) {
    context.global.powerUpperLimit = 45;
}
 var PowerState = {
        UNDER_LIMIT: {fill:"green",shape:"dot",text:""},
        OVER_LIMIT: {fill:"red",shape:"dot",text:""}
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
    var powerState = PowerState.OVER_LIMIT;
    powerState.text = "over the limit " + context.global.powerUpperLimit.toString();
    node.status(powerState)
}
else {
    msg.payload = {exceeded:false, powerValue:power};
    var powerState = PowerState.UNDER_LIMIT;
    powerState.text = "under the limit " + context.global.powerUpperLimit.toString();
    node.status(powerState)
}
return msg;
