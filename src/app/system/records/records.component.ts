import {Component, OnInit} from '@angular/core';
import {CategoryModel} from '../common/models/category.model';
import {CategoryService} from '../common/services/category.service';
import {Subscription} from 'rxjs';
import {EventModel} from '../common/models/event.model';
import {EventService} from '../common/services/event.service';

@Component({
  selector: 'myf-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  categories: CategoryModel[] = [];
  events: EventModel [] = [];
  isLoaded = false;
  sub1 = Subscription;
  sub2 = Subscription;

  constructor(private categoryService: CategoryService,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe((categories: CategoryModel[]) => {
        this.categories = categories;
        this.isLoaded = true;
      });
    this.eventService.getEvents()
      .subscribe((events: EventModel[]) => {
        this.events = events;
        this.isLoaded = true;
      });
  }

  newEventAdded(event: EventModel) {
    this.events.push(event);
  }

  newCategoryAdded(category: CategoryModel) {
    this.categories.push(category);
  }

  categoryWasEdited(category: CategoryModel) {
    const index = this.categories
      .findIndex(c => c.id === category.id);
    this.categories[index] = category;
  }
}
