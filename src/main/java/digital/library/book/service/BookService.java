package digital.library.book.service;

import digital.library.book.domain.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by Iwan on 11.03.2016.
 */
public interface BookService {

    Page<Book> getAll(Pageable pageable);

    Book findById(Long id);

    void save(Book book);

    void delete(Book book);

    void addImage(MultipartFile image, Long id);

    void deleteImage(Long imageId);

    Page<Book> findAllByPublisher(Pageable pageable, String name);

    Page<Book> findAllByAuthor(Pageable pageable, String name);
}
