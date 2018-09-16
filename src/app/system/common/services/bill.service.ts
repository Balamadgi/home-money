import {Injectable, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {Bill} from '../models/bill.model';
import {map} from 'rxjs/internal/operators';
import {BaseApi} from '../../../common/core/base-api';

@Injectable()
export class BillService extends BaseApi {
  constructor(public http: Http) {
    super(http);
  }

  getBill(): Observable<Bill> {
    return this.get('bill');
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.put('bill', bill);
  }

  getCurrency(): Observable<any> {
    return this.http.get('https://openexchangerates.org/api/latest.json?app_id=b460b503c725416da4f7e9df4ff22544')
      .pipe(map((response: Response) => response.json()));
  }


}
