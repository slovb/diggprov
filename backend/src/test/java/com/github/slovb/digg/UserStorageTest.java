package com.github.slovb.digg;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import com.github.slovb.digg.user.User;
import com.github.slovb.digg.user.UserStorage;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;

/**
 * Unit tests for the {@link com.github.slovb.digg.user.UserStorage}.
 */
@QuarkusTest
public class UserStorageTest {

	@Inject
	UserStorage userStorage;

	@Test
	@DisplayName("Expect 3 entries having names ending with \" Anka\"")
	@Tag("LOCAL")
	public void testLocalHasThreeDucks() {
		int ducks = 0;
		for (User user: userStorage.list()) {
			if (user.name.endsWith(" Anka")) {
				ducks += 1;
			}
		}
		assertEquals(3, ducks);
	}
	
	@Test
	@DisplayName("Expect able to add a user")
	@Tag("LOCAL")
	public void testLocalAddingDoesNotChangeKey() {
		User user = new User("Åke", "Åkes Oas, Öknen", "ake@lemo.nad", "11000101");
		assertFalse(userStorage.containsKey(user.key()));
		userStorage.put(user);
		assertTrue(userStorage.containsKey(user.key()));
	}
}
