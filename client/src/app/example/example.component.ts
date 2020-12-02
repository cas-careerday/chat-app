import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/chat-service/chat.service';
import { Message } from 'src/app/types/message';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {

  messages$: Observable<Message[]>;
  users$: Observable<string[]>;
  typingUsers$: Observable<string[]>;

  registered = false;
  username = '';
  message = '';

  constructor(private chatService: ChatService) {
    this.messages$ = chatService.getMessages();
    this.users$ = chatService.getUsers();
    this.typingUsers$ = chatService.getTypingUsers();
  }

  register(): void {
    this.chatService.register(this.username).subscribe(registered => this.registered = registered);
  }

  sendMessage(): void {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
}
