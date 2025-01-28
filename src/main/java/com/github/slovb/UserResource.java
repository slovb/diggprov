package com.github.slovb;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;

/**
 * Resource class for a collection of users.
 */
@Path("digg/user")	// use of singular is due to the examples in the given task, I find pluralizing more uniform.
public class UserResource {

	/**
	 * Map of <code>user.getKey()</code> to user.
	 * 
	 * Uses a HashMap for easy lookup to avoid duplicates and enable specified changes.
	 */
	private Map<String, User> users = new HashMap<String, User>();

	/**
	 * Sole constructor. (For invocation by the framework.)
	 */
	public UserResource() {
		// TODO: Move this test data to the test preprocessor
		putUser(new User("Kajsa Anka", "Vägen 13, 6742143 Staden", "kajsa@acme.org", "555-55532"));
		putUser(new User("Kalle Anka", "Vägen 13, 6742143 Staden", "kalle@acme.org", "555-55512"));
		putUser(new User("Knatte Anka", "Vägen 13, 6742143 Staden", "knatte@acme.org", "555-55565"));
		putUser(new User("Lasse Ludd", "Hittepåvägen 13, 6742143 Staden", "tomas@acme.org", "555-21343"));
	}

	/**
	 * Response to a GET request by listing all the users.
	 *
	 * @return	all of the users.
	 */
	@GET
	public Collection<User> list() {
		/*
		 * Left as simple as possible as future requirements such as sorting or pagination would better
		 * inform any choice of implementation.
		 */
		return users.values();
	}

	/**
	 * Add a user to the collection as a reaction to a POST request.
	 *
	 * The following requirements are put upon a user before it can be added:
	 * - User has to be valid, otherwise a response with status 400 is returned.
	 * - User has to already not be in the list as identified by their key, otherwise a response with status 403 is returned.
	 * - Users key has to be able to form a valid URI, otherwise a response with status 500 is returned. (Should never happen)
	 *
	 * @param user	user to be added to users.
	 * @return a response with either the uri to the added resource or an error status if nothing was added
	 */
	@POST
	public Response add(User user) {
		// Validate the user
		if (!user.isValid()) {
			return Response.status(400, "User is missing critical data").build();
		}

		// Do not allow adding a new user with a key that already exists
		if (users.containsKey(user.getKey())) {
			return Response.status(403, "Similar user already exists").build();
		}

		// Build a URI for the resource
		URI uri;
		try {
			// Once this URI has meaning, a changes might be in order
			uri = new URI(user.getKey());
		} catch (URISyntaxException e) {
			return Response.status(500, "Key is not a valid URI").build();
		}

		// Add the user
		putUser(user);
		return Response.created(uri).build();
	}

	/**
	 * Convenience method for adding a user to users using their <code>getKey</code> as key.
	 *
	 * @param user	user to be added to users.
	 */
	private void putUser(User user) {
		users.put(user.getKey(), user);
	}
}
