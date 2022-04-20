package ca.etsmtl.taf.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "t_test_case")
public class TestCase {
	// Test Plan
	// nom
	// Description
	// Création : Date & Auteur.
	// Priorité ?
	// Statut : En cours, Succès, Échec, Pas commencé.

}
