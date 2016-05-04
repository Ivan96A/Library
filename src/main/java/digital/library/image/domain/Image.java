package digital.library.image.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * Created by Iwan on 20.04.2016.
 */
@Entity
@Table(name = "images")
public class Image {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @JsonIgnore
    @Column(name = "image", length = 3000000)
    private String imageString;

    public Image() {

    }

    public Image(String imageString) {
        this.imageString = imageString;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageString() {
        return imageString;
    }

    public void setImageString(String imageString) {
        this.imageString = imageString;
    }

}
