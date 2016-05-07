package digital.library.book.service;

import digital.library.book.domain.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

/**
 * Created by Iwan on 11.03.2016.
 */
public interface BookService {

    Book findById(Long id);

    void save(Book book);

    void delete(Book book);

    void addImage(MultipartFile image, Long id);

    String getImage(Long id);

    Page<Book> findAllByBookNameAndPublisherAndAuthor(Pageable pageable, String bookName, String publisherName, String authorName);

}
