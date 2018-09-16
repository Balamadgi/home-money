import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { timingSafeEqual } from 'crypto';
import { OutletContext } from '@angular/router';

@Component({
  selector: 'myf-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

@Input() openSidebar: boolean = false;
@Output() closeSidebarEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
		
	}

	closeSidebar(){
		this.openSidebar = false;
		this.closeSidebarEvent.emit(this.openSidebar);		
		return this.openSidebar;
	}
	
}
