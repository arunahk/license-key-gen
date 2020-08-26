[![Build Status](https://travis-ci.org/arunahk/license-key-gen.svg?branch=master)](https://travis-ci.org/arunahk/license-key-gen)

# license-key-gen
- Generate license keys for given company details
- The [license-key-gen](https://www.webisto.tech) library exported as [Node.js](https:nodejs.org/) modules.

## Source
This project has been imported from [license-key-gen](https://www.npmjs.com/package/license-key-gen) in npm.org.

## Docs

Generate a License Key and validate the license. This is typically used for software licensing (serial number).

## Installation

```
npm install license-key-gen
```

## Data Structure
To create a license key - Enter the users information that your are able to receive

This object can be any data you wish to tie the license to - format Object

```js
var userInfo = {
  company: "webisto.tech",
  street: "123 licenseKey ave", 
  city: "city/town", 
  state: "State/Province", 
  zip: "postal/zip"
}
```

Must include:
1) ProductCode (string) - product abbr name, can be any size
2) AppVersion (string) - optional if you want to tie the license to a version number
3) osType (string) - lock the license to a specific operating system
    supported: 
    Windows: WIN, WIN7, WIN8, WIN10
    Macintosh: OSX, OSX1, OSX2, OSX3, OSX4, OSX5, OSX6, OSX7, OSX8, OSX9, OSX10, OSX11, OSX12
    Apple Mobile: IOS, IOS5, IOS6, IOS7, IOS8, IOS9, IOS10
    Google Mobile: ANDROID, ANDROID2, ANDROID3, ANDROID4, ANDROID43, ANDROID44, ANDROID5, ANDROID6, ANDROID7
    OTHER

```js
var userLicense = {
  info: userInfo, 
  prodCode: "LEN100120", 
  appVersion: "1.5", 
  osType: "IOS8"
} 
```

## Init

```js
var licenseKey = require('license-key-gen');
```

## Create a License Key
Then run the following code to receive the License for the client
This function to be run ONLY for you to generate the license code for the client

```js
var licenseKey = require('license-key-gen');

var userInfo = {
  company: "webisto.tech",
  street: "123 licenseKey ave", 
  city: "city/town", 
  state: "State/Province", 
  zip: "postal/zip"
}
var licenseData = {
  info: userInfo, 
  prodCode: "LEN100120", 
  appVersion: "1.5", 
  osType: "IOS8"
}

try {
  var license = licenseKey.createLicense(licenseData);
  console.log(license);
} catch(err) {
  console.log(err);
}
```

if success returns

```js
{ errorCode: 0,  message: 'ok',  license: 'W0247-4RXD3-6TW0F-0FD63-64EFD-38180' }
```

if error, returns

```js
{ errorCode: 1002, message: 'product code missing' }
```

## Validate a License Key
On client side your application will pass the user information (Data Structure) and License Key:

```js
var licenseKey = require('license-key-gen');

var userInfo = {
  company: "webisto.tech",
  street: "123 licenseKey ave", 
  city: "city/town", 
  state: "State/Province", 
  zip: "postal/zip"
}
var licenseData = {
  info: userInfo, 
  prodCode: "LEN100120", 
  appVersion: "1.5", 
  osType: "IOS8"
}

try {
    var license = licenseKey.validateLicense(licenseData, "W0247-4RXD3-6TW0F-0FD63-64EFD-38180");
    console.log(license);
} catch(err) {
    console.log(err);
}
```

if success returns

```js
{ errorCode: 0, message: 'ok' }
```

if error, returns

```js
{ errorCode: 1006, message: 'license not valid' }
```

## TODO
- maintain (save, delete, update, read) licenses and user registration information

## Support
Tested in Chrome 53-54, Firefox 48-49, IE 11, Edge 14, Safari 9-10, Node.js 6-7, & PhantomJS 2.1.1.<br>
Automated test runs are available.
