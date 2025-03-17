const jwt = require('jsonwebtoken');
const Adm = require('../models/administrador.js');
require('dotenv').config();

const secret = process.env.JWT_SECRET; 

const registrar = async (req, res) => {
    const { nome, email, senha } = req.body;
    const adm = new Adm({ nome, email, senha });

    try {
        await adm.save();
        res.status(200).json(adm);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar administrador' });
    }
};

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        //verifica se o email existe
        let adm = await Adm.findOne({ email });
        if (!adm) return res.status(401).json({ error: 'Email incorreto, tente novamente' });
        //verifica se a senha corresponde
        adm.isCorrectPassword(senha, (err, same) => {
            if (!same) return res.status(401).json({ error: 'Senha incorreta, tente novamente' });

            //Aqui ocorre a geração do token JWT
            const token = jwt.sign({ email }, secret, { expiresIn: '30d' });
            res.json({ adm, token });
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
};


module.exports = { registrar, login };