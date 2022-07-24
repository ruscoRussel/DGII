const { response } = require('express');
const Placa = require('../models/Placa');
const pdfService = require('../helpers/pdf-service');

const createPlaca = async (req, res = response) => {

    const { codigo } = req.body;

    try {

        let placa = await Placa.findOne({ codigo });
        if (placa) {
            return res.status(400).json({
                ok: false,
                msg: 'Una placa existe con ese codigo',
            });
        }

        placa = new Placa(req.body);

        await placa.save();

        res.status(201).json({
            ok: true,
            codigo
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor contactar administrador'
        });
    }

}

const getPlacaList = async (req, res = response) => {

    const { codigo } = req.query;

    // console.log(codigo)

    try {

        let placa = await Placa.findOne({ codigo });

        if (placa) {
            return res.status(200).json({
                placa
            });
        }
        placa = await Placa.find();
        return res.status(200).json({
            placa
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor contactar administrador'
        });
    }

}

const getPdfPlaca = async (req, res = response) => {

    const {codigo}=req.query;

    try {
        let data = await Placa.findOne({ codigo });

        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment;filename=placaProvicional.pdf'
        });
    
        pdfService.buildPDF(
            (chunk) => stream.write(chunk),
            () => stream.end(),
            data
        );
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor contactar administrador'
        });
    }

   
}

module.exports = {
    createPlaca,
    getPlacaList,
    getPdfPlaca
}