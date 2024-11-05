import { Component, OnInit } from '@angular/core';
import { SpeechRecognitionService } from '../../services/speech-recognition.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-voice-recognition',
  templateUrl: './voice-recognition.component.html',
  styleUrls: ['./voice-recognition.component.css']
})
export class VoiceRecognitionComponent implements OnInit {
  isListening: boolean = false;
  transcript: string = '';
  apiUrl = 'https://your-api-url/api/voicecommand/process'; // Replace with your API URL

  constructor(private speechService: SpeechRecognitionService, private http: HttpClient) {}

  ngOnInit() {
    // Subscribe to transcript updates
    this.speechService.transcript$.subscribe((text: string) => {
      this.transcript = text;
    });
  }

  toggleListening() {
    this.isListening = !this.isListening;
    if (this.isListening) {
      this.speechService.startListening();
    } else {
      this.speechService.stopListening();
    }
  }

  processCommand() {
    this.http.post(this.apiUrl, { text: this.transcript }).subscribe((response: any) => {
      console.log('API response:', response);
    });
  }
}
