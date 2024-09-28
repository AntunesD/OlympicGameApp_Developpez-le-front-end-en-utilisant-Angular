import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CountryData } from '../models/Olympic';
import { NotificationService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})

export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<CountryData[] | null>(null);
  private loading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  // Charge les données initiales des Jeux Olympiques
  loadInitialData(): Observable<CountryData[] | null> {
    this.loading$.next(true); // Démarre le chargement

    return this.http.get<CountryData[]>(this.olympicUrl).pipe(
      tap(value => {
        this.olympics$.next(value); // Met à jour le BehaviorSubject avec les données récupérées
        this.loading$.next(false); // Fin du chargement avec succès
      }),
      catchError(error => {
        console.error(error); // Log de l'erreur
        this.olympics$.next(null); // Met à jour avec null en cas d'erreur
        this.loading$.next(false); // Fin du chargement en cas d'erreur
        this.notificationService.showError('Une erreur s\'est produite lors du chargement des données olympiques.');

        return of(null); // Retourne null en cas d'erreur
      })
    );
  }

  // Renvoie l'observable des données olympiques
  getOlympics(): Observable<CountryData[] | null> {
    return this.olympics$.asObservable();
  }

  // Renvoie l'observable de l'état de chargement
  getLoadingState(): Observable<boolean> {
    return this.loading$.asObservable();
  }
}
