import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {UserService} from '../../common/Services/user.service';
import {User} from '../../common/models/user.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../../common/Services/auth.service';

@Component({
  selector: 'myf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) {
  }

  passwordMinLength = 6;
  form: FormGroup;
  messageDanger = '';
	massegeSuccess = '';
	massegeWarning = '';


  ngOnInit() {
    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['canLogin']) {
          this.massegeSuccess = 'Вы зарегистрированы';
				}
				else if (params['accessDenied']) {
					this.massegeWarning = 'Вы не вошли в систему!' 
					window.setTimeout(() => {
						this.massegeWarning = '';
					}, 5000);
				}
      });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(this.passwordMinLength)])
    });
  }

  onSubmit() {
    const formData = this.form.value;
    this.userService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/system', 'bill']);
          } else {
            this.messageDanger = 'Неверный пароль';
            window.setTimeout(() => {
              this.messageDanger = '';
            }, 5000);
          }

        } else {
          this.messageDanger = 'Пользователя не существует';
          window.setTimeout(() => {
            this.messageDanger = '';
          }, 5000);
        }

      });
  }
}
