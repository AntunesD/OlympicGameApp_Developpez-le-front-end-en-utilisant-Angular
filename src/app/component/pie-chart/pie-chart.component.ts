import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';
import { ResizeChartService } from 'src/app/core/services/resize-chart.service';
import { Subscription } from 'rxjs';
import { PieChartData, PieChartEvent } from 'src/app/core/models/ChartData';


@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})


export class PieChartComponent implements OnInit, OnDestroy {
  @Input() chartData: PieChartData[] = [];
  view: [number, number] = [500, 300]; // Taille par défaut du graphique

  // Initialisation de la propriété avec null
  private resizeSubscription: Subscription | null = null;

  constructor(private router: Router, private resizeChartService: ResizeChartService) {}

  ngOnInit(): void {
    // S'abonner aux changements de taille du graphique
    this.resizeSubscription = this.resizeChartService.getChartSize().subscribe((size: [number, number]) => {
      this.view = size;
    });
  }

  onSectionClick(event: PieChartEvent) {
    const selectedData = this.chartData.find(item => item.name === event.name);
    if (selectedData) {
      this.router.navigate(['/détails/', selectedData.id]);
    }
  }

  ngOnDestroy(): void {
    // Se désabonner pour éviter les fuites de mémoire
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}
