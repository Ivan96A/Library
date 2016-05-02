package digital.library.author.service;

import digital.library.author.domain.Author;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Created by Iwan on 11.03.2016.
 */
public interface AuthorService {

    Page<Author> getAllAuthors(Pageable pageable);

    Author findById(Long id);

    Author findByEmail(String email);

    void saveAuthor(Author author);

    void deleteAuthor(Author author);

    Page<Author> findByFirstName(Pageable pageable, String name);
}
