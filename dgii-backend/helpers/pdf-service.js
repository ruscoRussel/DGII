const PDFDocument = require('pdfkit');
const { run } = require('./qrcode');



const buildPDF = async (dataCallback, endCallback, data) => {

    const {
        codigo,
        placa,
        tipovehiculo,
        marca,
        modelo,
        color,
        ano,
        chasis,
        fechaEmision,
        fechaExpiracion,
        razonSocialImportador,
        rncCedulaImportador,
        razonSocialComprador,
        rncCedulaComprador

    }
        = data;

    const qrcode = await run(codigo);

    // Create a document
    const doc = new PDFDocument({
        layout: 'landscape'
    });
    doc.on('data', dataCallback);
    doc.on('end', endCallback);
    //Cuadro principal listo
    doc.rect(36, 30, 722, 512).fillAndStroke('#fff', '#000');
    // Scale proprotionally to the specified width
    doc.image('./img/dgii-logo.png', 68, 50, { width: 136 });
    doc.fontSize(22);
    doc.font('Times-Bold').fillColor('black')
        .text('PLACA PROVISIONAL ELECTRÓNICA', 210, 48);
    doc.fontSize(14);
    doc.font('Helvetica-Bold').fillColor('black')
        .text('República Dominicana', 310, 82);
    //Placa
    doc.fontSize(100);
    doc.text(`${placa}`, 65, 110);
    // Codigo QR
    doc.image(`${qrcode}`, 604, 64, { width: 130 }).fillColor('blue');
    //Datos del vehiculo
    doc.rect(72, 200, 420, 92).fillAndStroke('#fff', '#000');
    //TITULO
    doc.fontSize(12);
    doc.fillColor('black')
        .text('DATOS DEL VEHÍCULO', 80, 208);
    // SUB TITULO
    doc.fontSize(9);
    doc.text('MARCA:', 80, 230);
    doc.text('MODELO:', 200, 230);
    doc.text('COLOR:', 380, 230);
    doc.text('AÑO:', 80, 264);
    doc.text('CHASIS:', 200, 264);
    //Llenado con data
    doc.fontSize(10);
    doc.font('Times-Roman').text(`${marca}`, 80, 245);
    doc.text(`${modelo}`, 200, 245);
    doc.text(`${color}`, 380, 245);
    doc.text(`${ano}`, 80, 278);
    doc.text(`${chasis}`, 200, 278);

    // Lineas de datos del vehiculo
    doc.moveTo(76, 258).lineTo(488, 258).stroke();
    doc.moveTo(196, 232).lineTo(196, 258).stroke();
    doc.moveTo(376, 232).lineTo(376, 258).stroke();
    doc.moveTo(196, 266).lineTo(196, 292).stroke();
    //fecha de expiracion 
    doc.fontSize(12);
    doc.font('Times-Bold').fillColor('black')
        .text('FECHA DE EXPIRACIÓN', 572, 208);
    doc.fontSize(36);
    doc.font('Courier-Bold').fillColor('red')
        .text(`${fechaExpiracion}`, 502, 230);
    doc.fontSize(8);
    doc.fillColor('black')
        .text('SOLO ESTA PARTE DEBE IR VISIBLE AL EXTERIOR DEL VEHÍCULO', 564, 265);

    //LINEA DIVISORA INTERMITENTE
    doc.moveTo(72, 305).lineTo(722, 305).dash(5, { space: 5 }).stroke();

    //DATOS DEL IMPORTADOR
    doc.rect(72, 315, 420, 50).undash().fillAndStroke('#fff', '#000');
    doc.fontSize(12);
    doc.font('Helvetica-Bold').fillColor('black')
        .text('DATOS DEL IMPORTADOR', 80, 323);
    doc.fontSize(8);
    doc.text('RNC/CÉDULA', 80, 340);
    doc.text('RAZÓN SOCIAL/NOMBRE', 245, 340);
    doc.fontSize(10);
    doc.font('Times-Roman').text(`${rncCedulaImportador}`, 80, 352);
    doc.text(`${razonSocialImportador}`, 245, 352);
    doc.moveTo(241, 342).lineTo(241, 366).stroke();

    //DATOS DEL VEHICULO 2
    doc.rect(72, 374, 648, 50).fillAndStroke('#fff', '#000');
    doc.fontSize(12);
    doc.font('Helvetica-Bold').fillColor('black')
        .text('DATOS DEL VEHÍCULO', 80, 382);
    doc.fontSize(8);
    doc.text('MARCA', 80, 398);
    doc.text('MODELO', 180, 398);
    doc.text('TIPO DE VEHÍCULO', 280, 398);
    doc.text('AÑO', 410, 398);
    doc.text('CHASIS', 450, 398);
    doc.text('COLOR', 590, 398);
    doc.fontSize(10);
    doc.font('Times-Roman').fillColor('black')
        .text(`${marca}`, 80, 412);
    doc.text(`${modelo}`, 180, 412);
    doc.text(`${tipovehiculo}`, 280, 412);
    doc.text(`${ano}`, 410, 412);
    doc.text(`${chasis}`, 450, 412);
    doc.text(`${color}`, 590, 412);
    doc.moveTo(176, 400).lineTo(176, 425).stroke();
    doc.moveTo(276, 400).lineTo(276, 425).stroke();
    doc.moveTo(406, 400).lineTo(406, 425).stroke();
    doc.moveTo(446, 400).lineTo(446, 425).stroke();
    doc.moveTo(586, 400).lineTo(586, 425).stroke();


    //FECHAS EXPIRACION Y EMISION
    doc.rect(72, 439, 200, 50).fillAndStroke('#fff', '#000');
    doc.fontSize(8);
    doc.font('Helvetica-Bold').fillColor('black')
        .text('FECHA DE EMISIÓN', 80, 463);
    doc.text('FECHA DE EXPIRACIÓN', 172, 463);
    doc.fontSize(10);
    doc.font('Times-Roman').fillColor('black')
        .text(`${fechaEmision}`, 80, 477);
    doc.text(`${fechaExpiracion}`, 172, 477);
    doc.moveTo(168, 464).lineTo(168, 488).stroke();

    //DATOS DEL COMPRADOR
    doc.rect(280, 439, 310, 50).fillAndStroke('#fff', '#000');
    doc.fontSize(12);
    doc.font('Helvetica-Bold').fillColor('black')
        .text('DATOS DEL COMPRADOR', 288, 447);
    doc.fontSize(8);
    doc.text('RNC/CÉDULA', 288, 463);
    doc.text('RAZÓN SOCIAL/NOMBRE', 375, 463);
    doc.fontSize(10);
    doc.font('Times-Roman').fillColor('black')
        .text(`${rncCedulaComprador}`, 288, 477);
    doc.text(`${razonSocialComprador}`, 375, 477);
    doc.moveTo(371, 464).lineTo(371, 488).stroke();
    // Codigo QR
    doc.image(`${qrcode}`, 604, 426, { width: 115 }).fillColor('blue');

    //FIRMA COMPRADOR
    doc.fontSize(12);
    doc.font('Times-Roman').fillColor('black')
        .text('FIRMA COMPRADOR', 72, 514);
    doc.moveTo(202, 523).lineTo(348, 523).stroke();
    //NO.DE RECIBO
    doc.text('NO. DE RECIBO ', 368, 514);
    doc.rect(472, 510, 120, 18).fillAndStroke('#fff', '#000');
    doc.fontSize(12);
    doc.font('Times-Roman').fillColor('black')
        .text(`${placa}`, 476, 516);
    doc.end();
}

module.exports = { buildPDF };