#!/usr/bin/env node

require("babel/polyfill");

let flags = require('flags');
let AirSonos = require('./airsonos');

flags.defineBoolean('diagnostics', false, 'run diagnostics utility');
flags.defineBoolean('version', false, 'return version number');
flags.defineInteger('timeout', 5, 'disconnect timeout (in seconds)');
flags.defineBoolean('verbose', false, 'show verbose output');
flags.parse();

if (flags.get('version')) {

  let pjson = require('../package.json');
  console.log(pjson.version);

} else if (flags.get('diagnostics')) {

  let diag = require('../lib/diagnostics');
  diag();

} else {

  console.log('Searching for Sonos devices on network...\n');

  let instance = new AirSonos({
    verbose: flags.get('verbose'),
    timeout: flags.get('timeout'),
  });

  instance.start(function(tunnel) {
    console.log(`${ tunnel.deviceName } (@ ${ tunnel.device.host }:${ tunnel.device.port }, ${ tunnel.device.groupId })`);
  });
}
