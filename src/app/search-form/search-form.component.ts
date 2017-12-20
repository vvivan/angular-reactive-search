import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  employees = [
      { name: 'John Doe', age: 45 },
      { name: 'Michael Evans', age: 25 },
      { name: 'Anna Johnson', age: 31 },
      { name: 'Chris Donovan', age: 50 },
      { name: 'Philip Anderson', age: 52 },
      { name: 'Andrew Pierce', age: 41 },
      { name: 'Paul Ackermann', age: 33 }
  ];

  filteredEmployees = [];

  searchForm: FormGroup;

  constructor() {
    this.filteredEmployees = this.employees;
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
        'search': new FormControl()
    });

    this.searchForm.get('search').valueChanges
        .subscribe(
            value => {
              this.filteredEmployees = this.filterEmployees(value);
            }
        );
  }


  filterEmployees(value) {

    let found = [];

      Observable.from(this.employees)
        .filter(
            person => person.name.toLowerCase().search(value.toLowerCase()) !== -1
        )
        .subscribe(
            emp => {
                found.push(emp);
            }
        );

      return found;
  }

}
