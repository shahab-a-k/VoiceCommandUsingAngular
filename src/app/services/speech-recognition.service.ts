import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  recognition: any;
  isListening: boolean = false;
  transcript: string = '';
  finaltranscript: string = '';

  constructor(private zone: NgZone) {
    const { webkitSpeechRecognition }: any = window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en'; // Arabic language code

    this.recognition.onresult = (event: any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          this.transcript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      this.zone.run(() => {
        this.transcript = interimTranscript
      });
      this.finaltranscript = this.transcript
    };



    this.recognition.onerror = (event: any) => {
      console.error(event.error);
    };
  }

  startListening() {
    this.isListening = true;
    this.recognition.start();
  }

  stopListening() {
    this.isListening = false;
    this.recognition.stop();
  }

  getTranscript() {
    return this.finaltranscript;
  }

  resetTranscript() {
    this.transcript = '';
  }
}
