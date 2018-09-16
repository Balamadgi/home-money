import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonFormModule} from '../common/commonForm.module';
import {SystemRoutingModule} from './system-routing.module';
import { BillComponent } from './bill/bill.component';
import { HistoryComponent } from './history/history.component';
import { PlaningComponent } from './planing/planing.component';
import { RecordsComponent } from './records/records.component';
import {SystemComponent} from './system.component';
import { SidebarComponent } from './common/components/sidebar/sidebar.component';
import { HeaderComponent } from './common/components/header/header.component';
import {DropdownDirective} from './common/directives/dropdown.directive';
import {UserService} from '../common/Services/user.service';
import { BillCardComponent } from './bill/bill-card/bill-card.component';
import { CurencyCardComponent } from './bill/curency-card/curency-card.component';
import {BillService} from './common/services/bill.service';
import { AddEventComponent } from './records/add-event/add-event.component';
import { AddCategoryComponent } from './records/add-category/add-category.component';
import { EditCategoryComponent } from './records/edit-category/edit-category.component';
import {CategoryService} from './common/services/category.service';
import {EventService} from './common/services/event.service';


import { HistoryChartComponent } from './history/history-chart/history-chart.component';
import { HistoryDetailComponent } from './history/history-detail/history-detail.component';
import { HistoryEventsComponent } from './history/history-events/history-events.component';
import { HistoryFilterComponent } from './history/history-filter/history-filter.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './common/pipes/filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    CommonFormModule,
		SystemRoutingModule,
		FormsModule
	],
  declarations: [
    SystemComponent,
    BillComponent,
    HistoryComponent,
    PlaningComponent,
    RecordsComponent,
    SidebarComponent,
    HeaderComponent,
    DropdownDirective,
    BillCardComponent,
    CurencyCardComponent,
    AddEventComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    HistoryChartComponent,
    HistoryDetailComponent,
    HistoryEventsComponent,
		HistoryFilterComponent,
		FilterPipe		
	],
  providers: [
    BillService, CategoryService, EventService
  ]
})

export class SystemModule {

}
