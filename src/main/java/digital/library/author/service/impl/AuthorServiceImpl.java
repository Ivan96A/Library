package digital.library.author.service.impl;

import digital.library.author.domain.Author;
import digital.library.author.repository.AuthorsRepository;
import digital.library.author.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

/**
 * Created by Iwan on 11.03.2016.
 */

@Component("authorService")
public class AuthorServiceImpl implements AuthorService {

    @Autowired
    private AuthorsRepository authorsRepository;

    @Override
    public Page<Author> getAllAuthors(Pageable pageable) {
        return authorsRepository.findAll(pageable);
    }

    @Override
    public Author findById(Long id) {
        return authorsRepository.findOne(id);
    }

    @Override
    public void saveAuthor(Author author) {
        authorsRepository.save(author);
    }

    @Override
    public Author findByEmail(String email) {
        return authorsRepository.findByEmail(email);
    }

     @Override
    public void deleteAuthor(Author author) {
        authorsRepository.delete(author);

    }

    @Override
    public Page<Author> findByFirstName(Pageable pageable, String name) {
        if(name == null || name.equals("")) name = "%";
        else name += "%";

        return authorsRepository.findByFirstName(pageable, name);
    }
}
