'use strict'

const md5 = require('md5')
const crypt = require('./encrypt-decrypt')
const errors = require('./errors')
const os = require('./supported')

/**
 * @class License
 * @type {module.License}
 */
module.exports = class License
{
  /**
   * @constructor
   * @param {object} info User details
   * @param {string} prodCode Product code
   * @param {string} appVersion Application version
   * @param {string} osType Operating System type
   */
  constructor ({info, prodCode, appVersion = '1.0', osType} = {})
  {
    //
    if (!info || typeof info !== 'object') throw errors('WINFO_MISSING')
    if (!prodCode) throw errors('WPRODCODE_MISSING')
    // setters
    this._info = info
    this._prodCode = prodCode
    this._appVersion = appVersion
    this._osType = os[osType]
    this.id = null
    this.serial = null
    this.updateSerial()
  }

  /**
   * @param {object} info User details
   */
  set info (info)
  {
    if (info)
    {
      this._info = info
      this.updateSerial()
    }
  }

  /**
   * @param {string} prodCode Product code
   */
  set prodCode (prodCode)
  {
    if (prodCode)
    {
      this._prodCode = prodCode
      this.updateSerial()
    }
  }

  /**
   * @param {string} appVersion Application version
   */
  set appVersion (appVersion)
  {
    if (appVersion)
    {
      this._appVersion = appVersion
      this.updateSerial()
    }
  }

  /**
   * @param {string} osType Operating System type
   */
  set osType (osType)
  {
    if (osType)
    {
      this._osType = osType
      this.updateSerial()
    }
  }

  /**
   * update serial number
   */
  updateSerial ()
  {
    this.id = generateHash(this._info, this._prodCode, this._appVersion, this._osType)
    this.serial = createSerial(this.id)
  }

  /**
   * @returns {string} returns serial generated serial number
   */
  getSerial ()
  {
    return this.serial
  }
}

/**
 * @param {string} id id
 * @returns {*} returns generated serial
 */
let createSerial = (id) =>
{
  return generateSerial(id)
}

/**
 * @param {object} info User details
 * @param {string} prodCode Product code
 * @param {string} appVersion Application version
 * @param {string} osType Operating System type
 * @returns {*} returns generated serial
 */
let generateHash = (info, prodCode, appVersion, osType) =>
{
  //
  let userInfo = []
  //
  Object.keys(info).forEach((key) =>
  {
    const val = info[key]
    userInfo.push(val)
  })
  //
  let str = userInfo.join()
  const reg = new RegExp('[^0-9a-zA-Z]+', 'g')
  info = str.replace(reg, '')
  //
  const infoClean = info.toUpperCase()
  //
  const regVr = new RegExp('\\.+', 'g')
  const appVr = appVersion.replace(regVr, '')
  //
  const uniqueOSID = generateOSHash(osType)
  //
  const userInfoStr = infoClean + prodCode + appVr + uniqueOSID
  return (md5(userInfoStr)).toUpperCase()
}

/**
 * create encrypted string
 * @param {string} id id
 * @returns {*} return chunk serial
 */
let generateSerial = (id) =>
{
  let regKey = crypt.encryptString(id).toString()
  return chunkString(regKey, 5)
}

/**
 * @param {string} str string value
 * @param {int} length length to chunck
 * @returns {string} chunk serial
 */
let chunkString = (str, length) =>
{
  const regEx = new RegExp('.{1,' + length + '}', 'g')
  let newStr = str.match(regEx)
  // trim extra
  if (newStr.length > 6) newStr.pop()
  return newStr.join('-').toUpperCase()
}

/**
 * Create merge system params
 * @param {string} osType Operating System type
 * @returns {string} returns merged string
 */
let generateOSHash = (osType) =>
{
  let osHash = ''
  if (osType)
  {
    let strObj = osType.os + osType.type + osType.version
    osHash = strObj.replace('.', '').replace('-', '').toUpperCase()
  }
  return osHash
}
