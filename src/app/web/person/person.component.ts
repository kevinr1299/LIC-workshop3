import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { AppComponent } from '../../app.component';
import { ConfirmationComponent } from '../../modal/confirmation/confirmation.component';
import { Person } from './person'

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.sass']
})
export class PersonComponent implements OnInit, AfterViewInit {

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {
  }

  static personList: Array<Person> = [
    new Person('Kevin', "Romero", 21),
    new Person('Leo', "Lopez", 20),
    new Person('Karen', "Romero", 42),
    new Person('Valentina', "Orellana", 3),
  ]
  selected = null;
  personForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', [Validators.required]],
    age: [0, [Validators.required, Validators.min(0), Validators.max(200), Validators.pattern('^[0-9]+$')]]
  })

  displayedColumns: string[] = ['name', 'lastName', 'age'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.refresh()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  save_person(): void {
    if (this.personForm.valid) {
      let person = new Person(this.personForm.value.firstName, this.personForm.value.lastName, this.personForm.value.age);
      PersonComponent.personList.push(person)
      this.personForm.reset()
      this.refresh()
    }
  }

  update_person(): void {
    if (this.personForm.valid && this.selected != null) {
      let person = new Person(this.personForm.value.firstName, this.personForm.value.lastName, this.personForm.value.age);
      PersonComponent.personList[this.selected] = person;
      this.cancel_selection()
      this.refresh()
    }
  }

  delete_person(): void {
    let person = PersonComponent.personList[this.selected]
    this.dialog.open(ConfirmationComponent, {
      data: {
        'message': `Are you sure of delete to ${person.name} ${person.lastName}?`
      }
    }).afterClosed().subscribe((confirmation: boolean) => {
      if (confirmation) {
        PersonComponent.personList.splice(this.selected, 1);
        this.cancel_selection()
        this.refresh()
      }
    });
  }

  select_person(index: number, row: Person): void {
    this.selected = index;
    this.personForm.controls['firstName'].setValue(row.name);
    this.personForm.controls['lastName'].setValue(row.lastName);
    this.personForm.controls['age'].setValue(row.age);
  }

  cancel_selection(): void {
    this.selected = null;
    this.personForm.reset();
  }

  private refresh(): void {
    AppComponent.COUNTER = PersonComponent.personList.length;
    this.dataSource = new MatTableDataSource<Person>(PersonComponent.personList);
  }
}
