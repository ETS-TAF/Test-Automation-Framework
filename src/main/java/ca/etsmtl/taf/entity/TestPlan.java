package ca.etsmtl.taf.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "t_test_plan")
public class TestPlan {
	
	// Projet
	// nom
	// Description
	// Responsable : User
	// Création : Date & Auteur.
	// Statut : Pourcentage Succèes, Échec...
	// Priorité ?
}
