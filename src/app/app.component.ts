import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataModel } from './data/data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'd3-charts';
  data: Observable<any>;
  pieChartData;
  barChartValueKey = 'strength';
  barChartLabelKey = 'name';
  pieChartValueKey = 'count';
  pieChartLabelKey = 'name';
  currentLevel = 1;

  constructor(private http: HttpClient) {
    this.data = this.http.get<DataModel>('./assets/graphData.json');
  }

  handleBarClick(barData) {
    this.currentLevel += 1;
    console.log('bar clicked...', barData);
    this.pieChartData = barData.drilldown;
  }

  handlePieClick(pieData) {
    console.log('pie clicked...', pieData);
  }

  controlLevel(e) {
    this.currentLevel -= 1;
  }

  // _reFilterData(){}
}
