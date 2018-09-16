import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'myf-system',
	templateUrl: './system.component.html'
})

export class SystemComponent {
 openS: boolean = false;

openSidebar(openSidebarBoolean: boolean) {
		
		this.openS = openSidebarBoolean;
		
		return openSidebarBoolean;
	}

	closeSidebar(){
		this.openS = false;
	}
}
