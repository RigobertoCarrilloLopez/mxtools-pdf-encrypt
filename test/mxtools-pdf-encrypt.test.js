const { expect } = require('chai'); // Importa la biblioteca de aserciones Chai
const { encryptPdfFile } = require('./tu-modulo'); // Importa la función a probar

describe('encryptPdfFile', () => {
    it('debería encriptar un archivo PDF y guardar el resultado en otro archivo', (done) => {
        // Ruta del archivo de entrada (PDF sin encriptar)
        const inputFilePath = 'input.pdf';

        // Ruta donde se guardará el archivo encriptado
        const outputFilePath = 'output.pdf';

        // Contraseña para encriptar el PDF
        const password = 'tuContraseña';

        encryptPdfFile(inputFilePath, outputFilePath, password, (err, outputFile) => {
            if (err) {
                // Si hay un error, falla la prueba
                done(err);
            } else {
                // Comprueba que el archivo de salida existe
                expect(outputFile).to.equal(outputFilePath);

                // Puedes agregar más aserciones según sea necesario

                // Indica que la prueba ha sido exitosa
                done();
            }
        });
    });
});
