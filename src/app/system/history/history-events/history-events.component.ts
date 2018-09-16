import { Component, OnInit, Input } from '@angular/core';
import { CategoryModel } from '../../common/models/category.model';
import { EventModel } from '../../common/models/event.model';

@Component({
	selector: 'myf-history-events',
	templateUrl: './history-events.component.html',
	styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {
	@Input() categories: CategoryModel[] = [];
	@Input() events: EventModel[] = [];
	searchPlaceHolder: string = 'Сумма';
	searchValue: string = '';
	searchField = 'amount';

	constructor() { }

	ngOnInit() {
	}

	getEventClass(e: EventModel) {
		return {
			'event-danger': e.typeOfEvent === 'outcome',
			'event-success': e.typeOfEvent === 'income'
		}
	}

	getNamesOfCat(e: EventModel) {
		for (let i = 0; i < this.categories.length; i++) {
			if (e.idOfCategory === this.categories[i].id) {
				e.categoryName = this.categories[i].name;
				return e.categoryName;
			}
		}
	}

	filterEvents(param: string) {
		const mapOfEvents = {
			amount: 'Сумма',
			date: 'Дата',
			category: 'Категория',
			type: 'Тип'
		};
		this.searchPlaceHolder = mapOfEvents[param];
		this.searchField = param;
	}
}
