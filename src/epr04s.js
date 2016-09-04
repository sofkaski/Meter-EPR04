module.exports = function(RED) {
    
    function Epr04sNode(config) {
        var log = RED.log;
        var vsprintf = require("sprintf-js").vsprintf;
        var Epr04sRegisters = require("./epr04sregisters.js").Epr04sRegisters;

        RED.nodes.createNode(this,config);
        var node = this;
        node.name = config.name;
        node.pollingInterval = config.pollingInterval;

        log.info("Instantiated EPR-04S module '" + node.name + "'");

              
        node.pollingIntervalId = 0;
    
        // set polling of registers. Send out messages compliant with node-red-contrib-modbus-rtu.
        node.pollingIntervalId = setInterval(function() {
                node.send([{ "topic": "readHoldingRegisters", "payload": { "slave": "1", "startRegister": "20", "nbrOfRegisters": "40" }},null]);
                },
            node.pollingInterval);
        
        node.on('input', function(msg) {
            if (msg.topic === "readHoldingRegisters") {
                var outPayload = {tstamp: Date.now(), data:[]};
                var inPayload = msg.payload;
                var cursor = 0; 
                for (var i = 0; i < Epr04sRegisters.length; i++) {
                    outPayload.data.push({label:Epr04sRegisters[i].label, 
                                     value: (((inPayload[cursor]<<16) | inPayload[cursor+1])*Epr04sRegisters[i].multiplier).toFixed(Epr04sRegisters[i].des), 
                                     unit:Epr04sRegisters[i].unit});
                    cursor += 2;
                }
                node.send([null, {"topic": "EPR04Measurements", "payload":outPayload}]);
            }
        });
        
        node.on('close', function() {
            if (node.pollingIntervalId) {
                clearInterval(node.pollingIntervalId);
            }
        });
    }    
    RED.nodes.registerType("epr04s",Epr04sNode);
    
};
