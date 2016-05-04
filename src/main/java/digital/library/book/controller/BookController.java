package digital.library.book.controller;

import digital.library.book.domain.Book;
import digital.library.book.service.BookService;
import digital.library.image.domain.Image;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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
    public Page<Book> get(Pageable pageable, String publisherName, String authorName, String name) {
        return bookService.findAllByBookNameAndPublisherAndAuthor(pageable,name, publisherName, authorName);
    }

    @RequestMapping(
            value = "/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Book getOne(@PathVariable Long id) {
        return bookService.findById(id);
    }

    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addBook(@RequestBody Book book) {
            bookService.save(book);
            LOGGER.info("Book '{}' has been added", book.getId());
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

    @RequestMapping(
            value = "/image",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Image getImageByBookId(@RequestParam("id") Long id) {
        return bookService.getImage(id);
    }

    @RequestMapping(
            value = "/image",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public void addImage(@RequestParam("id") Long id, @RequestParam("file") MultipartFile image) {
        bookService.addImage(image, id);
    }

    @RequestMapping(
            value = "/image",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteImage(@RequestParam("id") Long imageId) {
        bookService.deleteImage(imageId);
    }
}
