package com.example.contact_book_backend.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Document(collection="contacts")
public class Contact {
    @Id
    private String id;
    @NotBlank(message = "Name is mandatory")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")

    private String name;
    @NotBlank (message = "Mobile number is mandatory")
    @Pattern(
        regexp = "^[6-9][0-9]{9}$", 
        message = "Invalid mobile number. It should be a 10-digit number starting with 6, 7, 8, or 9.")

    private String mobileNumber;
    @NotBlank(message = "Email is mandatory")
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Invalid email address")
    private String email;
    @Size(max = 100, message = "Address must not exceed 100 characters")


    private String address;

    public Contact(){}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Contact(String name, String mobileNumber, String email, String address){
        this.name=name;
        this.mobileNumber=mobileNumber;
        this.email=email;
        this.address=address;
    }
}
