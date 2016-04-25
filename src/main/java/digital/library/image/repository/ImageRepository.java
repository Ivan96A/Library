package digital.library.image.repository;

import digital.library.image.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Iwan on 22.04.2016.
 */
public interface ImageRepository extends JpaRepository<Image, Long> {
}
