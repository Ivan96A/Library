package digital.library.book.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import digital.library.author.domain.Author;
import digital.library.image.domain.Image;
import digital.library.publisher.domain.Publisher;
import digital.library.type.file.domain.TypeFile;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Date;

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
    @Column(name = "name")
    private String name;

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

    @ManyToOne
    @JoinColumn(name = "publishersId", nullable = false)
    private Publisher publisher;

    @ManyToOne
    @JoinColumn(name = "authorsId", nullable = false)
    private Author author;

    @ManyToOne
    @JoinColumn(name = "typeFilesId", nullable = false)
    private TypeFile typeFile;

    @JsonIgnore
    @OneToOne
    private Image image;

    public Book() {

    }

    public Book(String name, Publisher publisher, Author author, TypeFile typeFile, Date publisherYear, Long countPages, Long sizeFile) {
        this.name = name;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
