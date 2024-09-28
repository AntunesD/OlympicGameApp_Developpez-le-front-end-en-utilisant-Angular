import { Injectable } from '@angular/core';
import { LineChartData, PieChartData } from '../models/ChartData';
import { CountryData } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})

export class ChartDataService {

  preparePieChartData(data: CountryData[]): PieChartData[] {
    return data.map(country => ({
      id: country.id,
      name: country.country,
      value: country.participations.reduce((sum, p) => sum + p.medalsCount, 0),
    }));
  }
  
  prepareLineChartData(data: CountryData): LineChartData[] {
    if (!data || !data.participations) {
      return [];
    }
    const chartData: LineChartData[] = [
      {
        name: data.country,
        series: data.participations.map((participation) => ({
          name: participation.year.toString(),
          value: participation.medalsCount,
        })),
      },
    ];
  
    return chartData;
  }
  
}
