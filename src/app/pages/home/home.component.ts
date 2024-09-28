import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { PieChartData } from 'src/app/core/models/ChartData';
import { ChartDataService } from 'src/app/core/services/chart-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, OnDestroy {
  public PiechartData: PieChartData[] = [];
  public NumberOfJOs = 0;
  public NumberOfCountries = 0;
  private destroy$ = new Subject<void>();

  constructor(private olympicService: OlympicService , private chartDataService: ChartDataService) {}

  ngOnInit(): void {
    this.loadOlympicsData();
  }

  private loadOlympicsData(): void {
    this.olympicService.getOlympics()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.PiechartData = this.chartDataService.preparePieChartData(data);
          this.NumberOfCountries = data.length;

          // Calcul simplifié des années uniques
          const uniqueYears = new Set(data.flatMap(country => 
            country.participations.map(participation => participation.year)
          ));
          this.NumberOfJOs = uniqueYears.size;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
