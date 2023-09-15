import { useState, useEffect } from 'react';
import axios from 'axios';

const useTranslateAndConvert = (textToTranslate: string) => {
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [translatedSpeech, setTranslatedSpeech] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const translateAndConvert = async () => {
      try {
        // Translate text using Azure Translation API
        const translationApiUrl = process.env.NEXT_PUBLIC_AZURE_TRANSLATION_API_URL;
        const translationResponse = await axios.post(translationApiUrl, {
          text: textToTranslate,
          targetLanguage: 'your-target-language-code', // Replace with actual target language code
        });

        const translatedTextResult = translationResponse.data.translatedText;
        setTranslatedText(translatedTextResult);

        // Convert translated text to speech using Azure Text-to-Speech API
        const textToSpeechApiUrl = process.env.NEXT_PUBLIC_AZURE_TEXT_TO_SPEECH_API_URL;
        const textToSpeechResponse = await axios.post(textToSpeechApiUrl, {
          text: translatedTextResult,
          voice: 'your-voice-selection', // Replace with voice selection
        });

        const translatedSpeechAudioUrl = textToSpeechResponse.data.audioUrl;
        setTranslatedSpeech(translatedSpeechAudioUrl);
      } catch (error) {
        setError(error.message);
      }
    };

    if (textToTranslate) {
      translateAndConvert();
    }
  }, [textToTranslate]);

  return { translatedText, translatedSpeech, error };
};

export default useTranslateAndConvert;
