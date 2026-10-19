package com.example.contact_book_backend.repository;

import java.util.List;
import com.example.contact_book_backend.model.Contact;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactRepository extends MongoRepository<Contact, String> {

    List<Contact> findByNameContainingIgnoreCase(String name);

}