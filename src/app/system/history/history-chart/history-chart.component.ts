import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
	selector: 'myf-history-chart',
	templateUrl: './history-chart.component.html',
	styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent implements  OnInit {
	@Input() data;
	

	view: any[] = [350, 250];

	ngOnInit() {
		
	}

}


