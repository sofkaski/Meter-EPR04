module.exports = function(RED) {
    
    function Epr04sHistoryNode(config) {
        var log = RED.log;
        var fs = require('fs');
        var epr04sRegisters = require("./epr04sregisters.js");
      	var Epr04sRegisters = epr04sRegisters.Epr04sRegisters;
        var REGISTER_GROUPS = epr04sRegisters.REGISTER_GROUPS;
        var rounderDB = require("rounder.js");
        var userDir = require("settings.js").userDir;

        RED.nodes.createNode(this,config);
        var node = this;
        node.name = config.name;
        node.storingInterval = config.storingInterval;
      
        var DBConf = require('./historydb.conf.js');
        var db = null;
        var dbFileName = userDir+"/"+DBconf.persistenceConf.dbFile;
        if (fs.existsSync(dbFileName)) {
          var obj = JSON.parse(fs.readFileSync(dbFileName));
          db = RounderDB.loadInstance(obj);
          log.info("Opened existing EPR04S-History database from '" + dbFileName + "'");
        } 
        else {
          db = RounderDB.createInstance(DBconf);
          log.info("Created a new EPR04S-History database to '" + dbFileName + "'");
        }
        log.info("Instantiated EPR04S-History module '" + node.name + "'");

        // Handling of incoming message from node-red-contrib-modbus-rtu
        //
        node.on('input', function(msg) {
          if (msg.topic != "EPR04Measurements") {return msg;}
          for (var group in msg.payload.data) {
            for (var measurement in group) {
              db.add(measurement, group.measurement, msg.payload.tstamp);  
            }
          }
          return msg;
        });


        // handling of closing the system
        //
       //node.on('close', function() {
            
        //});

         
    }    
    RED.nodes.registerType("epr04s-history",Epr04sHistoryNode);
    
};
