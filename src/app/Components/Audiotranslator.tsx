import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import Microphone from './icons/microphone';
import AudioPlayer from './Gona';
import {useAudioTranscription} from  './hooks/useAudioTranscribtion'
import { Languages } from './utilities/Arrays';
import  {convertWebmToWav} from  './utilities/Functions'



const Audiotranslator = () => {
  // edge of file
  // *************************************
  // declearing the state
  const [recordedBlobs, setRecordedBlobs] = useState<{ blob: Blob; timestamp: number }[]>([]);
  const [recording, setRecording] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [translatedAudio, setTranslatedAudio] = useState(null);
  const [fromLanguage, setFromLanguage] = useState('en');
  const [toLanguage, setToLanguage] = useState('es');
  const [azureFromLanguage, setAzureFromLanguage] = useState('en-US');
  const [azureToLanguage, setAzureToLanguage] = useState('es-ES');
  const languages:any = Languages;
  const [convertedAudio, setConvertedAudio] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const chunks:any = [];
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // State to track if audio is playing
  const { transcription, error, transcribe } = useAudioTranscription();
  



  // *************************************
  //use effect to get the isRecording state
  useEffect(()=>{
    console.log (isRecording);

  } , [isRecording]);
  // *************************************
  // ************************************
  //the ytiklity functions
  // ************************************
  const handleFromLanguageChange = (event:any) => {
    setFromLanguage(event.target.value);
    const azureToLanguage:any = languages.find(
      (language:any) => language.code === event.target.value
    )?.azureCode;
    setAzureFromLanguage(azureToLanguage);
    
  }
  const handleToLanguageChange = (event:any) => {
    setToLanguage(event.target.value);
    const azureToLanguage:any = languages.find(
      (language:any) => language.code === event.target.value
    )?.azureCode;
    setAzureToLanguage(azureToLanguage);
  }
  // the functions

  //************************* */
  //start the recording function
// Start audio capture
// Function to start audio capture
async function startAudioCapture() {
 

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onstop = async () => {
      console.log('recorder.onstop() called');
      const webmBlob = new Blob(chunks, { type: 'audio/webm' });

      try {
        const wavBlob = await convertWebmToWav(webmBlob);
        setConvertedAudio(wavBlob); // Save the converted audio
        console.log('wavBlob converted', wavBlob);
        chunks.length = 0; // Clear chunks array
        playMostRecentRecording(); // Play the most recent recording
      } catch (conversionError) {
        console.error('Error converting WebM to WAV:', conversionError);
      }
    };

    recorder.start();
    console.log('recorder.state', recorder.state);
    setIsRecording(true);
    setRecording(true);
    mediaRecorderRef.current = recorder;
  } catch (error) {
    console.error('Error starting audio capture:', error);
  }
}
  
    //************************* */
  
  //************************* */
// Stop audio capture
const stopAudioCapture = async () => {
  setIsRecording(false);
  if (mediaRecorderRef.current && recording) {
    mediaRecorderRef.current.stop();
    setRecording(false);
    const stream = mediaRecorderRef.current.stream;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    const webmBlob = new Blob(chunks, { type: 'audio/webm' });
    try {
      if (webmBlob) {
        console.log('webmBlob', webmBlob);
      }
      const wavBlob = await convertWebmToWav(webmBlob);
      setConvertedAudio(wavBlob);
      chunks.length = 0; // Clear chunks array
      playMostRecentRecording();

    } catch (conversionError) {
      console.error('Error converting WebM to WAV:', conversionError);
    }
  }
};

  //************************* */
  // ************************* */
  // play the recording function
// Play most recent recording
const playMostRecentRecording = () => {
  if (convertedAudio) {
    const objectUrl = URL.createObjectURL(convertedAudio);
    const audioElement = new Audio(objectUrl); // Create an audio element
    audioElement.play();

    audioElement.addEventListener('play', () => {
      setIsAudioPlaying(true);
    });

    // Set isAudioPlaying to false when audio finishes playing
    audioElement.addEventListener('ended', () => {
      setIsAudioPlaying(false);
    });

  }
  
}
  // ************************* */
  // audio translation function
  const translateAudio = async (): Promise<void> => {
    if (isTranslating) {
      // If translation is already in progress, do nothing
      return;
    }
  
    setIsTranslating(true);
    try {
      if (convertedAudio) {
        transcribe(convertedAudio, azureFromLanguage)
          .then(transcription => {
        console.log(transcription);
        
    })
    .catch(error => console.log(error));
      
      }

    } catch (error) {
      console.log(error);
    } finally {
      setIsTranslating(false); // Reset the translation state after processing
    }
  };
 

  // *************************************
  return (
    <div className="container mx-auto px-4 py-8">
    <div className="max-w-md mx-auto bg-gray-200 p-4 rounded-lg shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4 font-poppins">Audio Translation</h2>
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
        <div className ={isRecording? 'flex flex-col justify-center items-center hover:cursor-pointer text-red-500': "flex justify-center items-center hover:cursor-pointer flex-col"} >
          <Microphone />
          <div className="mb-4">
          {isRecording ? (
            <p className="text-red-500 animate-pulse">Recording...</p>
          ) : isTranslating ? (
            <p className="text-blue-500 animate-pulse">Translating...</p>
          ) : isTranslated ? (
            <p className="text-green-500">Translated</p>
          ) : null}
        </div>
          {recordedBlobs && (
          <div className="mt-4 flex justify-center text-center flex-col">
            <p className="text-lg font-semibold mb-2">Recorded Audio:</p>
            <AudioPlayer audioRef={audioRef} />
            <button
           className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md my-4"
           onClick={playMostRecentRecording}
           disabled={isAudioPlaying}
            >
                {isAudioPlaying ? 'Playing...' : 'Play Most Recent Recording'}
            </button>
          </div>
          
        )}
        </div>
       
        <div className="flex justify-center mb-4">
          {isRecording ? (
            <button
           className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-4"
           onClick={stopAudioCapture}
            >
              Stop Recording
            </button>
          ) : (
            <button
        
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-4"
              onClick={startAudioCapture}
            >
              Record
            </button>
          )}
          <button

          className={`bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md ${
            isTranslating || isTranslated ? 'pointer-events-none' : ''
          }`}
          onClick={translateAudio}
          >
            Translate
          </button>
        </div>
      </div>
      {isTranslated && (
        <>
          <div className="mt-4">
            <p className="text-lg font-semibold mb-2">Translated Text:</p>
            <p className="text-gray-800">{translatedText}</p>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold mb-2">Translated Audio:</p>
            <button
             
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Play Translated Audio
            </button>
          </div>
        </>
      )}
    </div>
  </div>
    
  )
}

export default Audiotranslator