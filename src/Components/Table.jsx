import React, { useState, useEffect, useCallback } from "react";
import "./Table.css";
import { useSpeechSynthesis } from "react-speech-kit";

function TableComponent({ excelData }) {
  const [speechText, setSpeechText] = useState("");
  const [speechRate, setSpeechRate] = useState(0.6);
  const { speak, cancel } = useSpeechSynthesis();
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const availableVoices = window.speechSynthesis.getVoices();
    setVoices(availableVoices);
    const jsonString = JSON.stringify(excelData);
    const cleaned = jsonString.replace(/[^a-zA-Z0-9\s]/g, "");
    setSpeechText(cleaned);
  }, [excelData]);

  const handleSpeak = () => {
    if (speechText) {
      const utterance = new SpeechSynthesisUtterance(speechText);
      if (voices.length > 0) {
        utterance.voice = voices[3];
        utterance.rate = speechRate;
      }
      speak(utterance);
    }
  };

  const handleSpeakMale = () => {
    if (speechText) {
      const utterance = new SpeechSynthesisUtterance(speechText);
      if (voices.length > 0) {
        utterance.voice = voices[2];
        utterance.rate = speechRate;
        // utterance.lang = "en-GB";
      }
      speak(utterance);
    }
  };

  const handleStop = () => {
    cancel();
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if ( event.key === "f") {
        handleSpeak(); // Trigger female voice speech
      }
      if ( event.key === "m") {
        handleSpeakMale(); // Trigger female voice speech
      }
      if (event.key === "b") {
        handleStop(); // Trigger voice stop
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleSpeak, handleStop]);  
  return (
    <>
      {/* <div>
        <button onClick={handleSpeak} className="speakButton">
          Female
        </button>
        <button onClick={handleSpeakMale} className="speakButton2">
          Male
        </button>
        <button onClick={handleStop} className="StopButton">
          Stop
        </button>
      </div> */}
    </>
  );
}

export default TableComponent;
