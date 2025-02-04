import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-chat',
  standalone: false,
  
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  userMessage: string = '';
  messages: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  sendMessage() {
    if (this.userMessage.trim() === '') return;

    this.messages.push({ text: this.userMessage, sender: 'user' });
    const userMessage = this.userMessage;
    this.userMessage = '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.openaiApiKey}`
    });

    const payload = {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: userMessage }],
      temperature: 0.7
    };

    this.http.post('https://api.openai.com/v1/chat/completions', payload, { headers })
      .subscribe((response: any) => {
        this.messages.push({ text: response.choices[0].message.content, sender: 'bot' });
      }, (error) => {
        console.error('Error:', error);
      });
  }
}