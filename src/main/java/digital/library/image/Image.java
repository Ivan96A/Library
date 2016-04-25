package digital.library.image;

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

    @Column(name = "image", length = 3000000)
    private String image;

    public Image() {

    }

    public Image(String image) {
        this.image = image;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
