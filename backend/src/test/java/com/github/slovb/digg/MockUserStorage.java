package com.github.slovb.digg;

import com.github.slovb.digg.user.User;
import com.github.slovb.digg.user.UserStorage;

import io.quarkus.test.Mock;
import jakarta.inject.Singleton;

/**
 * Mock implementation of UserStorage that comes with its own test data.
 */
@Mock
@Singleton
public class MockUserStorage extends UserStorage {

	public MockUserStorage() {
		super();
		this.clear(); // I want to test loading the initial data, but I do not want to test depending on it
		put(new User("Kajsa Anka", "Vägen 13, 6742143 Staden", "kajsa@acme.org", "555-55532"));
		put(new User("Kalle Anka", "Vägen 13, 6742143 Staden", "kalle@acme.org", "555-55512"));
		put(new User("Knatte Anka", "Vägen 13, 6742143 Staden", "knatte@acme.org", "555-55565"));
		put(new User("Lasse Ludd", "Hittepåvägen 13, 6742143 Staden", "tomas@acme.org", "555-21343"));
	}
}
