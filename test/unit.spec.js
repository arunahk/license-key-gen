'use strict'

/* Dev libs */
const chai = require('chai')
const expect = chai.expect
require('dotenv').config()

/* source */
const LicenseGen = require('../lib')

describe('createLicense', () =>
{
  console.time('createLicense')
  it('return proper license', () =>
  {
    const userInfo = {
      company: 'Webisto Tech',
      department: 'IT',
      city: 'Christchurch',
      country: 'New Zealand',
      zip: '8014'
    }
    const userData = { info: userInfo, prodCode: 'TEST01', appVersion: '0.0.1.' }
    const license = LicenseGen.createLicense(userData)

    expect(license).to.be.an('object')
    expect(license).to.have.property('message', 'ok')
    expect(license).to.have.property('errorCode', 0)
    expect(license).to.have.property('license').that.length(65)
  })
  console.timeEnd('createLicense')
})

describe('validateLicense', () =>
{
  console.time('validateLicense')
  it('validate license', () =>
  {
    const userInfo = {
      company: 'Webisto Tech',
      department: 'IT',
      city: 'Christchurch',
      country: 'New Zealand',
      zip: '8014'
    }
    const userData = { info: userInfo, prodCode: 'TEST01', appVersion: '0.0.1.' }
    const validity = LicenseGen.validateLicense(userData, '436HG-RWT33-4397G-G799C-7T30N-89W0F-G4BM7-FRMFN--G3N8-F4X89-0NW70')

    expect(validity).to.be.an('object')
    expect(validity).to.have.property('message', 'ok')
    expect(validity).to.have.property('errorCode', 0)
  })
  console.timeEnd('validateLicense')
})
