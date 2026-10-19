package com.example.contact_book_backend.controller;

import com.example.contact_book_backend.model.Contact;
import com.example.contact_book_backend.service.ContactService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController {

    private final ContactService service;

    public ContactController(ContactService service) {
        this.service = service;
    }

    // GET ALL CONTACTS
    // GET /api/contacts
    @GetMapping
    public ResponseEntity<List<Contact>> getAllContacts() {
        return ResponseEntity.ok(service.getAllContacts());
    }

    // GET CONTACT BY ID
    // GET /api/contacts/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(
            @PathVariable String id) {

        return service.getContactById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ADD CONTACT
    // POST /api/contacts
    @PostMapping
    public ResponseEntity<Contact> addContact(
            @Valid @RequestBody Contact contact) {

        Contact savedContact = service.saveContact(contact);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedContact);
    }

    // UPDATE CONTACT
    // PUT /api/contacts/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(
            @PathVariable String id,
            @Valid @RequestBody Contact contact) {

        Contact updatedContact = service.updateContact(id, contact);

        if (updatedContact == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedContact);
    }

    // DELETE CONTACT
    // DELETE /api/contacts/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(
            @PathVariable String id) {

        boolean deleted = service.deleteContact(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    // SEARCH CONTACT
    // GET /api/contacts/search?name=rahul
    @GetMapping("/search")
    public ResponseEntity<List<Contact>> searchContact(
            @RequestParam String name) {

        return ResponseEntity.ok(
                service.searchContact(name)
        );
    }
}