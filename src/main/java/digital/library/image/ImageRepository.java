package digital.library.image;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Iwan on 22.04.2016.
 */
public interface ImageRepository extends JpaRepository<Image, Long> {
}
