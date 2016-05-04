package digital.library.book.service.impl;

import digital.library.book.domain.Book;
import digital.library.book.repository.BookRepository;
import digital.library.book.service.BookService;
import digital.library.image.domain.Image;
import digital.library.image.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.util.Base64Utils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Set;

/**
 * Created by Iwan on 11.03.2016.
 */

@Component("bookService")
public class BookServiceImpl implements BookService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private BookRepository bookRepository;


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

    @Override
    public void addImage(MultipartFile image, Long id) {
        Image img = new Image();
        Book book = bookRepository.findOne(id);
        try {
            img.setImageString(Base64Utils.encodeToString(image.getBytes()));
            book.setImage(img);
            bookRepository.saveAndFlush(book);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteImage(Long imageId) {
        imageRepository.delete(imageId);
    }

    @Override
    public Page<Book> findAllByBookNameAndPublisherAndAuthor(Pageable pageable, String bookName, String publisherName, String authorName) {
        if(publisherName == null || publisherName.equals("")) publisherName = "%";
        else publisherName += "%";
        if(authorName == null || authorName.equals("")) authorName = "%";
        else authorName += "%";
        if(bookName == null || bookName.equals("")) bookName = "%";
        else bookName += "%";

        return bookRepository.findAllByPublisherAndAuthor(pageable, bookName, publisherName, authorName);
    }

    @Override
    public String getImage(Long id) {
        Book book = findById(id);
        return "{\"image\": " + book.getImage() + "}";
    }

    private Image encode(MultipartFile image) throws IOException {
        String img = Base64Utils.encodeToString(image.getBytes());
        return new Image(img);
    }

}
