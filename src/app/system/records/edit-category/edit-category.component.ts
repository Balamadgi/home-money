import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {CategoryModel} from '../../common/models/category.model';
import {CategoryService} from '../../common/services/category.service';

@Component({
  selector: 'myf-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  @Input() categories: CategoryModel[] = [];
  @Output() categoryEdit = new EventEmitter<CategoryModel>();

  form: FormGroup;
  currentCategoryId = 1;
  currentCategory: CategoryModel;

  massegeEditSuccess = '';

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'category': new FormControl('', [Validators.required]),
      'limit': new FormControl('0', [Validators.required, Validators.min(1)])
    });
    this.onChangeCategory();
  }

  onSubmit() {
    const {category, limit} = this.form.value;

    const categoryUpdated = new CategoryModel(category, limit, this.currentCategoryId);
    this.categoryService.updateCategories(categoryUpdated)
      .subscribe((categoryUpd: CategoryModel) => {
        this.categoryEdit.emit(categoryUpd);
      });

    this.massegeEditSuccess = 'Изменения внесены';
    window.setTimeout(() => {
      this.massegeEditSuccess = '';
    }, 5000);
  }

  onChangeCategory() {
    this.currentCategory = this.categories.find(c => c.id === +this.currentCategoryId); // итератор

  }

}
