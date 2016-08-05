    // Registers are in the order starting from 20. Every entry consists of two registers. I.e the first entry is register 20
    // and the second is 22 and so on
    
var exports.REGISTER_OFFSET = 20;
var exports.Eprs04Registers = [
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

var exports.REGISTER = {    
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