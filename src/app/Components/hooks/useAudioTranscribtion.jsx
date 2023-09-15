import { useEffect, useState } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

export function useAudioTranscription() {
  const [transcription, setTranscription] = useState(null);
  const [error, setError] = useState(null);
  const key = process.env.NEXT_PUBLIC_KEY;
  const region = process.env.NEXT_PUBLIC_REGION;

  const transcribe = (audioData, fromLanguage) => {
    return new Promise((resolve, reject) => {
      try {
        const audioStream = sdk.AudioInputStream.createPushStream();
        audioStream.write(audioData);
        const audioConfig = sdk.AudioConfig.fromStreamInput(audioStream);
        const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
        speechConfig.speechRecognitionLanguage = fromLanguage;

        const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

        recognizer.recognizeOnceAsync((result) => {
          if (result.reason === sdk.ResultReason.RecognizedSpeech) {
            resolve(result.text);
          } else if (result.reason === sdk.ResultReason.NoMatch) {
            resolve("No speech could be recognized.");
          } else if (result.reason === sdk.ResultReason.Canceled) {
            const cancellation = sdk.CancellationReason[result.reason];
            if (cancellation === "Error") {
              reject(
                `Speech Recognition canceled: ${result.cancellationDetails.reason}`
              );
            } else {
              reject(`Speech Recognition canceled: ${cancellation}`);
            }
          }
          recognizer.close();
        });
      } catch (error) {
        reject(`Error transcribing audio: ${error}`);
      }
    });
  };

  return { transcription, error, transcribe };
}
