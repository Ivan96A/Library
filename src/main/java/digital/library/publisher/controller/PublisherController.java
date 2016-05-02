package digital.library.publisher.controller;

import digital.library.publisher.domain.Publisher;
import digital.library.publisher.service.PublisherService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.Media;

/**
 * Created by Iwan on 05.04.2016.
 */
@RestController
@RequestMapping("/publisher")
public class PublisherController {

    private static final Logger LOGGER = LoggerFactory.getLogger(PublisherController.class);

    @Autowired
    @Qualifier("publisherService")
    private PublisherService publisherService;

        @RequestMapping(
                method = RequestMethod.GET,
                produces = MediaType.APPLICATION_JSON_VALUE)
        public Page<Publisher> get(Pageable pageable, String name) {
            return publisherService.findByName(pageable, name);
        }

    @RequestMapping(
            value = "/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Publisher getOne(@PathVariable Long id) {
        return publisherService.findById(id);
    }

        @RequestMapping(
                method = RequestMethod.POST,
                produces = MediaType.APPLICATION_JSON_VALUE,
                consumes = MediaType.APPLICATION_JSON_VALUE)
        public void addPublisher(@RequestBody Publisher publisher) {
                LOGGER.warn("Publisher '{}' has been added!", publisher.getName());
                publisherService.save(publisher);
        }

        @RequestMapping(
                method = RequestMethod.PUT,
                produces = MediaType.APPLICATION_JSON_VALUE,
                consumes = MediaType.APPLICATION_JSON_VALUE)
        public void updatePublisher(@RequestBody Publisher publisher) {
            Publisher existingPublisher = publisherService.findById(publisher.getId());
            if(existingPublisher != null && !existingPublisher.getId().equals(publisher.getId())) {
                LOGGER.warn("error updating ");
            }
            else {
                publisherService.save(publisher);
                LOGGER.info("publisher '" + publisher.getName() + "' has been update");
            }

        }

        @RequestMapping(
                method = RequestMethod.DELETE,
                produces = MediaType.APPLICATION_JSON_VALUE)
        public void deletePublisher(@RequestParam("id") Long id) {
            Publisher publisher = publisherService.findById(id);
            publisherService.delete(publisher);
        }

    }
