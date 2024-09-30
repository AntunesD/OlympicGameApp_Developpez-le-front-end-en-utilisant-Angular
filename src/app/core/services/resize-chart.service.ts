import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class ResizeChartService {
  private maxWidth = 1024; // Largeur maximale du graphique
  private defaultHeight = 300; // Hauteur par défaut du graphique

  constructor() {}

  // Méthode pour obtenir la taille ajustée du graphique en fonction de la largeur de la fenêtre
  getChartSize(): Observable<[number, number]> {
    return fromEvent(window, 'resize').pipe(
      debounceTime(100), // Ajoute un délai pour éviter les appels trop fréquents
      startWith(this.getCurrentChartSize()), // Émettre la taille actuelle au démarrage
      map(() => this.getCurrentChartSize()) // Mettre à jour la taille du graphique
    );
  }

  // Méthode pour calculer la taille actuelle du graphique
  private getCurrentChartSize(): [number, number] {
    const windowWidth = window.innerWidth;
    const chartWidth = Math.min(windowWidth, this.maxWidth);
    const chartHeight = this.defaultHeight;
    return [chartWidth, chartHeight];
  }
}
