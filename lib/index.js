'use strict'
//
var validateLicense = require('./validateLicense')
var createLicense = require('./createLicense')
require('dotenv').config()
//
module.exports = { validateLicense, createLicense }
