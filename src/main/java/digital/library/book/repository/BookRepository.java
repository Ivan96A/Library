package digital.library.book.repository;

import digital.library.book.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Iwan on 11.03.2016.
 */
public interface BookRepository extends JpaRepository<Book, Long>{

}
