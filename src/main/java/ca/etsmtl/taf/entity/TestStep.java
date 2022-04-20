package ca.etsmtl.taf.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "t_test_step")
public class TestStep {
	// Test Case
	// nom
	// Description
	// Création : Date & Auteur.
	// Statut : En cours, Succès, Échec, Pas commencé.

}
