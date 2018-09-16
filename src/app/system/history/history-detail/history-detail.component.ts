import { Component, OnInit } from '@angular/core';
import { EventService } from '../../common/services/event.service';
import { CategoryService } from '../../common/services/category.service';
import { ActivatedRoute, Params } from '@angular/router';
import { mergeMap, combineLatest, merge } from 'rxjs/operators';
import { EventModel } from '../../common/models/event.model';
import { CategoryModel } from '../../common/models/category.model';
import { of } from 'rxjs';

@Component({
	selector: 'myf-history-detail',
	templateUrl: './history-detail.component.html',
	styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit {

	event: EventModel;
	category: CategoryModel;
	isLoaded = false;

	constructor(
		private route: ActivatedRoute,
		private eventsService: EventService,
		private categoryService: CategoryService) { }

	ngOnInit() {
		this.route.params.pipe(
			mergeMap((params: Params) => this.eventsService.getEventById(params['id'])),
			mergeMap((event: EventModel) => {
				this.event = event;
				return this.categoryService.getCatagoryById(event.idOfCategory);
			})).subscribe((category: CategoryModel) => {
				this.category = category;
				this.isLoaded = true;
			})


	}

}
