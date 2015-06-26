'use strict';

const _ = require('lodash');
const confit = require('confit');

function tantrum(server, opts = {}, done){

  const config = confit({
    basedir: opts.basedir,
    protocols: opts.protocols
  });

  _.forEach(opts.defaults, (def) => {
    config.addDefault(def);
  });

  _.forEach(opts.overrides, (def) => {
    config.addOverride(def);
  });

  config.create((err, config) => {
    if(err){
      done(err);
      return;
    }

    server.expose('config', function(key, val){
      if(val == null){
        return config.get(key);
      }

      config.set(key, val);
    });

    done();
  });
}

tantrum.attributes = {
  pkg: require('./package.json')
};

module.exports = {
  register: tantrum
};
