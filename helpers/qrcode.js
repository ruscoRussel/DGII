const fs = require('fs');
const qrcode = require('qrcode');

const run = async (placaCode) => {

    const urlCv = `http://dgii-gov-do-c-cppp.herokuapp.com/?codigo=${placaCode}`;
    const QR = await qrcode.toDataURL(urlCv, { 
        color: {
            dark:"#010599FF",
            // light:"#FFBF60FF"
          }
    });

    // console.log(QR);
    return QR;

    // fs.writeFileSync(`../img/qrImages/${placaCode}.png`, `${QR}`);
}

module.exports = { run }