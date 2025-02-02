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
 * Choices:
 *
 * 1. UserStorage is a Singleton:
 *    I do not think it matters too much in this specific program, but in general this would be a shared resource with
 *    only one collection of data in memory.
 *
 * 2. Use of HashMap:
 *    I wanted a map for easy lookup. This is the simplest one. I tried to search out if I needed to be thread safe,
 *    but a reasonably official blog said to just trust Quarkus for this. When I have the time I will research the truth
 *    of this as I want to understand why.
 *
 * 3. Loading all the initial data in the constructor:
 *    This is me going for the simple solution for this task as any deferring of it gives me testing terrors I do not
 *    want to resolve for this task.
 *
 * 4. Not doing any sorting:
 *    I had the need to sort the data in the frontend as it is only fetching all of the users on the initial page load
 *    and for any additions or changes it just fetches the affected users data and resorts the list. Hence it was
 *    simpler to just handle all of that in the frontend. That said I think it would make for easier page loads in
 *    the frontend if list was sorted and the frontend knew.
 */

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
	 * Map of <code>user.key()</code> to user.
	 *
	 * Uses a HashMap for easy lookup to avoid duplicates and enable specified changes.
	 * Set to package-private to avoid reflection on injection.
	 */
	Map<String, User> users = new HashMap<String, User>();

	/**
	 * Read the initial_data.json resource and populate users with that data.
	 */
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
	 * Returns the user with the given key, or <code>null</code> if no such user can be found
	 *
	 * @param key the key of the user
	 * @return the user
	 */
	public User get(String key) {
		return users.get(key);
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
		users.put(user.key(), user);
	}
	
	/**
	 * Remove user represented by key if present
	 *
	 * @param key key of user to remove
	 */
	public void removeKey(String key) {
		users.remove(key);
	}

	/**
	 * Remove all users
	 */
	public void clear() {
		users.clear();
		Log.info("Users map cleared");
	}
}
