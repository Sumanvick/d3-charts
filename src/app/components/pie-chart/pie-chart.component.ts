import { Component,
         ElementRef,
         Input,
         OnChanges,
         OnInit,
         ViewChild,
         ViewEncapsulation,
         EventEmitter,
         Output} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnChanges {
  @ViewChild('chart')
  private chartContainer: ElementRef;

  @Input()
  data: any = [
    // { name: 'cats', count: 3, percentage: 2, color: '#000000' },
    // { name: 'dogs', count: 10, percentage: 8, color: '#f8b70a' },
    // { name: 'horses', count: 17, percentage: 15, color: '#6149c6' },
    // { name: 'goats', count: 47, percentage: 41, color: '#9f8170' },
    // { name: 'cows', count: 35, percentage: 31, color: '#8ABD4A' },
  ];
  @Input()
  labelKey = 'name';
  @Input()
  valueKey = 'value';
  @Input()
  color = ['#f8b70a', '#6149c6', '#9f8170', '#8ABD4A'];
  @Output()
  pieClick = new EventEmitter<any>();
  totalNumber;
  margin = { top: 20, right: 20, bottom: 30, left: 40 };

  constructor() { }

  ngOnChanges(): void {
    if (!this.data) { return; }
    this.createChart();
  }

  ngOnInit() {
    this.createChart();
  }

  private createChart(): void {
    d3.select('svg').remove();

    const element = this.chartContainer.nativeElement;
    const data = this.data;
    const width = 540;
    const height = 540;
    const radius = 200;
    const totalNumber = data.reduce((acc, x) => {
      return acc + x.count;
    }, 0);
    console.log(totalNumber);
    const arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(100);

    const pie = d3.pie()
      .sort(null)
      .value(function (d: any) {
        return d.count;
      });

    const svg = d3.select(element).append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    // const svg = d3.select(element).append('svg')
    //   .attr('width', element.offsetWidth)
    //   .attr('height', element.offsetHeight);

    // const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    // const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    // const svgG = svg.append('g')
    //   .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    const g = svg.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    g.append('path')
      .attr('d', <any>arc)
      .style('fill',  (d: any, i) => {
        // console.log(d);
        return this.color[i];
      })
      .on('click', d => this.pieClick.emit(d));

    g.append('text')
      .attr('transform', function (d: any) {
        const _d = arc.centroid(d);
        _d[0] *= 1.5;	// multiply by a constant factor
        _d[1] *= 1.5;	// multiply by a constant factor
        return 'translate(' + _d + ')';
      })
      .attr('dy', '.50em')
      .style('text-anchor', 'middle')
      .text((d: any) => {
        // if (d.data.percentage < 8) {
        //   return '';
        // }
        return '' + d.data[this.labelKey] + ' - ' + Number(d.data[this.valueKey] / totalNumber * 100).toFixed(2) + '%';
      });

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '4em')
      .attr('y', 20)
      .text(totalNumber);
  }

  onResize() {
    this.createChart();
  }

}
