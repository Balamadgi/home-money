import { BaseApi } from '../../../common/core/base-api';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { EventModel } from '../models/event.model';
import { Observable } from 'rxjs';

@Injectable()
export class EventService extends BaseApi {
	constructor(http: Http) {
		super(http);
	}

	addEvant(event: EventModel) {
		return this.post('events', event);
	}

	getEvents(): Observable<EventModel[]> {
		return this.get('events');
	}	

	getEventById(id): Observable<EventModel> {
		return this.get(`events/${id}`)
	}
}
