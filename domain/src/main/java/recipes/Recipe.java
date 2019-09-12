package recipes;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor( access = AccessLevel.PRIVATE )
@Table( name = "recipes" )
public class Recipe {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String description;
    private short rating;
    private String type;
    private Date lastPrep;

    @ManyToMany
    @JoinTable( name = "recipe_ingredients")
    private List<Ingredient> ingredients;
}
