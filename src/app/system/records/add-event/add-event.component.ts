import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryModel} from '../../common/models/category.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventService} from '../../common/services/event.service';
import {EventModel} from '../../common/models/event.model';
import {Bill} from '../../common/models/bill.model';
import {BillService} from '../../common/services/bill.service';

@Component({
  selector: 'myf-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: CategoryModel[] = [];
  @Output() eventAdd = new EventEmitter<EventModel>();

  event: EventModel;
  date = new Date();
  form: FormGroup;
  massegeEventSuccess = '';
  massegeEventDanger = '';
  types = [{
    type: 'income',
    label: 'Доход'
  },
    {
      type: 'outcome',
      label: 'Расход'
    }];

  constructor(private eventService: EventService,
              private billService: BillService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
        'idOfCategory': new FormControl('', [Validators.required]),
        'typeOfEvent': new FormControl('outcome'),
        'amount': new FormControl('', [Validators.required, Validators.min(1)]),
        'description': new FormControl('', [Validators.required])
      }
    );
  }

  onSubmit() {
    this.event = new EventModel(
      this.categories.find(c => c.name === this.form.controls['idOfCategory'].value).id,
      this.form.controls['typeOfEvent'].value,
      this.form.controls['amount'].value,
      this.date,
      this.form.controls['description'].value
    );
console.log(this.event.typeOfEvent);
    this.billService.getBill()
      .subscribe((bill: Bill) => {
        let finishBill = 0;
        if (this.event.typeOfEvent === 'outcome') {
          if (bill.value < this.event.amount) {
            this.massegeEventDanger = `У Вас не достаточно средств. Вам не хватает ${this.event.amount - bill.value}`;
            window.setTimeout(() => {
              this.massegeEventDanger = '';
            }, 5000);
            return;
          } else {
            finishBill =  bill.value - this.event.amount;
            this.massegeEventSuccess = 'Расход добавлен';
            window.setTimeout(() => {
              this.massegeEventSuccess = '';
            }, 5000);
          }
        } else {
          finishBill = bill.value + this.event.amount;
          this.massegeEventSuccess = 'Доход добавлен';
          window.setTimeout(() => {
            this.massegeEventSuccess = '';
          }, 5000);
        }

        console.log(finishBill);
        this.eventService.addEvant(this.event)
          .subscribe();

        this.billService.updateBill({value: finishBill, currency: bill.currency})
          .subscribe(() => this.form.reset);

      });

  }

}
