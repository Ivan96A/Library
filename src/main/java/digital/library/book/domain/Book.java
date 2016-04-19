package digital.library.book.domain;

import digital.library.author.domain.Author;
import digital.library.publisher.domain.Publisher;
import digital.library.type.file.domain.TypeFile;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Iwan on 10.03.2016.
 */

@Entity
@Table(name = "books")
public class Book implements Serializable{

    @Id
    @Column(name = "id")
    private Long id;

    @Size(min = 5, max = 50)
    @Column(name = "nameBook")
    private String nameBook;

    @Column(name = "publisherYear")
    private Date publisherYear;

    @Column(name = "countPages")
    private Long countPages;

    @Column(name = "sizeFile")
    private Long sizeFile;

    @Column(name = "addressFileOnDisk")
    private String addressFileOnDisk;

    @Column(name = "addressFileOnNet")
    private String addressFileOnNet;

    @ManyToMany(targetEntity = Author.class, mappedBy = "books")
    Set<Author> authors = new HashSet<>();

    @ManyToMany(targetEntity = Publisher.class, mappedBy = "books")
    Set<Publisher> publishers = new HashSet<>();

    @ManyToMany(targetEntity = TypeFile.class, mappedBy = "books")
    Set<TypeFile> typeFiles = new HashSet<>();

    public Book() {

    }

    public Book(String nameBook, Publisher publisher, Author author, TypeFile typeFile, Date publisherYear, Long countPages, Long sizeFile) {
        this.nameBook = nameBook;
        this.publisherYear = publisherYear;
        this.countPages = countPages;
        this.sizeFile = sizeFile;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameBook() {
        return nameBook;
    }

    public void setNameBook(String nameBook) {
        this.nameBook = nameBook;
    }

    public Date getPublisherYear() {
        return publisherYear;
    }

    public void setPublisherYear(Date publisherYear) {
        this.publisherYear = publisherYear;
    }

    public Long getCountPages() {
        return countPages;
    }

    public void setCountPages(Long countPages) {
        this.countPages = countPages;
    }

    public Long getSizeFile() {
        return sizeFile;
    }

    public void setSizeFile(Long sizeFile) {
        this.sizeFile = sizeFile;
    }

    public String getAddressFileOnDisk() {
        return addressFileOnDisk;
    }

    public void setAddressFileOnDisk(String addressFileOnDisk) {
        this.addressFileOnDisk = addressFileOnDisk;
    }

    public String getAddressFileOnNet() {
        return addressFileOnNet;
    }

    public void setAddressFileOnNet(String addressFileOnNet) {
        this.addressFileOnNet = addressFileOnNet;
    }
}
