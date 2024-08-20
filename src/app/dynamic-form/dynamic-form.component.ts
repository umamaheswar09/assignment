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


  contactForm: FormGroup;
  showForm: boolean = false;
  contactsList: any[] = []; 
  editIndex: number | null = null; 

  constructor(private fb: FormBuilder, private modalService: NgbModal) {

    this.contactForm=fb.group({
      contacts:this.fb.array([])
    })
  }

  get contacts():FormArray{
    return this.contactForm.get('contacts') as FormArray;
  }

  createContact(){
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  addContact(): void {
    this.showForm = true;
    this.contactForm.reset();
    this.contacts.push(this.createContact());
    this.editIndex = null; 
  }

  submitContact(): void {
    if (this.contactForm.valid) {
      if (this.editIndex !== null) {
        this.contactsList[this.editIndex] = this.contactForm.value;
      } else {
        this.contactsList.push(this.contactForm.value);
      }
      this.showForm = false;
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  updatePhone(index: number): void {
    const contact = this.contactsList[index];
    this.contactForm.patchValue(contact); 
    this.showForm = true;
    this.editIndex = index; 
  }

  deleteContact(index: number, content: any): void {
    this.modalService.open(content).result.then((result) => {
      if (result === 'yes') {
        this.contactsList.splice(index, 1);
        this.showForm=false;
      }
    }, () => {});
  }
}
