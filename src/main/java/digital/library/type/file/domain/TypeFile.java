package digital.library.type.file.domain;

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
@Table(name = "typeFiles")
public class TypeFile implements Serializable {

    public enum BookType {
        PDF("PDF"),
        WORD("WORD"),
        DJVU("DJVU");

        private final String type;

        BookType(String type) {
            this.type = type;
        }

        @Override
        public String toString() {
            return type;
        }
    }

    @Id
    @Column(name = "id")
    @GeneratedValue
    private Long id;

    @Size(min = 5, max = 50)
    @Column(name = "typeName")
    private BookType typeName;

    @Size(min = 5, max = 250)
    @Column(name = "nameProgramForOpenBook")
    private String nameProgramForOpenBook;

    @Column(name = "webSiteForDownload")
    private String webSiteForDownload;

    @JsonIgnore
    @OneToMany(targetEntity = Book.class, cascade = CascadeType.ALL, mappedBy = "typeFile")
    private Set<Book> books = new HashSet<>();

    public TypeFile() {

    }

    public TypeFile(BookType typeName, String nameProgramForOpenBook, String webSiteForDownload) {
        this.typeName = typeName;
        this.nameProgramForOpenBook = nameProgramForOpenBook;
        this.webSiteForDownload = webSiteForDownload;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BookType getTypeName() {
        return typeName;
    }

    public void setTypeName(BookType typeName) {
        this.typeName = typeName;
    }

    public String getNameProgramForOpenBook() {
        return nameProgramForOpenBook;
    }

    public void setNameProgramForOpenBook(String nameProgramForOpenBook) {
        this.nameProgramForOpenBook = nameProgramForOpenBook;
    }

    public String getWebSiteForDownload() {
        return webSiteForDownload;
    }

    public void setWebSiteForDownload(String webSiteForDownload) {
        this.webSiteForDownload = webSiteForDownload;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
    }
}
