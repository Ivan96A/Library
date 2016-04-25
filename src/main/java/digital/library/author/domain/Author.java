package digital.library.author.domain;

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
@Table(name = "authors")
public class Author implements Serializable{

    @Id
    @Column(name = "id")
    @GeneratedValue
    private Long id;

    @Size(min = 5, max = 50)
    @Column(name = "firstName")
    private String firstName;

    @Size(min = 5, max = 50)
    @Column(name = "lastName")
    private String lastName;

    @Size(min = 5, max = 250)
    @Column(name = "email")
    private String email;

    @Column(name = "birthday")
    private String birthday;

    @JsonIgnore
    @OneToMany(targetEntity = Book.class, cascade = CascadeType.ALL, mappedBy = "author")
    private Set<Book> books = new HashSet<>();

    public Author() {

    }

    public Author(String firstName, String lastName, String email, String birthday) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birthday = birthday;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
    }
}
