# mxtools-pdf-encrypt

A Node.js package for encrypting PDF files with password protection, supporting both Windows and Linux.

## Installation

Install the package using npm:
npm install mxtools-pdf-encrypt


## Usage

### Encrypt a PDF from a Base64 string

```javascript
const { encryptPdfBase64 } = require('mxtools-pdf-encrypt');

const inputBase64 = 'yourBase64StringHere';
const password = 'yourPasswordHere';

encryptPdfBase64(inputBase64, password, (err, encryptedBase64) => {
    if (err) {
        console.error(`Error: ${err.message}`);
    } else {
        console.log('Encrypted PDF in Base64:', encryptedBase64);
    }
});
const { encryptPdfFile } = require('mxtools-pdf-encrypt');

const inputFilePath = 'path/to/input.pdf';
const outputFilePath = 'path/to/output.pdf';
const password = 'yourPasswordHere';

encryptPdfFile(inputFilePath, outputFilePath, password, (err, outputFilePath) => {
    if (err) {
        console.error(`Error: ${err.message}`);
    } else {
        console.log(`Encrypted PDF saved to: ${outputFilePath}`);
    }
});


License
This package is licensed under the MIT License.


You can customize this README.md as needed for your package. Feel free to add more details, usage examples, or any other information you find relevant.
