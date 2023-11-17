const fs = require('fs');
const { exec } = require('child_process');
const { Readable } = require('stream');

// Función para convertir un archivo a Base64
function fileToBase64(filePath, callback) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(`Error al leer el archivo: ${err.message}`);
            return callback(err, null);
        }

        const base64Data = data.toString('base64');
        callback(null, base64Data);
    });
}

// Función para convertir Base64 a un archivo
function fileFromBase64(base64Data, filePath, callback) {
    const binaryData = Buffer.from(base64Data, 'base64');
    fs.writeFile(filePath, binaryData, (err) => {
        if (err) {
            console.error(`Error al escribir el archivo: ${err.message}`);
            return callback(err, null);
        }

        callback(null, filePath);
    });
}

function encryptPdfBase64(inputBase64, password, callback) {
    const childProcess = exec(`./mxtools-pdf-encrypt-base64 ${password}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return callback(error, null);
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return callback(stderr, null);
        }
        callback(null, Buffer.from(stdout).toString('base64'));
    });

    const readable = Readable.from(inputBase64);
    readable.pipe(childProcess.stdin);
}


// Función para encriptar un archivo PDF
function encryptPdfFile(inputFilePath, outputFilePath, password, callback) {
    fileToBase64(inputFilePath, (err, base64Data) => {
        if (err) {
            console.error(`Error al convertir archivo a Base64: ${err.message}`);
            return callback(err, null);
        }

        encryptPdfBase64(base64Data, password, (err, encryptedBase64) => {
            if (err) {
                console.error(`Error al encriptar el PDF: ${err.message}`);
                return callback(err, null);
            }

            fileFromBase64(encryptedBase64, outputFilePath, (err, outputFile) => {
                if (err) {
                    console.error(`Error al guardar el archivo encriptado: ${err.message}`);
                    return callback(err, null);
                }

                console.log(`PDF encriptado y guardado en: ${outputFilePath}`);
                callback(null, outputFilePath);
            });
        });
    });
}

module.exports = { encryptPdfBase64, encryptPdfFile };