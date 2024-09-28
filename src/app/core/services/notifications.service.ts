import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private messages: string[] = [];
  private messages$ = new BehaviorSubject<string[]>(this.messages);

  constructor() {}

  // Méthode pour ajouter un message d'erreur
  showError(message: string): void {
    this.addMessage(`Erreur: ${message}`);
  }

  // Ajoute un message
  private addMessage(message: string): void {
    this.messages.push(message);
    this.messages$.next([...this.messages]);
  }

  // Observable pour s'abonner aux messages
  getMessages(): Observable<string[]> {
    return this.messages$.asObservable();
  }

    // Méthode pour retirer un message
    removeMessage(index: number): void {
      this.messages.splice(index, 1);
      this.messages$.next([...this.messages]);
    }
  
}

