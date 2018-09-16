import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../../../common/models/user.model';
import { AuthService } from '../../../../common/Services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'myf-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	@Output() openSidebarEvent =new EventEmitter<boolean>();
	openSidebarBoolean = false;

	date = new Date();
	user: User;

	constructor(private authservice: AuthService,
		private router: Router) {
	}

	ngOnInit() {
		this.user = JSON.parse(window.localStorage.getItem('user'));
	}

	isLogout() {
		this.authservice.logout();
		this.router.navigate(['/login']);
	}

openSidebar() {
	this.openSidebarBoolean = true;
	return this.openSidebarEvent.emit(this.openSidebarBoolean);
}

}
