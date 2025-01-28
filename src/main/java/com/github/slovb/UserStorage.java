package com.github.slovb;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import jakarta.inject.Singleton;

/**
 * Storage class for all of the users.
 *
 * Stores the users in memory with no persistence. Is a singleton 
 *
 * Written using composition instead of inheritance to limit the interface and make implementation details more mutable.
 */
@Singleton
public class UserStorage {

	/**
	 * Map of <code>user.getKey()</code> to user.
	 *
	 * Uses a HashMap for easy lookup to avoid duplicates and enable specified changes.
	 * Set to package-private to avoid reflection on injection.
	 */
	Map<String, User> users = new HashMap<String, User>();

	/**
	 * Returns a collection of the values contained in this storage.
	 *
	 * @return	a collection of the values contained in this storage
	 */
	public Collection<User> list() {
		/*
		 * Left as simple as possible as future requirements such as sorting or pagination would better
		 * inform any choice of implementation.
		 */
		return users.values();
	}

	/**
	 * Returns <code>true</code> if this storage contains a user with the given key.
	 *
	 * @param key	key whose presence in this storage is to be tested
	 * @return		<code>true</code> if this storage contains a user with the given key
	 */
	public boolean containsKey(String key) {
		return users.containsKey(key);
	}

	/**
	 * Will put a user in storage at its specified key.
	 *
	 * If there already is a user with that key it will get overwritten.
	 *
	 * @param user	the user to be put at its key
	 * @return		the user that was put at its key
	 */
	public User put(User user) {
		// Quarkus blog seem to state I do not need to worry about threads, so I'll defer that to a later time.
		return users.put(user.getKey(), user);
	}
}
