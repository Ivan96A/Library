package digital.library.book.repository;

import digital.library.book.domain.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Created by Iwan on 11.03.2016.
 */
public interface BookRepository extends JpaRepository<Book, Long>{

}