var SerialPort = require('serialport').SerialPort;
var modbus = require('modbus-rtu');

//create serial port with params. Refer to node-serialport for documentation
var serialPort = new SerialPort("/dev/ttyUSB0", {
   baudrate: 9600
});

//create ModbusMaster instance and pass the serial port object
var master = new modbus.Master(serialPort);

//Read from slave with address 1 four holding registers starting from 0.
master.readHoldingRegisters(1, 44, 4).then(function(data){
    //promise will be fulfilled with parsed data
    console.log(data); 
}, function(err){
    //or will be rejected with error
})

