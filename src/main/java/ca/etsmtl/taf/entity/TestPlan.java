package ca.etsmtl.taf.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "t_test_plan")
public class TestPlan {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    
    private Project project;
    private String name;
    private String description;
    private User responsable;
    private Date creationDate;
    private User createdBy;
	
	// Statut : Pourcentage Succèes, Échec...
	// Priorité ?
}
