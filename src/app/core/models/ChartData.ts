export interface LineChartData {
    id?:number;
    name?: string;
    value?: number;
    series? : SeriesData[];
  }

  export interface SeriesData {
    name: string;  // Représente l'année
    value: number; // Représente le nombre de médailles
  }


  export interface PieChartData {
    id:number;
    name: string;
    value: number;
  }

 export interface PieChartEvent {
    name: string;
  }