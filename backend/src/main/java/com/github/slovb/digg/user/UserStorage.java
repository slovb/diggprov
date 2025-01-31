package com.github.slovb.digg.user;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.inject.Singleton;
import io.quarkus.logging.Log;

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

	public UserStorage() {
		try (InputStream in = getClass().getResourceAsStream("/initial_data.json")) {
			Log.debug("Reading initial_data.json");
			ObjectMapper objectMapper = new ObjectMapper();
			User[] init = objectMapper.readValue(in,  User[].class);
			for (User user: init) {
				put(user);
			}
			Log.info(String.format("%s users added from initial_data.json", init.length));
		}
		catch (IOException e) {
			Log.error("Issue reading initial_data.json", e);
		}
	}
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
	 */
	public void put(User user) {
		// Quarkus blog seem to state I do not need to worry about threads, so I'll defer that to a later time.
		users.put(user.getKey(), user);
	}
	
	/**
	 * Remove all users
	 */
	public void clear() {
		users.clear();
		Log.info("Users map cleared");
	}
}
