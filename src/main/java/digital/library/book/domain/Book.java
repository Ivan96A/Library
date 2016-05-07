package digital.library.book.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import digital.library.author.domain.Author;
import digital.library.publisher.domain.Publisher;

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

    public enum TypeFile {
        PDF( "PDF" ),
        WORD( "WORD" ),
        DJVU( "DJVU" );

        private final String typeFile;

        TypeFile( String typeFile ) {
            this.typeFile = typeFile;
        }

        @Override
        public String toString() {
            return typeFile;
        }
    }

    @Id
    @Column(name = "id")
    @GeneratedValue
    private Long id;

    @Size(min = 5, max = 50)
    @Column(name = "name")
    private String name;

    @Column(name = "publisher_year")
    private Date publisherYear;

    @Column(name = "count_pages")
    private Long countPages;

    @Column(name = "size_file")
    private Long sizeFile;

    @Column(name = "address_file_on_disk")
    private String addressFileOnDisk;

    @Column(name = "address_file_on_net")
    private String addressFileOnNet;

    @Column(name = "type_file")
    private TypeFile typeFile;

    @ManyToOne
    @JoinColumn(name = "publishers_id", nullable = false)
    private Publisher publisher;

    @ManyToOne
    @JoinColumn(name = "authors_id", nullable = false)
    private Author author;

    @Column(name = "image", length = 300000000)
    private String image;

    public Book() {

    }

    public Book(String name
            , Date publisherYear
            , Long countPages
            , Long sizeFile
            , String addressFileOnDisk
            , String addressFileOnNet
            , Publisher publisher
            , Author author
           ) {
        this.name = name;
        this.publisherYear = publisherYear;
        this.countPages = countPages;
        this.sizeFile = sizeFile;
        this.addressFileOnDisk = addressFileOnDisk;
        this.addressFileOnNet = addressFileOnNet;
        this.publisher = publisher;
        this.author = author;
    }

    public Long getId() {
        return id;
    }

    public Publisher getPublisher() {
        return publisher;
    }

    public void setPublisher(Publisher publisher) {
        this.publisher = publisher;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
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

    public TypeFile getTypeFile() {
        return typeFile;
    }

    public void setTypeFile(TypeFile typeFile) {
        this.typeFile = typeFile;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
