module.exports = function(RED) {
    
    var Epr04sRegisters = {
        L1ActivePower: 20,
        L2ActivePower: 22,
        L3ActivePower: 24
    };
    Object.freeze(Epr04sRegisters);

    function Epr04sNode(config) {
        var log = RED.log;
        var vsprintf = require("sprintf-js").vsprintf;

        RED.nodes.createNode(this,config);
        var node = this;
        node.name = config.name;
        node.pollingInterval = config.pollingInterval;

        log.info("Instantiated EPR-04S module '" + node.name + "'");

        node.L1ActivePower = 0; 
        node.L2ActivePower = 0; 
        node.L3ActivePower = 0;
        
        node.pollingIntervalId = 0;
    
        node.pollingIntervalId = setInterval(function() {
                node.send({ "topic": "readHoldingRegisters", "payload": { "slave": "1", "startRegister": "20", "nbrOfRegisters": "6" }});
                },
            node.pollingInterval);
        
    }    
    RED.nodes.registerType("epr04s",Epr04sNode);
    
};
