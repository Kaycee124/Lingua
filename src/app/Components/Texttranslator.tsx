import React from 'react'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';
import { Languages} from './utilities/Arrays';

const Texttranslator = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('en');
  const [toLanguage, setToLanguage] = useState('es');
  const [error, setError] = useState<String|any>(null);
  const [azureFromLanguage, setAzureFromLanguage] = useState('en-US');
  const [azureToLanguage, setAzureToLanguage] = useState('es-ES');
  const subkey:any = process.env.NEXT_PUBLIC_KEY;
  const region:any = process.env.NEXT_PUBLIC_REGION;

  useEffect(() => {
    tokenGettter();
  }, []);


 const languages:any = Languages;

  const handleTextChange = (event:any) => {
    if (event.target.value.length > 2000) {
      setError('Text limit exceeded');
    } else {
      setError(null);
      setText(event.target.value);
    }
  };

  const handleFromLanguageChange = (event:any) => {
    setFromLanguage(event.target.value);
    const azureFromLanguage:any = languages.find(
      (language:any) => language.code === event.target.value
    )?.azureCode;
    setAzureFromLanguage(azureFromLanguage);
  };

  const handleToLanguageChange = (event:any) => {
    setToLanguage(event.target.value);
    const azureToLanguage:any = languages.find(
      (language:any) => language.code === event.target.value
    )?.azureCode;
    setAzureToLanguage(azureToLanguage);
  };

 const handleTranslateClick = async () => {
  
  // Call translation API here
  if (text.length === 0) {
    setError('Please enter some text to translate');
    return;
  }
  // if from and to languages are same
  if (fromLanguage === toLanguage) {
    setError('Please select different languages to translate');
    return;
  }
  //if to language is not set
  if (toLanguage.length === 0) {
    setError('Please select a language to translate');
    return;
  }
  // if no error
  if (!error) {
    console.log(text);
   
    // call translation API
    axios.post('https://libretranslate.de/translate', {
      q: text,
      source: fromLanguage ? fromLanguage : "auto",
      target: toLanguage,
      api_key: ""
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    .then((response) => {
       setTranslatedText(response.data.translatedText);
    })
    .catch((error) => setError(error.message));
  }
 
};

  const handleReadOutLoudClick = () => {
   
    // Call text-to-speech API here
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
      subkey,
      region
      );
      speechConfig.speechSynthesisLanguage = azureToLanguage;
      const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
      const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);
        synthesizer.speakTextAsync(
          translatedText,
          (result) => {
            if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
              console.log("Speech synthesis succeeded.");
              // Play the synthesized audio data
              const audioData = result.audioData;
              const audioContext = new AudioContext();
              const source = audioContext.createBufferSource();
              audioContext.decodeAudioData(audioData, (buffer) => {
                source.buffer = buffer;
                source.connect(audioContext.destination);
                source.start(0);
              });
            } else {
              console.error("Speech synthesis failed.");
            }
            synthesizer.close();
          },
          (error) => {
            console.error(error);
            synthesizer.close();
          }
  
      );
      


    // readOutLoud(translatedText, toLanguage)
    //   .catch((error) => setError(error.message));
  };

  const handleResetClick = () => {
    setText('');
    setTranslatedText('');
    setError(null);
  };
//****************************************** */
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ##########################################3
//getting the azure token and setting to local storage on page load once after then it will be used from local storage
//****************************************** */
//########################
 const tokenGettter = async () => {
  const azureToken = localStorage.getItem('token');
  if (azureToken) {
    console.log("token is already there");
  }else {
    const subkey = process.env.NEXT_PUBLIC_KEY;
    const region = process.env.NEXT_PUBLIC_REGION;
    console.log(subkey, region);
  
  const token = await axios.post(`https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, null, {
    headers: {
      'Ocp-Apim-Subscription-Key': subkey,
    },
  });
  const access_token = token.data;
  //store the token in the local storage
  localStorage.setItem('token', access_token);
  console.log(access_token); 
  }
 }
//

  return (
    <div className="p-4">
      <div className = "flex md:flex-row justify-around">
      <div className="mb-4 font-bold ">
        <label htmlFor="from-language" className="block mb-2">
          Translate from:
        </label>
        <select
          id="from-language"
          value={fromLanguage}
          onChange={handleFromLanguageChange}
          className="border rounded p-2"
        >
          {languages.map((language:any) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4 font-bold">
        <label htmlFor="to-language" className="block mb-2">
          Translate to:
        </label>
        <select
          id="to-language"
          value={toLanguage}
          onChange={handleToLanguageChange}
          className="border rounded p-2"
        >
          {languages.map((language:any) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      </div>
      </div>
      <div className="mb-4">
        <label htmlFor="text" className="block mb-2 font-bold">
          Text to translate:
        </label>
        <textarea
          id="text"
          value={text}
          onChange={handleTextChange}
          className="border rounded w-full p-2"
        />
        <p className="text-right mt-2">{text.length} /2000</p>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="mb-4">
        <button
          onClick={handleTranslateClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Translate
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="translated-text" className="block mb-2">
          Translated text:
        </label>
        <textarea
          id="translated-text"
          value={translatedText}
          readOnly
          className="border rounded w-full p-2 bg-gray-100"
        />
      </div>
      <div className="mb-4">
       <div className = "flex flex-row">
       <button
          onClick={handleReadOutLoudClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Read out loud
        </button>
        <div className="ml-4">
          </div>
        <button
          onClick={tokenGettter}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </button>

       </div>
      </div>
    </div>
  );
};

export default Texttranslator;

