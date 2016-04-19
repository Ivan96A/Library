package digital.library.publisher.service;

import digital.library.publisher.domain.Publisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Created by Iwan on 11.03.2016.
 */
public interface PublisherService {

    Page<Publisher> getAll(Pageable pageable);

    Publisher findById(Long id);

    void save(Publisher publisher);

    void delete(Publisher publisher);

}
