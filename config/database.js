const { lazyrouter } = require('express/lib/application')
const mongoose = require('mongoose')
const args = require('args-parser')(process.argv)
mongoose.Promise = require('Bluebird')

if (args.production)
    module.exports = mongoose.connect('mongodb://nome_banco:senha_banco@servidor.com.br:270117/usuario_bannco')
else
    module.exports = mongoose.connect('mongodb://localhost/banco_dadosT6')

mongoose.Error.messages.general.require = "O campo 'PATH' é obrigatório."
mongoose.Error.messages.Number.min = "O campo '{PATH}' informado é menor que o limite minimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O campo '{PATH}' informado é maior que o limite máximo de '{MAX}'."
mongoose.Error.messages.String = "O '{VALUE}' não é válido para o campo 'PATH'."