module.exports = {
  'env': {
    'browser': false,
    'node': true,
    'mocha': true,
    'amd': true
  },
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 6
  },
  'extends': 'standard',
  'rules': {
    'new-cap': ['error', {'newIsCap': true}],
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'brace-style': ['error', 'allman'],
    'require-jsdoc': ['error', {
      'require': {
        'FunctionDeclaration': true,
        'MethodDefinition': true,
        'ClassDeclaration': true
      }
    }],
    'valid-jsdoc': ['error', {'requireReturn': false}]
  },
  'plugins': [
    'standard'
  ],
  'globals': {
    'HTMLElement': false
  }
}
