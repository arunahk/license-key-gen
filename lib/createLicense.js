'use strict'

const License = require('./License')
const errors = require('./errors')

/**
 * @param {object} licenseData User data
 * @returns {object} generated serial
 */
module.exports = (licenseData) =>
{
  const license = new License(licenseData)
  const result = errors()
  result.license = license.getSerial()
  return result
}
