import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { EventType } from 'src/app/types/event-type';
import { InitialData } from 'src/app/types/initial-data';
import { Message } from 'src/app/types/message';
import { User } from 'src/app/types/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messages$ = new BehaviorSubject<Message[]>([]);
  private users$ = new BehaviorSubject<string[]>([]);
  private typing$ = new BehaviorSubject<string[]>([]);

  private messages: Message[] = [];
  private users: string[] = [];
  private typing: string[] = [];

  constructor(private socket: Socket) {
    this.initialize();
  }

  private initialize(): void {
    this.socket.on(EventType.JoinedSuccessfully, (data: InitialData) => {
      this.setMessages(data.messages);
      this.setUsers(data.users);
    });
    this.socket.on(EventType.UserJoined, (user: User) => this.addUser(user.username));
    this.socket.on(EventType.UserLeft, (user: User) => this.removeUser(user.username));
    this.socket.on(EventType.NewMessage, (message: Message) => this.addMessage(message));
    this.socket.on(EventType.Typing, (user: User) => this.addTyping(user.username));
    this.socket.on(EventType.StopTyping, (user: User) => this.removeTyping(user.username));
  }

  // Manage messages list
  private setMessages(messages: Message[]): void {
    this.messages = messages;
    this.messages$.next(this.messages);
  }
  private addMessage(message: Message): void {
    this.messages = [...this.messages, message];
    this.messages$.next(this.messages);
  }

  // Manage users list
  private setUsers(users: string[]): void {
    this.users = users;
    this.users$.next(this.users);
  }
  private addUser(user: string): void {
    this.users = [...this.users, user];
    this.users$.next(this.users);
  }
  private removeUser(user: string): void {
    const index = this.users.indexOf(user);
    if (index >= 0) {
      this.users = [...this.users].splice(index, 1);
    }
    this.users$.next(this.users);
  }

  // Manage typing users list
  private addTyping(user: string): void {
    this.typing = [...this.typing, user];
    this.typing$.next(this.typing);
  }
  private removeTyping(user: string): void {
    const index = this.typing.indexOf(user);
    if (index >= 0) {
      this.typing = [...this.typing].splice(index, 1);
    }
    this.typing$.next(this.typing);
  }

  register(username: string): Observable<boolean> {
    this.socket.emit(EventType.Join, username);
    return this.socket.fromEvent(EventType.JoinedSuccessfully).pipe(take(1), map(() => true));
  }

  sendMessage(message: string): void {
    this.socket.emit(EventType.PublishMessage, message);
  }

  getMessages(): Observable<Message[]> {
    return this.messages$.asObservable();
  }

  getUsers(): Observable<string[]> {
    return this.users$.asObservable();
  }

  getTypingUsers(): Observable<string[]> {
    return this.typing$.asObservable();
  }
}
