package digital.library.book.controller;

import digital.library.book.domain.Book;
import digital.library.book.service.BookService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Iwan on 06.04.2016.
 */
@RestController
@RequestMapping("/book")
public class BookController {

    private static final Logger LOGGER = LoggerFactory.getLogger(BookController.class);

    @Autowired
    @Qualifier("bookService")
    private BookService bookService;

    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Page<Book> getAllBook(Pageable pageable) {
        return bookService.getAll(pageable);
    }

    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addBook(@RequestBody Book book) {
        if(bookService.findById(book.getId()) != null) {
            LOGGER.warn("Book '{}' already in use!", book.getId());
        } else {
            bookService.save(book);
            LOGGER.info("Book '{}' has been added", book.getId());
        }
    }

    @RequestMapping(
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateBook(@RequestBody Book book) {
        Book existingBook = bookService.findById(book.getId());
        if(existingBook != null && !existingBook.getId().equals(book.getId())) {
            LOGGER.warn("error updating ");
        } else {
            bookService.save(book);
            LOGGER.info("book '" + book.getId() + "' has been update");
        }
    }

    @RequestMapping(
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteBook(@RequestParam("id") Long id) {
        Book book = bookService.findById(id);
        bookService.delete(book);
    }
}
