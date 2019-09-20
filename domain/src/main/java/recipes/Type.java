package recipes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor( access = AccessLevel.PRIVATE )
@Table( name = "types" )
public class Type {

    @Id
    @Column( name = "type_name" )
    private String name;

    @JsonIgnore
    private String creator;
}
