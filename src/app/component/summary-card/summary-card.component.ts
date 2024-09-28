import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss']
})


export class SummaryCardComponent {
  @Input() title: string = '';
  @Input() content: number | null = null;
}
