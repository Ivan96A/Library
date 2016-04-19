package digital.library.publisher.repository;

import digital.library.publisher.domain.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Iwan on 11.03.2016.
 */
public interface PublisherRepository extends JpaRepository<Publisher, Long> {

}
