import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contact } from './model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl =
    'http://localhost:8080/api/contacts';


  constructor(
    private http: HttpClient
  ) {}


  // GET ALL CONTACTS

  getContacts(): Observable<Contact[]> {

    return this.http.get<Contact[]>(
      this.apiUrl
    );

  }


  // GET CONTACT BY ID

  getContactById(
    id: string
  ): Observable<Contact> {

    return this.http.get<Contact>(
      `${this.apiUrl}/${id}`
    );

  }


  // ADD CONTACT

  addContact(
    contact: Contact
  ): Observable<Contact> {

    return this.http.post<Contact>(
      this.apiUrl,
      contact
    );

  }


  // UPDATE CONTACT

  updateContact(
    id: string,
    contact: Contact
  ): Observable<Contact> {

    return this.http.put<Contact>(
      `${this.apiUrl}/${id}`,
      contact
    );

  }


  // DELETE CONTACT

  deleteContact(
    id: string
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }


  // SEARCH CONTACTS

  searchContacts(
    name: string
  ): Observable<Contact[]> {

    return this.http.get<Contact[]>(
      `${this.apiUrl}/search?name=${name}`
    );

  }

}