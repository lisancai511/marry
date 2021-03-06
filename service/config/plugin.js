'use strict'

/** @type Egg.EggPlugin */
// exports.cors = {
//   enable: true,
//   package: 'egg-mongoose',
// };

exports.jwt = {
  enable: true,
  package: 'egg-jwt',
}

exports.http = {
  enable: true,
  package: 'egg-axios',
}

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
}

// exports.redis = {
//   enable: true,
//   package: 'egg-redis'
// };
