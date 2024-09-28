import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Subscription } from 'rxjs';
import { CountryData } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { LineChartData } from 'src/app/core/models/ChartData';
import { ChartDataService } from 'src/app/core/services/chart-data.service';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})

export class DetailsComponent implements OnInit, OnDestroy {
  countryData: CountryData | undefined; 
  chartData: LineChartData[] = []; 

  countryName = ""; 
  totalParticipations = 0;
  totalMedals = 0;
  totalAthletes = 0;

  private subscription: Subscription = new Subscription(); 

  constructor(
    private olympicService: OlympicService,
    private chartDataService: ChartDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const countryId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (isNaN(countryId)) {
      this.router.navigate(['/not-found']);
      return;
    }
  
    this.subscription.add(
      this.olympicService.getOlympics().subscribe((countries) => {
        if (countries) {
          this.countryData = countries.find((c) => c.id === countryId);
          if (this.countryData) {
            this.countryName = this.countryData.country;
            this.updateChartData();
          } else {
            this.router.navigate(['/not-found']);
          }
        } else {
          this.router.navigate(['/not-found']);
        }
      })
    );
  }
  
  
  updateChartData(): void {
    if (this.countryData) {
      // Créez un tableau contenant un objet avec les propriétés souhaitées
      this.chartData =  this.chartDataService.prepareLineChartData(this.countryData);
      
      // Vérification des totaux
      this.totalParticipations = this.countryData.participations.length;
      this.totalMedals = this.countryData.participations.reduce(
        (sum: number, participation: Participation) => sum + participation.medalsCount,
        0
      );
      this.totalAthletes = this.countryData.participations.reduce(
        (sum: number, participation: Participation) => sum + participation.athleteCount || 0,
        0
      );
    }
  }
  
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Désinscription pour éviter les fuites de mémoire
  }
}
