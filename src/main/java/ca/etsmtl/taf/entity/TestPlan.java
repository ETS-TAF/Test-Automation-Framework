package ca.etsmtl.taf.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;

import lombok.Getter;
import lombok.Setter;

@Entity
@Audited
@Getter
@Setter
@Table(name = "t_test_plan")
public class TestPlan {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private Project project;
    
    private String name;
    
    private String description;
    
    @ManyToOne
    @NotAudited
    private TestUser responsable;
	
	// Statut : Pourcentage Succèes, Échec...
	// Priorité ?
}
