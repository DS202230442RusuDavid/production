import { Observable } from "rxjs";

export interface ChatService {
  chatEnd(user: User): Empty;
  sendMessage(chatMessage: ChatMessage): Empty;
  subscribeToMessages(joinRequest: JoinRequest): Observable<ChatMessage>;
}

export interface ChatMessage {
  user : User;
  msg: string;
  time: string;
}

export interface User {
  id: string;
  role: string;
  room: number;
}

export interface JoinRequest {
  id: string;
  role: string;
}

export interface Empty {}
