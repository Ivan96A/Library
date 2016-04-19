package digital.library.book.service;

import digital.library.book.domain.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Created by Iwan on 11.03.2016.
 */
public interface BookService {

    Page<Book> getAll(Pageable pageable);

    Book findById(Long id);

    void save(Book book);

    void delete(Book book);
        
}
