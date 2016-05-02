package digital.library.publisher.repository;

import digital.library.publisher.domain.Publisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Created by Iwan on 11.03.2016.
 */
public interface PublisherRepository extends JpaRepository<Publisher, Long> {

    @Query("select p from Publisher p where upper(p.name) like upper(:name) ")
    Page<Publisher> findByName(Pageable pageable, @Param("name") String name);
}
