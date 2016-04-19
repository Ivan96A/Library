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
        public Page<Publisher> getAllPublisher(Pageable pageable) {
            Page<Publisher> page = publisherService.getAll(pageable);
            return page;
        }

        @RequestMapping(
                method = RequestMethod.POST,
                produces = MediaType.APPLICATION_JSON_VALUE,
                consumes = MediaType.APPLICATION_JSON_VALUE)
        public void addPublisher(@RequestBody Publisher publisher) {
            if(publisherService.findById(publisher.getId()) != null) {
                LOGGER.warn("Publisher '{}' already in use!", publisher.getPublisherName());
            }
            else {
                LOGGER.warn("Publisher '{}' has been added!", publisher.getPublisherName());
                publisherService.save(publisher);
            }
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
                LOGGER.info("publisher '" + publisher.getPublisherName() + "' has been update");
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
