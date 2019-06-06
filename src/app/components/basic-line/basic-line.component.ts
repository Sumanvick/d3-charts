import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-basic-line',
  templateUrl: './basic-line.component.html',
  styleUrls: ['./basic-line.component.scss']
})
export class BasicLineComponent implements OnInit {

  @ViewChild('chart')
  private chartContainer: ElementRef;

  height = 340;
  n = 20;

  margin = {top: 50, right: 50, bottom: 50, left: 50};

  constructor() { }

  ngOnInit() {
    this.createChart();
  }

  private createChart(): void {
    d3.select('svg').remove();

    const element = this.chartContainer.nativeElement;

    const width = element.offsetWidth;

    const n = 21;

    const xScale = d3.scaleLinear()
    .domain([0, n - 1])
    .range([0, width]);

    const yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([this.height, 0]);

    const dataset = d3.range(n).map(function(d) { return {'y': d3.randomUniform(1)() }; });

    const line = d3.line()
    .x(function(d, i) { return xScale(i); })
    .y(function(d) { return yScale(d[1]);
  })
    .curve(d3.curveMonotoneX);

    console.log('line', line);

    const svg = d3.select(element).append('svg')
    .attr('width', width + this.margin.left + this.margin.right)
    .attr('height', this.height + this.margin.top + this.margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + this.height + ')')
    .call(d3.axisBottom(xScale));

    svg.append('g')
    .attr('class', 'y axis')
    .call(d3.axisLeft(yScale));

    // svg.append('path')
    // .datum(dataset)
    // .attr('class', 'line')
    // .attr('d', line.d);

  }
  // onResize() {
  //   this.createChart();
  // }

}
