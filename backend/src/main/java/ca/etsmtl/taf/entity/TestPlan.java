package ca.etsmtl.taf.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;
import lombok.Setter;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@Table(name = "t_test_plan")
public class TestPlan {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private Project project; //plusieurs projets possibles.
    
    private String name;
    
    private String description;
    
    @ManyToOne
    private TestUser responsable;
	
	@Column(name = "created_date", nullable = false, updatable = false)
    @CreatedDate
    private Date createdDate;
	
	@Column(name = "created_by")
    @CreatedBy
    private String createdBy;
	
	// Statut : Pourcentage Succèes, Échec...
	// Priorité ?
}
