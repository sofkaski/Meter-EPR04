module.exports = function(RED) {
    
    function Epr04sNode(config) {
        var log = RED.log;
        var vsprintf = require("sprintf-js").vsprintf;
        var epr04sRegisters = require("./epr04sregisters.js");
        var Epr04sRegisters = epr04sRegisters.Epr04sRegisters;
        var REGISTER_GROUPS = epr04sRegisters.REGISTER_GROUPS;

        RED.nodes.createNode(this,config);
        var node = this;
        node.name = config.name;
        node.pollingInterval = config.pollingInterval;

        log.info("Instantiated EPR-04S module '" + node.name + "'");

              
        node.pollingIntervalId = 0;
    
        // set polling of registers. Send out messages compliant with node-red-contrib-modbus-rtu.
        //
        node.pollingIntervalId = setInterval(function() {
                node.send([{ "topic": "readHoldingRegisters", "payload": { "slave": "1", "startRegister": epr04sRegisters.REGISTER_OFFSET, "nbrOfRegisters": "40" }},null]);
                },
            node.pollingInterval);
        
        // Handling of incoming message from node-red-contrib-modbus-rtu
        //
        node.on('input', function(msg) {
            if (msg.topic === "readHoldingRegisters") {
                var outPayload = {tstamp: Date.now(), data:[]};
                var inPayload = msg.payload;
                for (var group in REGISTER_GROUPS) {
                    var groupData = {};
                    for (var member in REGISTER_GROUPS[group]) {
                        var offset = REGISTER_GROUPS[group][member] - epr04sRegisters.REGISTER_OFFSET;
                        var regValue = epr04sRegisters.registerValue(REGISTER_GROUPS[group][member], inPayload[offset], inPayload[offset+1]);   
                        groupData[member] = regValue;
                    }
                    outPayload.data.group = groupData;
                }
                node.send([null, {"topic": "EPR04Measurements", "payload":outPayload}]);
            }
        });
        
        // handling of closing the system
        //
        node.on('close', function() {
            if (node.pollingIntervalId) {
                clearInterval(node.pollingIntervalId);
            }
        });

         
    }    
    RED.nodes.registerType("epr04s",Epr04sNode);
    
};
