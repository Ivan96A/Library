package digital.library.author.repository;

import digital.library.author.domain.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Created by Iwan on 11.03.2016.
 */

public interface AuthorsRepository extends JpaRepository<Author, Long> {

    @Query("select a from Author a where a.email = :email")
    Author findByEmail(@Param("email")String email);
}
