# AES_picEncrypt (AES Encryption/Decryption App)

A simple React application for performing AES encryption and decryption on image files.

> Deployement : https://shashank-kulkarni9.github.io/AES_picEncrypt/

## Overview

The AES Encryption/Decryption App allows users to encrypt and decrypt image files using the AES (Advanced Encryption Standard) algorithm. It provides a simple interface where users can select an image file, enter a key for encryption/decryption, and perform the desired operation. The encryption process uses the AES algorithm in Electronic Codebook (ECB) mode, while decryption reverses the encryption process to recover the original image file.

## Features

- Encryption of image files using AES algorithm
- Decryption of encrypted image files
- User-friendly interface for selecting files and entering encryption/decryption key
- File download for the encrypted/decrypted image files

## Technologies Used

- React: A JavaScript library for building user interfaces
- CryptoJS: A JavaScript library for cryptographic operations
- file-saver: A library for saving files in the browser

## Getting Started

To run the AES Encryption/Decryption App locally, follow these steps:

1. Clone the repository:
```bash
   git clone https://github.com/shashank-kulkarni9/AES_picEncrypt.git
```
2. Install the dependencies:
```bash
   cd <your-repository>
   npm install
```
3. Start the development server:
 ```bash
   npm start
 ```
4. Open your web browser and visit http://localhost:3000 to access the application.

# Usage

- Enter an encryption key and select an image file to encrypt or decrypt.
- Click the "Encrypt" button to encrypt the selected image file or the "Decrypt" button to decrypt an encrypted image file.
- The result and any error messages will be displayed below the buttons.
- The encrypted/decrypted image file will be automatically downloaded to your device.
