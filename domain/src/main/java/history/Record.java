package history;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Data
@Table( name = "history")
public class Record {
    @Id
    Date prepData;

    long recipeId;
}
