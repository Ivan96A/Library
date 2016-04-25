package digital.library.book.service.impl;

import digital.library.book.domain.Book;
import digital.library.book.repository.BookRepository;
import digital.library.book.service.BookService;
import digital.library.image.Image;
import digital.library.image.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.util.Base64Utils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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

    @Override
    public void addImage(MultipartFile image, Long id) {
        Image img = null;
        Book book = bookRepository.findOne(id);
        try {
            img = getImage(image);
        } catch (IOException e) {
            e.printStackTrace();
        }
        book.setImage(img);
        bookRepository.save(book);
    }

    @Override
    public void deleteImage(Long imageId) {
        imageRepository.delete(imageId);
    }

    private Image getImage(MultipartFile image) throws IOException {

        String img = Base64Utils.encodeToString(image.getBytes());
        return new Image(img);
    }
}
