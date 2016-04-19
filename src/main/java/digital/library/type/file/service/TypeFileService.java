package digital.library.type.file.service;

import digital.library.type.file.domain.TypeFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Created by Iwan on 11.03.2016.
 */
public interface TypeFileService {

    Page<TypeFile> getAll(Pageable pageable);

    TypeFile findById(Long id);

    void save(TypeFile typeFile);

    void delete(TypeFile typeFile);

}
