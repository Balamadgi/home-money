import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../common/services/bill.service';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {Bill} from '../common/models/bill.model';

@Component({
  selector: 'myf-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit, OnDestroy {
	
  sub1: Subscription;
  sub2: Subscription;
  bill: Bill;
  currency: any;
  isLoaded = false;

  constructor(private billService: BillService) {
  }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency())
      .subscribe((data: [Bill, any]) => {
        this.bill = data[0];
        this.currency = data[1];
        // console.log(this.currency);
        this.isLoaded = true;
      });
  }

  onRefresh() {
    this.isLoaded = false;
    this.sub2 = this.billService.getCurrency()
      .subscribe((currency: any) => {
        this.currency = currency;
      });
    this.isLoaded = true;
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
}
