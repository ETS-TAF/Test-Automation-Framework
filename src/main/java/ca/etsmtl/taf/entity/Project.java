package ca.etsmtl.taf.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "t_project")
public class Project {
	
	// nom du projet
	// Responsable : User
	// Description
	// Date début, date fin

}
