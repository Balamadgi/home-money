import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../common/services/category.service';
import { EventService } from '../common/services/event.service';
import { forkJoin } from 'rxjs';
import { CategoryModel } from '../common/models/category.model';
import { EventModel } from '../common/models/event.model';

@Component({
	selector: 'myf-history',
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
	categories: CategoryModel[] = [];
	events: EventModel[] = [];
	dataToChart = [];
	isLoad = false;

	constructor(private categoryService: CategoryService,
		private eventService: EventService) { }

	ngOnInit() {
		forkJoin(this.categoryService.getCategories(), this.eventService.getEvents())
			.subscribe((data: [CategoryModel[], EventModel[]]) => {
				this.categories = data[0];
				this.events = data[1];
				this.getChartData();
				this.isLoad = true;
			})
	}

	getChartData() {
	this.dataToChart = [];
		this.categories.forEach((cat) => {
			const catEvent = this.events.filter((e) => e.idOfCategory === cat.id && e.typeOfEvent === 'outcome');
			this.dataToChart.push({
				name: cat.name,
				value: catEvent.reduce((total, e) => {
					total += e.amount;
					return total
				}, 0)
			})
		})
	}
}
