package digital.library.type.file.service.impl;

import digital.library.type.file.domain.TypeFile;
import digital.library.type.file.repository.TypeFileRepository;
import digital.library.type.file.service.TypeFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

/**
 * Created by Iwan on 11.03.2016.
 */

@Component("typeFileService")
public class TypeFileServiceImpl implements TypeFileService {

    @Autowired
    TypeFileRepository typeFileRepository;

    @Override
    public Page<TypeFile> getAll(Pageable pageable) {
        return typeFileRepository.findAll(pageable);
    }

    @Override
    public TypeFile findById(Long id) {
        return typeFileRepository.findOne(id);
    }

    @Override
    public void save(TypeFile typeFile) {
        typeFileRepository.save(typeFile);
    }

    @Override
    public void delete(TypeFile typeFile) {
        typeFileRepository.delete(typeFile);
    }
}
