import { Component, OnInit } from '@angular/core';
import { BillService } from '../common/services/bill.service';
import { EventService } from '../common/services/event.service';
import { CategoryService } from '../common/services/category.service';
import { Bill } from '../common/models/bill.model';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { combineLatest } from 'rxjs/operators';
import { EventModel } from '../common/models/event.model';
import { CategoryModel } from '../common/models/category.model';
import { element } from '@angular/core/src/render3/instructions';

@Component({
	selector: 'myf-planing',
	templateUrl: './planing.component.html',
	styleUrls: ['./planing.component.scss']
})
export class PlaningComponent implements OnInit {

	bill: Bill;
	categories: CategoryModel[] = [];
	events: EventModel[] = [];
	isLoaded = false;

	constructor(private billService: BillService,
		private eventService: EventService,
		private categoryService: CategoryService) { }

	ngOnInit() {
		forkJoin(this.billService.getBill(),
			this.categoryService.getCategories(),
			this.eventService.getEvents()).subscribe((data) => {
				this.bill = data[0];
				this.categories = data[1];
				this.events = data[2];
				this.isLoaded = true;
			})
	}

	getCostOfEventsByCategory(category: CategoryModel) {
		let arrayOfOutcomesByCat = [];
		let sumOfEventsCost = 0;
		for (let i = 0; i < this.events.length; i++) {
			if (category.id === this.events[i].idOfCategory && this.events[i].typeOfEvent === 'outcome') {
				arrayOfOutcomesByCat.push(this.events[i]);
				sumOfEventsCost += this.events[i].amount;
			}
		}
		return sumOfEventsCost;
	}
	getPercent(cat: CategoryModel): number {
		let perc = this.getCostOfEventsByCategory(cat) / cat.capacity * 100;
		return perc > 100 ? 100 : perc;
	}

	getWidthOfProgBar(cat: CategoryModel) {
		return this.getPercent(cat) + '%';
	}

	getCategoryPercent(cat: CategoryModel): string {
		if (this.getPercent(cat) < 30) {
			return 'success';
		} else if (this.getPercent(cat) > 30 && this.getPercent(cat) < 60) {
			return 'warning';
		} else {
			return 'danger';
		}
	}
}