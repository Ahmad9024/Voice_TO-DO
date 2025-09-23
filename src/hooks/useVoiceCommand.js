import {useEffect} from 'react'

export const useVoiceCommand = (onCommandDetected) => {

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;
        
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length -1 ][0].transcript.trim();
            if (transcript.toLowerCase().startsWith("add task")) {
                const task = transcript.slice(9).trim();
                if (task) {
                    onCommandDetected(task);
                }
            }
        };

        recognition.start();
        return () => recognition.stop();
    }, [onCommandDetected]);
}
