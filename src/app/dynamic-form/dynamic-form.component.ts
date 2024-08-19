import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent implements OnInit {

  contactsForm!: FormGroup;
  storeDataInTable: any[] = [];

  constructor(private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.initiateForm();
  }

  initiateForm() {
    this.contactsForm = this.fb.group({
      contacts: this.fb.array([this.createContactForm()])
    });
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  get contacts(): FormArray {
    return this.contactsForm.get('contacts') as FormArray;
  }

  addContact() {
    this.contacts.push(this.createContactForm());
  }

  removeContact(index: number, content: any) {
    // Open the confirmation modal
    this.modalService.open(content).result.then((result) => {
      if (result === 'Yes') {
        this.contacts.removeAt(index);
      }
    }, (reason) => {
      console.log('Dismissed');
    });
  }

  submitForm() {
    if (this.contactsForm.valid) {
      this.storeDataInTable = [...this.contactsForm.value.contacts];
      console.log("Form submitted successfully: ", this.storeDataInTable);
    } else {
      console.log("Form is invalid");
    }
  }





}
