import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Contact } from '../../../model/contact';
import { ContactService } from '../../../contact.service';
@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})
export class ContactList implements OnInit {

  contacts: Contact[] = [];

  constructor(
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {

    this.contactService.getContacts().subscribe({

      next: (data) => {
        this.contacts = data;
      },

      error: (error) => {
        console.error('Error loading contacts:', error);
      }

    });
  }

  deleteContact(id: string): void {

    if (!confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    this.contactService.deleteContact(id).subscribe({

      next: () => {
        this.loadContacts();
      },

      error: (error) => {
        console.error('Error deleting contact:', error);
      }

    });
  }
}