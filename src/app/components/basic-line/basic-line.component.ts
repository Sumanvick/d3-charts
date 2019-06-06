import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-basic-line',
  templateUrl: './basic-line.component.html',
  styleUrls: ['./basic-line.component.scss']
})
export class BasicLineComponent implements OnInit {

  @ViewChild('chart')
  private chartContainer: ElementRef;

  constructor() { }

  ngOnInit() {
    this.createChart();
  }

  private createChart(): void {
    d3.select('svg').remove();

    const element = this.chartContainer.nativeElement;

    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', 340);

      console.log('hello world');
  }

}
