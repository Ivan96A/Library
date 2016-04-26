package digital.library.author.controller;

import digital.library.author.domain.Author;
import digital.library.author.service.AuthorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


/**
 * Created by Iwan on 15.03.2016.
 */

@RestController
@RequestMapping("/author")
public class AuthorController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthorController.class);

    @Autowired
    @Qualifier("authorService")
    private AuthorService authorService;

    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Page<Author> getAllAuthors(Pageable pageable) {
        Page<Author> page = authorService.getAllAuthors(pageable);
        return page;
    }

    @RequestMapping(
            value = "/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Author getOne(@PathVariable Long id) {
        return authorService.findById(id);
    }

    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addAuthor(@RequestBody Author author) {
        if ((authorService.findByEmail(author.getEmail()) != null) || (authorService.findById(author.getId()) != null)) {
            LOGGER.warn("Author '{}' already in use!", author.getFirstName());
        } else {
            LOGGER.warn("Author '{}' has been added!", author.getFirstName());
            authorService.saveAuthor(author);

        }
    }

    @RequestMapping(
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateAuthor(@RequestBody Author author) {
        Author existingAuthor = authorService.findById(author.getId());
        if (existingAuthor != null && !existingAuthor.getId().equals(author.getId())) {
            LOGGER.warn("error updating ");
        }
        authorService.saveAuthor(author);
        LOGGER.info("author id = '" + author.getId() + "' has been update");
    }

    @RequestMapping(
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteAuthor(@RequestParam("id") Long id) {
        Author author = authorService.findById(id);
        authorService.deleteAuthor(author);
    }

}
