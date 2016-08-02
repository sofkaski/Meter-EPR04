module.exports = function(RED) {
    
    // Registers are in the order starting from 20. Every entry consists of two registers. I.e the first entry is register 20
    // and the second is 22 and so on
    
    var  Epr04sRegisters = [
        {label: "L1 Active Power", multiplier: 0.1, unit: "Watt"}, 
        {label: "L2 Active Power", multiplier: 0.1, unit: "Watt"}, 
        {label: "L3 Active Power", multiplier: 0.1, unit: "Watt"}, 
    ];

    function Epr04sNode(config) {
        var log = RED.log;
        var vsprintf = require("sprintf-js").vsprintf;

        RED.nodes.createNode(this,config);
        var node = this;
        node.name = config.name;
        node.pollingInterval = config.pollingInterval;

        log.info("Instantiated EPR-04S module '" + node.name + "'");

              
        node.pollingIntervalId = 0;
    
        // set polling of registers. Send out messages compliant with node-red-contrib-modbus-rtu.
        node.pollingIntervalId = setInterval(function() {
                node.send([{ "topic": "readHoldingRegisters", "payload": { "slave": "1", "startRegister": "20", "nbrOfRegisters": "20" }},null]);
                },
            node.pollingInterval);
        
        node.on('input', function(msg) {
            if (msg.topic === "readHoldingRegisters") {
                var outPayload = [];
                var inPayload = msg.payload;
                var cursor = 0; 
                for (var i = 0; i<=2; i++) {
                    outPayload.push({label:Epr04sRegisters[i].label, 
                                     value: (((inPayload[cursor]<<16) | inPayload[cursor+1])*Epr04sRegisters[i].multiplier).toFixed(1), 
                                     unit:Epr04sRegisters[i].unit});
                    cursor += 2;
                }
                node.send([null, {"topic": "ActivePower", "payload":outPayload}]);
            }
        });
        
        node.on('close', function() {
           clearInterval(node.pollingIntervalId);
        });
    }    
    RED.nodes.registerType("epr04s",Epr04sNode);
    
};
