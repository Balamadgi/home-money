import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BaseApi} from '../../../common/core/base-api';
import {CategoryModel} from '../models/category.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../../../common/models/user.model';
import {FormControl} from '@angular/forms';

@Injectable()
export class CategoryService extends BaseApi {

  constructor(http: Http) {
    super(http);
  }

  getCategoryByName(categoryName: string): Observable<CategoryModel> {
    return this.get(`categories?name=${categoryName}`)
      .pipe(map((category: CategoryModel[]) => category[0] ? category[0] : undefined));
  }


  addCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.post('categories', category);
  }

  getCategories(): Observable<CategoryModel[]> {
    return this.get('categories');
  }

  updateCategories(category: CategoryModel): Observable<CategoryModel> {
    return this.put(`categories/${category.id}`, category);
  }

	getCatagoryById(id): Observable<CategoryModel> {
		return this.get(`categories/${id}`);
	}
}
