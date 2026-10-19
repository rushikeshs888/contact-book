import { Routes } from '@angular/router';

import { ContactList }
  from './components/contact-list/contact-list';

import { ContactForm }from './components/contact-form/contact-form';


export const routes: Routes = [

  // Home

  {
    path: '',

    redirectTo: 'contacts',

    pathMatch: 'full'
  },


  // Contact list

  {
    path: 'contacts',

    component: ContactList
  },


  // Add contact

  {
    path: 'contacts/add',

    component: ContactForm
  },


  // Edit contact

  {
    path: 'contacts/edit/:id',

    component: ContactForm
  },


  // Unknown URL

  {
    path: '**',

    redirectTo: 'contacts'
  }

];