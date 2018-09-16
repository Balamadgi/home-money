import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'myf-curency-card',
  templateUrl: './curency-card.component.html',
  styleUrls: ['./curency-card.component.scss']
})
export class CurencyCardComponent implements OnInit{

  @Input() currency: any;

  date = new Date();

  currencyArr: string[] = ['USD', 'EUR'];

  ngOnInit() {
    // console.log(this.currency);
  }

}
