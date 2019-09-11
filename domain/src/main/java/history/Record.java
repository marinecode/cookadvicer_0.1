package history;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table( name = "history")
public class Record {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    long id;

    Date prepDate;

    String recipeName;

    @PrePersist
    private void setDate(){
        this.prepDate = new Date();
    }
}
