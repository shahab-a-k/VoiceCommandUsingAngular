import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  recognition: any;
  isListening: boolean = false;
  private transcriptSubject = new BehaviorSubject<string>(''); // Observable for transcript
  transcript$ = this.transcriptSubject.asObservable(); // Public observable
  private finalTranscript = '';

  constructor(private zone: NgZone) {
    const { webkitSpeechRecognition }: any = window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en'; // Set to your language

    this.recognition.onresult = (event: any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          this.finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      this.zone.run(() => {
        this.transcriptSubject.next(interimTranscript || this.finalTranscript);
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error(event.error);
    };
  }

  startListening() {
    this.finalTranscript = ''; // Reset for a new session
    this.isListening = true;
    this.recognition.start();
  }

  stopListening() {
    this.isListening = false;
    this.recognition.stop();
  }

  resetTranscript() {
    this.finalTranscript = '';
    this.transcriptSubject.next(''); // Clear the observable transcript
  }
}
