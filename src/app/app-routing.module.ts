import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoiceRecognitionComponent } from './components/voice-recognition/voice-recognition.component';

const routes: Routes = [
  { path: '', redirectTo: '/voice-recognition', pathMatch: 'full' }, // Redirects to voice recognition on load
  { path: 'voice-recognition', component: VoiceRecognitionComponent },
  // Add other routes here if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
