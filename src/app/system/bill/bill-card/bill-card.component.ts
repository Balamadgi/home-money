import {Component, Input, OnInit} from '@angular/core';
import {Bill} from '../../common/models/bill.model';

@Component({
  selector: 'myf-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {
  @Input() bill: Bill;
  @Input() currency: any;

  euro: number;
  dollar: number;

  ngOnInit() {
    const {rates} = this.currency;
    this.dollar = this.bill.value / rates['UAH'];
    this.euro = this.bill.value / rates['UAH'] * rates['EUR'];
  }

}
