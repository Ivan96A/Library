package digital.library.type.file.controller;

import digital.library.type.file.domain.TypeFile;
import digital.library.type.file.service.TypeFileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Iwan on 05.04.2016.
 */

@RestController
@RequestMapping("/typeFile")
public class TypeFileController {

    private static final Logger LOGGER = LoggerFactory.getLogger(TypeFileController.class);

    @Autowired
    @Qualifier("typeFileService")
    private TypeFileService typeFileService;

    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Page<TypeFile> getAllTypeFile(Pageable pageable) {
        Page<TypeFile> page = typeFileService.getAll(pageable);
        return page;
    }

    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addTypeFile(@RequestBody TypeFile typeFile) {
        if (typeFileService.findById(typeFile.getId()) != null) {
            LOGGER.warn("TypeFile '{}' already in use!", typeFile.getId());
        } else {
            LOGGER.warn("TypeFile '{}' has been added!", typeFile.getId());
            typeFileService.save(typeFile);
        }
    }

    @RequestMapping(
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateTypeFile(@RequestBody TypeFile typeFile) {
        TypeFile existingTypeFile = typeFileService.findById(typeFile.getId());
        if(existingTypeFile != null && !existingTypeFile.getId().equals(typeFile.getId())) {
            LOGGER.warn("error updating ");
        } else {
            typeFileService.save(typeFile);
            LOGGER.info("typeFile '" + typeFile.getId() + "' has been update");
        }
    }

    @RequestMapping(
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteTypeFile(@PathVariable("id") Long id) {
        TypeFile typeFile = typeFileService.findById(id);
        typeFileService.delete(typeFile);
    }

}
