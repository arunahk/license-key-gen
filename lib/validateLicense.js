'use strict'

const License = require('./License')
const errors = require('./errors')

/**
 * @param {object} licenseData User data
 * @param {string} serial serial to validate
 * @returns {{errorCode: number, message: string}|object} validated object
 */
module.exports = (licenseData, serial) =>
{
  /* error if missing user info */
  if (!licenseData) throw errors('WINFO_MISSING')
  if (!serial) throw errors('WNOT_STRING')

  try
  {
    const license = new License(licenseData)

    if (license.serial === serial)
    {
      return errors()
    }
    throw errors('NOT_VALID')
  }
  catch (err)
  {
    throw (err)
  }
}
