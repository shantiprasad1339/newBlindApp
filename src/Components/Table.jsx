import React, { useState, useEffect, useCallback } from "react";
import "./Table.css";
import { useSpeechSynthesis } from "react-speech-kit";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

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
      if (event.key === "f") {
        handleSpeak(); // Trigger female voice speech
      }
      if (event.key === "m") {
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
      <div>
       
        <Popup
          trigger={<h4 className="text-light helpBtn">?</h4>}
          position="top center"
        >
          <div className="popupDiv">
            <ul>
              <li>Press F for femal</li>
              <li>Press M for male</li>
              <li>Press B for break</li>
            </ul>
          </div>
        </Popup>
       
       
      </div>
    </>
  );
}

export default TableComponent;
