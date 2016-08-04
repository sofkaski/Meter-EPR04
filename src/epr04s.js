module.exports = function(RED) {
    
    // Registers are in the order starting from 20. Every entry consists of two registers. I.e the first entry is register 20
    // and the second is 22 and so on
    
    var  Epr04sRegisters = [
        {label: "L1 Active Power", multiplier: 0.1, unit: "Watt", des: 1}, 
        {label: "L2 Active Power", multiplier: 0.1, unit: "Watt", des: 1}, 
        {label: "L3 Active Power", multiplier: 0.1, unit: "Watt", des: 1},
        {label: "L1 Reactive Power", multiplier: 0.1, unit: "Var", des: 1}, 
        {label: "L2 Reactive Power", multiplier: 0.1, unit: "Var", des: 1}, 
        {label: "L3 Reactive Power", multiplier: 0.1, unit: "Var", des: 1}, 
        {label: "L1 Apparent Power", multiplier: 0.1, unit: "VA", des: 1}, 
        {label: "L2 Apparent Power", multiplier: 0.1, unit: "VA", des: 1}, 
        {label: "L3 Apparent Power", multiplier: 0.1, unit: "VA", des: 1}, 
        {label: "L1 Cos Phi", multiplier: 0.001, unit: "", des: 0}, 
        {label: "L2 Cos Phi", multiplier: 0.001, unit: "", des: 0}, 
        {label: "L3 Cos Phi", multiplier: 0.001, unit: "", des: 0}, 
        {label: "Total Import Active Power", multiplier: 0.1, unit: "Watt", des: 1}, 
        {label: "Total Export Active Power", multiplier: 0.1, unit: "Watt", des: 1}, 
        {label: "Total Inductive Reactive Power", multiplier: 0.1, unit: "Var", des: 1}, 
        {label: "Total Capacitive Reactive Power", multiplier: 0.1, unit: "Var", des: 1}, 
        {label: "Total Apparent Power", multiplier: 0.1, unit: "VA", des: 1}, 
        {label: "Average Inductive Cos Phi", multiplier: 0.001, unit: "", des: 0}, 
        {label: "Average Capacitive Cos Phi", multiplier: 0.001, unit: "", des: 0}, 
        {label: "Frequency", multiplier: 0.01, unit: "Hz", des: 0} 

    ];
    Object.freeze(Epr04sRegisters);
    
    var  REGISTERS = {
        L1ActivePower:0, 
        L2ActivePower:2, 
        L3ActivePower:4, 
        L1ReactivePower:6, 
        L2ReactivePower:8, 
        L3ReactivePower:10, 
        L1ApparentPower:12, 
        L2ApparentPower:14, 
        L3ApparentPower:16, 
        L1CosPhi:18, 
        L2CosPhi:20, 
        L3CosPhi:22, 
        TotalImportActivePower:24, 
        TotalExportActivePower:26, 
        TotalInductiveReactivePower:28, 
        TotalCapacitiveReactivePower:30, 
        TotalApparentPower:32, 
        AverageInductiveCosPhi:34, 
        AverageCapacitiveCosPhi:36, 
        Frequency:38 
    };
    Object.freeze(REGISTERS);

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
                node.send([{ "topic": "readHoldingRegisters", "payload": { "slave": "1", "startRegister": "20", "nbrOfRegisters": "40" }},null]);
                },
            node.pollingInterval);
        
        node.on('input', function(msg) {
            if (msg.topic === "readHoldingRegisters") {
                var outPayload = [];
                var inPayload = msg.payload;
                var cursor = 0; 
                for (var i = 0; i < Epr04sRegisters.length(); i++) {
                    outPayload.push({label:Epr04sRegisters[i].label, 
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
