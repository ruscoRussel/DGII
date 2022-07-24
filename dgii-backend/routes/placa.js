/*
    Rutas de Placa Provicional / Placa
    host + /api/placa
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createPlaca, getPlacaList, getPdfPlaca  } = require('../controllers/placa');
const { validarCampos } = require('../middlewares/validar-campos')
const router = Router();

router.post(
    '/new',
    [
        check('codigo', 'El codigo es obligatorio').not().isEmpty(),
        check('placa', 'La placa es obligatorio').not().isEmpty(),
        check('tipovehiculo', 'El tipo vehiculo es obligatorio').not().isEmpty(),
        check('marca', 'La marca es obligatorio').not().isEmpty(),
        check('modelo', 'El modelo es obligatorio').not().isEmpty(),
        check('color', 'El nombre es obligatorio').not().isEmpty(),
        check('ano', 'El color es obligatorio').not().isEmpty(),
        check('chasis', 'El chasis es obligatorio').not().isEmpty(),
        check('fechaEmision', 'La fecha Emision es obligatorio').not().isEmpty(),
        check('fechaExpiracion', 'La fecha Expiracion es obligatorio').not().isEmpty(),
        check('razonSocialImportador', 'El nombre es obligatorio').not().isEmpty(),
        check('rncCedulaImportador', 'Razon Social Importador es obligatorio').not().isEmpty(),
        check('razonSocialComprador', 'Razon Social Comprador es obligatorio').not().isEmpty(),
        check('rncCedulaComprador', 'RNC/Cedula Comprador es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createPlaca
    );
router.get('/list', getPlacaList);

router.get('/pdf', getPdfPlaca)

module.exports = router;