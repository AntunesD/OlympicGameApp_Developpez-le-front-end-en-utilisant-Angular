import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Subscription } from 'rxjs';
import { LineChartData } from 'src/app/core/models/ChartData';
import { ResizeChartService } from 'src/app/core/services/resize-chart.service';


@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})


export class LineChartComponent implements OnInit, OnDestroy {
  @Input() chartData: LineChartData[] = [];  // Les données du graphique
  view: [number, number] = [500, 300];  // La taille par défaut du graphique

  // options pour le graphique
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  showYAxisLabel = false;

  // Initialisation de la propriété avec null
  private resizeSubscription: Subscription | null = null;

  constructor(private resizeChartService: ResizeChartService) {}

  ngOnInit(): void {
    // S'abonner aux changements de taille du graphique
    this.resizeSubscription = this.resizeChartService.getChartSize().subscribe((size: [number, number]) => {
      this.view = size;
    });
  }

  ngOnDestroy(): void {
    // Se désabonner pour éviter les fuites de mémoire
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}
