import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../common/Services/user.service';
import {User} from '../../common/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'myf-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  minLengthPassword = 6;

  constructor(private userService: UserService,
              private route: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required], this.checkExistingEmail.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(this.minLengthPassword)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(null, [Validators.requiredTrue])

    });
  }

  onSubmit() {
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);

    this.userService.createNewUser(user)
      .subscribe(() => {
        console.log(user);
        this.route.navigate(['/login'], {queryParams: {
            canLogin: true
          }});
      });
    console.log(this.form);
  }
checkExistingEmail(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getUserByEmail(control.value)
        .subscribe((userEmail: User) => {
          if (userEmail) {
            resolve ({existingEmail: true});
          } else {
            resolve (null);
          }
        });
    });
}

}
