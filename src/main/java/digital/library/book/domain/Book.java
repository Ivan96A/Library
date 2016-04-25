package digital.library.book.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import digital.library.author.domain.Author;
import digital.library.image.Image;
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
public class Book implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue
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
    private Set<Author> authors = new HashSet<>();

    @ManyToMany(targetEntity = Publisher.class, mappedBy = "books")
    private Set<Publisher> publishers = new HashSet<>();

    @ManyToMany(targetEntity = TypeFile.class, mappedBy = "books")
    private Set<TypeFile> typeFiles = new HashSet<>();

    @JsonIgnore
    @OneToOne
    private Image image;

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

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }
}
