import React, { useState } from 'react';
import './App.css';

function App() {
  
  //variables declared
  const numChars = '0123456789';
  const symChars = '@%#$!<>^&_|;+-\\:/?';
  const capChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowChars = 'abcdefghijklmnopqrstuvwxyz';

  const [output, setOutput] = useState('');
  const [numChecked, setNumChecked] = useState(true);
  const [symbolChecked, setSymbolChecked] = useState(false);
  const [capChecked, setCapChecked] = useState(true);
  const [lowChecked, setLowChecked] = useState(true);
  const [passLength, setPassLength] = useState(8);
  
  //ensures no negative numbers or letters are entered as the length
  const handlePassLengthChange = (event) => {
    const lengthValue = event.target.value;
    
    if (lengthValue === '' || (lengthValue !== '' && !isNaN(lengthValue))) {
      setPassLength(lengthValue === '' ? '' : parseInt(lengthValue));
    }

  };

  
  const handleCheckboxChange = (event) => {
    const checkboxName = event.target.className;
    const checkboxValue = event.target.checked;

    if (checkboxName === 'capital') {
      setCapChecked(checkboxValue);
    } 
    else if (checkboxName === 'lower') {
      setLowChecked(checkboxValue);
    } 
    else if (checkboxName === 'number') {
      setNumChecked(checkboxValue);
    } 
    else if (checkboxName === 'symbol') {
      setSymbolChecked(checkboxValue);
    }
  };

  //displays correct error message
  const handleCreatePassword = () => {
    const selectedChars = buildFinalString();
    const validPassLength = getValidPassLength();
    
    if (selectedChars === '') {
      handleError("Please select at least one checkbox.");
      return;
    }

    if (validPassLength === null) {
      handleError("Password length must be greater than 0.");
      return;
    }

    const generatedPass = generatePassword(selectedChars, validPassLength);
    setOutput(generatedPass);
  };


  const getValidPassLength = () => {
    if (passLength <= 0 || isNaN(passLength) || passLength < 0) {
      return null;
    }
    return passLength;
  };

  //function creates string using the checkbox that the user selects
  const buildFinalString = () => {
    //empty string which stores password
    let selectedChars = '';
    if (numChecked) {
      selectedChars += numChars;
    }
    if (capChecked) {
      selectedChars += capChars;
    }
    if (lowChecked) {
      selectedChars += lowChars;
    }
    if (symbolChecked) {
      selectedChars += symChars;
    }
    return selectedChars;
  };

  //function mixes up and creates password
  const generatePassword = (selectedChars, length) => {
    let pass = '';
    for (let i = 0; i < length; i++) {
      pass += selectedChars[Math.floor(Math.random() * selectedChars.length)];
    }
    return pass;
  };

  const handleError = (errorMessage) => {
    setOutput("Error: " + errorMessage);
  };

  return (
    
    <div className="container">
      <p className="title">Secure Pass</p>

      <div className="userInp">
        <p>Password-Length</p>
        <input type="text" value={passLength} className="passLength" onChange={handlePassLengthChange} />
      </div>
      <div className="userInp">
        <input type="checkbox" className="capital" checked={capChecked} onChange={handleCheckboxChange} />
        <p>Uppercase letters (A-Z)</p>
      </div>
      <div className="userInp">
        <input type="checkbox" className="lower" checked={lowChecked} onChange={handleCheckboxChange} />
        <p>Lowercase letters (a-z)</p>
      </div>
      <div className="userInp">
        <input type="checkbox" className="number" checked={numChecked} onChange={handleCheckboxChange} />
        <p>Numbers (0-9)</p>
      </div>
      <div className="userInp">
        <input type="checkbox" className="symbol" checked={symbolChecked} onChange={handleCheckboxChange} />
        <p>Symbols ('!@#$%^.etc)</p>
      </div>

      <button className="button" onClick={handleCreatePassword}>Create Password</button>
      <p className="output">{output}</p>
    </div>
  );
}

export default App;