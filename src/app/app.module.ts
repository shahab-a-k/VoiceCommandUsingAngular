import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { VoiceRecognitionComponent } from './components/voice-recognition/voice-recognition.component';
import { SpeechRecognitionService } from './services/speech-recognition.service';
import { AppRoutingModule } from './app-routing.module'; // Import the routing module

@NgModule({
  declarations: [
    AppComponent,
    VoiceRecognitionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule // Add the routing module here
  ],
  providers: [SpeechRecognitionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
