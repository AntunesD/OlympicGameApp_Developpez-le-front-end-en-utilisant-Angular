import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})


export class NotificationComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  private messagesSubscription: Subscription | null = null; // Ajout de la propriété pour gérer l'abonnement

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // S'abonner au flux de messages de notification
    this.messagesSubscription = this.notificationService.getMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }

  // Méthode pour fermer une notification
  removeMessage(index: number): void {
    this.notificationService.removeMessage(index);
  }

  ngOnDestroy(): void {
    // Se désabonner pour éviter les fuites de mémoire
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }
}
