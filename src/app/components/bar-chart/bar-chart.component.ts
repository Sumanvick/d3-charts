import { Component, ElementRef, Input,
         OnChanges, ViewChild, ViewEncapsulation,
         Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';
// import { DataModel } from 'src/app/data/data.model';

@Component({
  selector: 'app-bar-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnChanges {
  @ViewChild('chart')
  private chartContainer: ElementRef;

  @Input()
  data;
  @Input()
  height = 340;
  @Input()
  valueKey = 'value';
  @Input()
  labelKey = 'name';

  @Output()
  barClick = new EventEmitter<any>();

  margin = { top: 20, right: 20, bottom: 30, left: 40 };

  constructor() { }

  ngOnChanges(): void {
    if (!this.data) { return; }

    this.createChart();
  }

  private createChart(): void {
    d3.select('svg').remove();

    const element = this.chartContainer.nativeElement;
    const data = this.data;

    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', this.height);

    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = this.height - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(data.map(d => d[this.labelKey]));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(data, d => {
        // console.log('data d ', d[this.valueKey]);
        return Number(d[this.valueKey]);
        })]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y)
      .tickFormat(function (d: any) {
          return d;
       }).ticks(10))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d[this.labelKey]))
      .attr('y', d => y(d[this.valueKey]))
      .attr('width', x.bandwidth())
      .attr('height', d => contentHeight - y(d[this.valueKey]))
      .on('click', d => this.barClick.emit(d));
  }

  onResize() {
    this.createChart();
  }
}
