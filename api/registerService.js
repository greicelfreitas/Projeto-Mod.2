const _ = require('lodash')
const Register = require('./register')
const fullNameRegex = /^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/;
//const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
const mailRegex = /\S+@\S+\.\S+/;


Register.methods(['get', 'post', 'put', 'delete'])
Register.updateOptions({ new: true, runValidators: true})

Register.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)
Register.before('post', register).before('put', register)

function sendErrorsOrNext(req, res, next){
    const bundle = res.locals.bundle

    if (bundle.errors){
        var errors = parseErrors(bundle.errors)
        res.status(500).json({ errors })
    } else {
        next()
    }
    }

    function parseErrors(nodeRestfulErrors){
        const errors = []
        _.inRange(nodeRestfulErrors, error => errors.push(error.message))
        return errors
    }

    const sendErrorsFromDB = (res, dbErrors) => {
        const errors = []
        _.forIn(dbErrors.errors, error => errors.push(error.message))
        return res.status(400).json({ errors })
    }

function register(req, res, next){
    const fullName = req.body.fullName || ''
    const cpf = req.body.cpf ||''
    const mail = req.body.mail ||''
    const phone = req.body.phone ||''
    const address = req.body.address ||''
    const city = req.body.city ||''
    const complement = req.body.complement ||''

    if(fullName == null || fullName == ""){
        return res.status(400).send({ alert: ["O campo Nome Completo é obrigatório"] })
        }
    if(!fullName.match(fullNameRegex)){
        return res.status(400).send({ alert: ["Informe Nome e Sobrenome"] })
    }

    if(cpf == null || cpf == ""){
       return res.status(400).send({ alert: ["O campo CPF é obrigatório."] })
        }
   // if(!cpf.match(cpfRegex)){
       //return res.status(400).send({ alert: ["Informe um número de CPF válido."] })
       //}


    if(mail == null || mail == ""){
        return res.status(400).send({ alert: ["O campo E-mail é obrigatório"] })
        }
        
    if(!mail.match(mailRegex)){
        return res.status(400).send({ alert: [" Informe e-mail."] })
    }

    if(address == null || address == ""){
        return res.status(400).send({ alert: ["O campo address é obrigatório"] })
        }

     const newBody = new Register({
        fullName,
        cpf,
        mail,
        phone,
        address,
        city,
        complement
    })

    newBody.save(err =>{
        if(err){
            return sendErrorsFromDB(res.err)
        } else {
            res.status(201).json(newBody)
        }

    })
}

module.exports = Register