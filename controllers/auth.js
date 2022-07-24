const { response } = require('express');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email});
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo',
            });
        }
        usuario = new Usuario(req.body);
    
        await usuario.save();
    
    
        res.status(201).json({
            id: usuario.id,
            name: usuario.name,
            email: usuario.email
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Por favor contactar administrador'
        })
    }

}

const renewToken = async (req, res = response) => {
    
    const { uid, name } = req;
    const token = await generarJWT(uid, name);

    try {
        
        const usuario = await Usuario.findById(uid);

        res.json({
            id: usuario.id,
            name: usuario.name,
            email: usuario.email,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor contacte al administrador'
        });
    }
}

const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email, password });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ó contraseña es incorrecto.'
            });
        }

        // Generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);
        
        res.json({
            id: usuario.id,
            name: usuario.name,
            email: usuario.email,
            token

        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor contacte al administrador'
        });
    }
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}