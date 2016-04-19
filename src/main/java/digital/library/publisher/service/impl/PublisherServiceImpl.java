package digital.library.publisher.service.impl;

import digital.library.publisher.domain.Publisher;
import digital.library.publisher.repository.PublisherRepository;
import digital.library.publisher.service.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

/**
 * Created by Iwan on 11.03.2016.
 */

@Component("publisherService")
public class PublisherServiceImpl implements PublisherService {

    @Autowired
    private PublisherRepository publisherRepository;

    @Override
    public Page<Publisher> getAll(Pageable pageable) {
        return publisherRepository.findAll(pageable);
    }

    @Override
    public Publisher findById(Long id) {
        return publisherRepository.findOne(id);
    }

    @Override
    public void save(Publisher publisher) {
       publisherRepository.save(publisher);
    }

    @Override
    public void delete(Publisher publisher) {
        publisherRepository.delete(publisher);
    }
}
