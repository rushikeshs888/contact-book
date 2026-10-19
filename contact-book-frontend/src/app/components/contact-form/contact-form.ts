import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { ContactService } from '../../../contact.service';
import { Contact } from '../../../model/contact';

@Component({
  selector: 'app-contact-form',

  standalone: true,

  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './contact-form.html',

  styleUrl: './contact-form.css'
})
export class ContactForm implements OnInit {


  // Form

  contactForm: FormGroup;


  // Edit mode

  isEditMode = false;


  // Contact ID

  contactId: string | null = null;


  // Loading

  isLoading = false;


  // Submitting

  isSubmitting = false;


  // Messages

  errorMessage = '';

  successMessage = '';


  constructor(
    private formBuilder: FormBuilder,

    private contactService: ContactService,

    private router: Router,

    private activatedRoute: ActivatedRoute
  ) {


    // Create form

    this.contactForm =
      this.formBuilder.group({

        name: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50)
          ]
        ],


        mobileNumber: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^[6-9][0-9]{9}$/
            )
          ]
        ],


        email: [
          '',
          [
            Validators.email
          ]
        ],


        address: [
          '',
          [
            Validators.maxLength(200)
          ]
        ]

      });

  }


  // Component initialization

  ngOnInit(): void {

    this.contactId =
      this.activatedRoute.snapshot.paramMap.get(
        'id'
      );


    if (this.contactId) {

      this.isEditMode = true;

      this.loadContact(
        this.contactId
      );

    }

  }


  // Load contact for editing

  loadContact(
    id: string
  ): void {

    this.isLoading = true;

    this.errorMessage = '';


    this.contactService
      .getContactById(id)
      .subscribe({

        next: (contact) => {

          this.contactForm.patchValue({

            name: contact.name,

            mobileNumber:
              contact.mobileNumber,

            email: contact.email,

            address: contact.address

          });


          this.isLoading = false;

        },


        error: (error) => {

          console.error(
            'Error loading contact:',
            error
          );


          this.isLoading = false;

          this.errorMessage =
            'Unable to load contact.';


          // Go back after short delay

          setTimeout(() => {

            this.router.navigate([
              '/contacts'
            ]);

          }, 1500);

        }

      });

  }


  // Form controls

  get name() {

    return this.contactForm.get(
      'name'
    );

  }


  get mobileNumber() {

    return this.contactForm.get(
      'mobileNumber'
    );

  }


  get email() {

    return this.contactForm.get(
      'email'
    );

  }


  get address() {

    return this.contactForm.get(
      'address'
    );

  }


  // Submit

  onSubmit(): void {


    this.errorMessage = '';

    this.successMessage = '';


    // Angular validation

    if (this.contactForm.invalid) {

      this.contactForm.markAllAsTouched();

      return;

    }


    this.isSubmitting = true;


    const contact: Contact =
      this.contactForm.value;


    // EDIT

    if (
      this.isEditMode &&
      this.contactId
    ) {


      this.contactService
        .updateContact(
          this.contactId,
          contact
        )
        .subscribe({

          next: (response) => {

            console.log(
              'Contact updated:',
              response
            );


            this.isSubmitting = false;

            this.successMessage =
              'Contact updated successfully!';


            setTimeout(() => {

              this.router.navigate([
                '/contacts'
              ]);

            }, 1000);

          },


          error: (error) => {

            console.error(
              'Error updating contact:',
              error
            );


            this.isSubmitting = false;

            this.errorMessage =
              'Unable to update contact.';

          }

        });


      return;

    }


    // ADD

    this.contactService
      .addContact(contact)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Contact created:',
            response
          );


          this.isSubmitting = false;

          this.successMessage =
            'Contact added successfully!';


          setTimeout(() => {

            this.router.navigate([
              '/contacts'
            ]);

          }, 1000);

        },


        error: (error: any) => {

          console.error(
            'Error adding contact:',
            error
          );


          this.isSubmitting = false;

          this.errorMessage =
            'Unable to add contact.';

        }

      });

  }


  // Cancel

  cancel(): void {

    this.router.navigate([
      '/contacts'
    ]);

  }

}