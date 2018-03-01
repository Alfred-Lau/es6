module.exports = {
  'parser': 'babel-eslint',
  'parserOptions': {
    'sourceType': 'module',
    'allowImportExportEverywhere': false,
    'codeFrame': false
  },
  'env': {
    'browser': true, // 代码执行环境： 浏览器 可以使用window的环境变量
    'es6': true,
    'node': true // 可以使用node的一些环境变量
  },
  'rules': {
    'semi': ['error', 'always'],
    'indent': ['error', 4]
  }
}
