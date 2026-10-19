
package com.example.contact_book_backend.service;

import java.util.List;
import java.util.Optional;

import com.example.contact_book_backend.model.Contact;
import com.example.contact_book_backend.repository.ContactRepository;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final ContactRepository repository;

    public ContactService(ContactRepository repository) {
        this.repository = repository;
    }

    // Get all contacts
    public List<Contact> getAllContacts() {
        return repository.findAll();
    }

    // Get contact by ID
    public Optional<Contact> getContactById(String id) {
        return repository.findById(id);
    }

    // Add contact
    public Contact saveContact(Contact contact) {
        return repository.save(contact);
    }

    // Update contact
    public Contact updateContact(String id, Contact contact) {

        Optional<Contact> existingContact = repository.findById(id);

        if (existingContact.isEmpty()) {
            return null;
        }

        Contact existing = existingContact.get();

        existing.setName(contact.getName());
        existing.setMobileNumber(contact.getMobileNumber());
        existing.setEmail(contact.getEmail());
        existing.setAddress(contact.getAddress());

        return repository.save(existing);
    }

    // Delete contact
    public boolean deleteContact(String id) {

        if (!repository.existsById(id)) {
            return false;
        }

        repository.deleteById(id);
        return true;
    }

    // Search contact
    public List<Contact> searchContact(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }
    
}

