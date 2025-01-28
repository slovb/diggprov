package com.github.slovb;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;

/**
 * Resource class for all of the users.
 */
@Path("digg/user")
public class UserResource {

	/**
	 * The users.
	 *
	 * Using an <code>Injection</code> partly because looser coupling has numerous benefits, but specifically
	 * for this program it is so that a <code>MockUserStorage</code> can be used for testing purposes.
	 */
	@Inject
	private UserStorage userStorage;

	/**
	 * Response to a GET request by listing all the users.
	 *
	 * @return	a collection of the users of the userStorage
	 */
	@GET
	public Collection<User> list() {
		return userStorage.list();
	}

	/**
	 * Add a user to the collection as a reaction to a POST request.
	 *
	 * The following requirements are put upon a user before it can be added:
	 * - User has to be valid, otherwise a response with status 400 is returned.
	 * - User has to already not be in the list as identified by their key, otherwise return a response with status 403.
	 * - Users key has to be able to form a valid URI, otherwise a response with status 500 is returned.
	 *
	 * @param user	user to be added to userStorage
	 * @return 		a response with either the uri to the added resource or an error status if nothing was added
	 */
	@POST
	public Response add(User user) {
		// Validate the user
		if (!user.isValid()) {
			return Response.status(400, "User is missing critical data").build();
		}

		// Do not allow adding a new user with a key that already exists
		if (userStorage.containsKey(user.getKey())) {
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
		userStorage.put(user);
		return Response.created(uri).build();
	}
}
