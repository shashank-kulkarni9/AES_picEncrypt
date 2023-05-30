import React, { useState } from 'react';
import './style.css';
import * as CryptoJS from 'crypto-js';
import { saveAs } from 'file-saver';

function App() {
  const [key, setKey] = useState('');
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleKeyChange = (e) => {
    setKey(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEncrypt = (e) => {
    e.preventDefault();
    if (key && file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const fileData = e.target.result.split(',')[1];
        const encryptedData = encrypt(key, fileData);
        const encryptedFile = createFileFromData(encryptedData, file.name + '.enc');
        displayResult(encryptedFile);
      };
      reader.readAsDataURL(file);
    } else {
      displayError('Error: Please provide a key and select a file.');
    }
  };

  const handleDecrypt = () => {
    if (key && file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const fileData = e.target.result.split(',')[1];
        try {
          const decryptedData = decrypt(key, fileData);
          const decryptedFile = createFileFromData(decryptedData, file.name.replace('.enc', ''));
          displayResult(decryptedFile);
        } catch (error) {
          displayError('Error: Invalid ciphertext');
        }
      };
      reader.readAsDataURL(file);
    } else {
      displayError('Error: Please provide a key and select a file.');
    }
  };

  const encrypt = (key, data) => {
    const keyBytes = CryptoJS.enc.Utf8.parse(key);
    const encrypted = CryptoJS.AES.encrypt(data, keyBytes, { mode: CryptoJS.mode.ECB }).toString();
    return encrypted;
  };

  const decrypt = (key, ciphertext) => {
    const keyBytes = CryptoJS.enc.Utf8.parse(key);
    const decrypted = CryptoJS.AES.decrypt(ciphertext, keyBytes, { mode: CryptoJS.mode.ECB });
    return decrypted.toString(CryptoJS.enc.Utf8);
  };

  const createFileFromData = (data, filename) => {
    const byteCharacters = atob(data);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }

    const byteArray = new Uint8Array(byteArrays);
    return new File([byteArray], filename);
  };

  const displayResult = (file) => {
    setResult(`Result: ${file.name}`);
    setError('');

    // Trigger file download
    saveAs(file);
  };

  const displayError = (errorMsg) => {
    setResult('');
    setError(errorMsg);
  };

  return (
    <div className="container">
      <h1>AES Encryption/Decryption</h1>
      <form id="aesForm" encType="multipart/form-data">
        <label htmlFor="key">Key:</label>
        <input type="text" name="key" id="key" value={key} onChange={handleKeyChange} required />
        <label htmlFor="file">Select an image file:</label>
        <input type="file" name="file" id="file" accept="image/*" onChange={handleFileChange} required />
        <div className="action-buttons">
          <input type="submit" value="Encrypt" onClick={handleEncrypt} />
          <input type="button" value="Decrypt" onClick={handleDecrypt} />
        </div>
      </form>
      <div id="resultDiv" className="result">{result}</div>
      <div id="errorDiv" className="error">{error}</div>
    </div>
  );
}

export default App;
