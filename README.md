# Meter-EPR04
Node-RED abstraction of EPR-04 energy meter. 
Uses [node-red-contrib-modbus-rtu module](https://github.com/sofkaski/node-red-contrib-modbus-rtu) interface to read holding registers from the energy meter.  

Currently implemented output of the active power from three phases (L1,L2,L3).
Only silk glove tested.

__I would not consider using this yet (Jul-2016)__.

## Configuration
Node name and polling interval in milliseconds can be confgures. 
Drag the epr04s node to a flow and doule-click to edit properties. 

## Output message

Example:
```
{ "topic": "ActivePower", 
  "payload": [ { "label": "L1 Active Power", "value": "37.6", "unit": "Watt" }, 
               { "label": "L2 Active Power", "value": "0.0", "unit": "Watt" }, 
			   { "label": "L3 Active Power", "value": "0.0", "unit": "Watt" } ], 
			   "_msgid": "62ee376f.9d11c8" }
```			   