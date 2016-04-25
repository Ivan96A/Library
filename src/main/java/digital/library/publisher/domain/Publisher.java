package digital.library.publisher.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import digital.library.book.domain.Book;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Iwan on 10.03.2016.
 */
@Entity
@Table(name = "publishers")
public class Publisher implements Serializable{

    @Id
    @Column(name = "id")
    @GeneratedValue
    private Long id;

    @Size(min = 5,  max = 250)
    @Column(name = "name")
    private String name;

    @Size(min = 5, max = 250)
    @Column(name = "email")
    private String email;

    @Size(min = 5, max = 250)
    @Column(name = "officialSite")
    private String officialSite;

    @Size(min = 5, max = 50)
    @Column(name = "address")
    private String address;

    @Size(min = 5, max = 100)
    @Column(name = "telephoneNumber")
    private String telephoneNumber;

    @JsonIgnore
    @ManyToMany(targetEntity = Book.class)
    private Set<Book> books = new HashSet<>();

    public Publisher() {

    }

    public Publisher(String name, String email, String officialSite, String address, String telephoneNumber) {
        this.name = name;
        this.email = email;
        this.officialSite = officialSite;
        this.address = address;
        this.telephoneNumber = telephoneNumber;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOfficialSite() {
        return officialSite;
    }

    public void setOfficialSite(String officialSite) {
        this.officialSite = officialSite;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTelephoneNumber() {
        return telephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
    }

}


