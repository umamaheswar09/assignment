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

export class DynamicFormComponent {

  // contactsForm!: FormGroup;
  // storeDataInTable: any[] = [];

  // constructor(private fb: FormBuilder, private modalService: NgbModal) { }

  // ngOnInit(): void {
  //   this.initiateForm();
  // }

  // initiateForm() {
  //   this.contactsForm = this.fb.group({
  //     contacts: this.fb.array([this.createContactForm()])
  //   });
  // }

  // createContactForm(): FormGroup {
  //   return this.fb.group({
  //     name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
  //     email: ['', [Validators.required, Validators.email]],
  //     phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
  //   });
  // }

  // get contacts(): FormArray {
  //   return this.contactsForm.get('contacts') as FormArray;
  // }

  // addContact() {
  //   this.contacts.push(this.createContactForm());
  // }

  // removeContact(index: number, content: any) {
  //   // Open the confirmation modal
  //   this.modalService.open(content).result.then((result) => {
  //     if (result === 'Yes') {
  //       this.contacts.removeAt(index);
  //     }
  //   }, (reason) => {
  //     console.log('Dismissed');
  //   });
  // }

  // submitForm() {
  //   if (this.contactsForm.valid) {
  //     this.storeDataInTable = [...this.contactsForm.value.contacts];
  //     console.log("Form submitted successfully: ", this.storeDataInTable);
  //   } else {
  //     console.log("Form is invalid");
  //   }
  // }
  // contactForm: FormGroup;
  // contactsList: any[] = [];

  // constructor(private fb: FormBuilder, private modalService: NgbModal) {
  //   this.contactForm = this.fb.group({
  //     contacts: this.fb.array([])
  //   });
  // }

  // get contacts(): FormArray {
  //   return this.contactForm.get('contacts') as FormArray;
  // }

  // addContact(): void {
  //   const contactFormGroup = this.fb.group({
  //     name: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     phone: ['', Validators.required]
  //   });
  //   this.contacts.push(contactFormGroup);
  // }

  // updateContact(index: number): void {
  //   const contact = this.contacts.at(index);
  //   if (contact.valid) {
  //     console.log(`Contact ${index + 1} updated:`, contact.value);
  //   } else {
  //     contact.markAllAsTouched();
  //   }
  // }

  // deleteContact(index: number, content: any): void {
  //   this.modalService.open(content).result.then((result) => {
  //     if (result === 'yes') {
  //       this.contacts.removeAt(index);
  //       this.contactsList.splice(index, 1);
  //     }
  //   }, () => {});
  // }

  // onSubmit(): void {
  //   if (this.contactForm.valid) {
  //     this.contactsList.push(this.contactForm.value); 
  //     console.log('All Contacts:', this.contactForm.value.contacts);
  //   } else {
  //     this.contactForm.markAllAsTouched();
  //   }
  // }

  contactForm: FormGroup;
  showForm: boolean = false;
  contactsList: any[] = []; // Store contacts to be displayed in the table
  editIndex: number | null = null; // Track the index of the contact being edited

  constructor(private fb: FormBuilder, private modalService: NgbModal) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  addContact(): void {
    this.showForm = true;
    this.contactForm.reset();
    this.editIndex = null; // Reset edit mode
  }

  submitContact(): void {
    if (this.contactForm.valid) {
      if (this.editIndex !== null) {
        // If in edit mode, update the existing contact
        this.contactsList[this.editIndex] = this.contactForm.value;
      } else {
        // If not in edit mode, add a new contact
        this.contactsList.push(this.contactForm.value);
      }
      this.showForm = false;
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  updatePhone(index: number): void {
    const contact = this.contactsList[index];
    this.contactForm.patchValue(contact); // Load existing contact details into the form
    this.showForm = true;
    this.editIndex = index; // Set edit mode
  }

  deleteContact(index: number, content: any): void {
    this.modalService.open(content).result.then((result) => {
      if (result === 'yes') {
        this.contactsList.splice(index, 1);
      }
    }, () => {});
  }
}
