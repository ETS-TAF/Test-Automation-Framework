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
@Table(name = "t_test_step")
public class TestStep {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private TestCase testCase;
    private String name;
    private String description;
    private Date creationDate;
    private User createdBy;
    
	// Statut : En cours, Succès, Échec, Pas commencé.

}
