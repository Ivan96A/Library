package digital.library.book.service.impl;

import digital.library.book.domain.Book;
import digital.library.book.repository.BookRepository;
import digital.library.book.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

/**
 * Created by Iwan on 11.03.2016.
 */

@Component("bookService")
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Page<Book> getAll(Pageable pageable) {
        Page<Book> page = bookRepository.findAll(pageable);
        return page;
    }

    @Override
    public Book findById(Long id) {
        return bookRepository.findOne(id);
    }

    @Override
    public void save(Book book) {
        bookRepository.save(book);
    }

    @Override
    public void delete(Book book) {
        bookRepository.delete(book);
    }
}
