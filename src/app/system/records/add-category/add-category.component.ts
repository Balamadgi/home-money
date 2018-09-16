import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../common/services/category.service';
import {CategoryModel} from '../../common/models/category.model';
import {User} from '../../../common/models/user.model';

@Component({
  selector: 'myf-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  @Output() categoryAdd = new EventEmitter<CategoryModel>();

  form: FormGroup;
  category: CategoryModel;
  massegeEddSuccess = '';

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl('', [Validators.required], this.checkExistingNameOfCategory.bind(this)),
      'capacity': new FormControl('0', [Validators.required, Validators.min(1)])
    });
  }

  onSubmit() {
    this.category = new CategoryModel(this.form.controls['name'].value,
      this.form.controls['capacity'].value);
    // console.log(this.form.controls['name'].value);

    this.categoryService.addCategory(this.category)
      .subscribe((category) => {
        this.categoryAdd.emit(category);
      });

    this.form.reset();

    this.massegeEddSuccess = 'Новая категория добавлена';
    window.setTimeout(() => {
      this.massegeEddSuccess = '';
    }, 5000);


  }

  checkExistingNameOfCategory(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.categoryService.getCategoryByName(control.value)
        .subscribe((categoryName: CategoryModel) => {
          if (categoryName) {
            resolve({existingCategory: true});
            // console.log(this.form);
          } else {
            resolve(null);
          }
        });
    });
  }
}
