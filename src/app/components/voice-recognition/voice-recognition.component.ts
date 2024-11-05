import { Component } from '@angular/core';
import { SpeechRecognitionService } from '../../services/speech-recognition.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-voice-recognition',
  templateUrl: './voice-recognition.component.html',
  styleUrls: ['./voice-recognition.component.css']
})
export class VoiceRecognitionComponent {
  isListening: boolean = false;
  transcript: string = '';
  apiUrl = ''; // Replace with your actual API URL

  constructor(private speechService: SpeechRecognitionService, private http: HttpClient) { }

  toggleListening() {
    this.isListening = !this.isListening;
    if (this.isListening) {
      this.speechService.startListening();
    } else {
      this.speechService.stopListening();
    }
  }

  ngDoCheck() {
    console.log("ngDoCheck")
    var interimTranscript = this.speechService.getTranscript()
    if (interimTranscript != null && interimTranscript != "")
      this.transcript = interimTranscript;
  }

  processCommand() {
    this.http.post(this.apiUrl, { text: this.transcript }).subscribe((response: any) => {
      console.log('API response:', response);
    });
  }
}
