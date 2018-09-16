import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system.component';
import { BillComponent } from './bill/bill.component';
import { HistoryComponent } from './history/history.component';
import { PlaningComponent } from './planing/planing.component';
import { RecordsComponent } from './records/records.component';
import { HistoryDetailComponent } from './history/history-detail/history-detail.component';
import { AuthGuard } from '../common/Services/auth.guard';

const routes: Routes = [{
	path: 'system', component: SystemComponent, canActivate: [AuthGuard],  children: [
		{ path: 'bill', component: BillComponent },
		{ path: 'history', component: HistoryComponent },
		{ path: 'planing', component: PlaningComponent },
		{ path: 'records', component: RecordsComponent },
		{ path: 'history/:id', component: HistoryDetailComponent }
	]
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class SystemRoutingModule {

}
