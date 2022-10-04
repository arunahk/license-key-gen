'use strict'

const errors = require('./errors')

/**
 * @param {string} str string to encrypt
 * @param {string} privKey private key
 * @returns {string} encrypted string
 */
const encryptString = (str, privKey = process.env.PRIVATE_KEY) =>
{
  //
  if (!str) throw (errors('ENCRYPT_ERROR'))
  if (privKey === '') throw (errors('ENCRYPT_ERROR'))
  //
  const alfaKeys = process.env.ALPHA_KEYS
  const alfaArray = alfaKeys.split('')
  let encryptedString = ''
  let z = 0
  //
  str.split('').forEach((theChar) =>
  {
    //
    const pos1 = alfaArray.indexOf(theChar) + 1
    const theStr = privKey.charAt(z)
    const pos2 = alfaArray.indexOf(theStr) + 1
    const pos3 = ((pos1 + pos2) % (alfaKeys.length)) - 1
    //
    if (pos1 > -1 && pos2 > -1 && pos3 > -1) encryptedString += alfaKeys.charAt(pos3)
    z++
    //
  })
  return encryptedString
}

/**
 * @param {string} str string to decrypt
 * @param {string} privKey private key
 * @returns {string} decrypted string
 */
const decryptString = (str, privKey = process.env.PRIVATE_KEY) =>
{
  //
  if (!str) throw errors('DECRYPT_ERROR')
  const alfaKeys = process.env.ALPHA_KEYS
  const alfaArray = alfaKeys.split('')
  let decryptedString = ''
  let z = 0
  //
  str.split('').forEach((theChar) =>
  {
    //
    const pos1 = alfaArray.indexOf(theChar) + 1
    const theStr = privKey.charAt(z)
    const pos2 = alfaArray.indexOf(theStr) + 1
    const pos3 = ((alfaKeys.length + pos1 - pos2) % (alfaKeys.length)) - 1
    //
    if (pos1 > -1 && pos2 > -1 && pos3 > -1) decryptedString += alfaKeys.charAt(pos3)
    z++
    //
  })
  return decryptedString
}
//
module.exports = { encryptString, decryptString }
