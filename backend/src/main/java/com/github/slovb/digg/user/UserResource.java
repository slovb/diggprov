package com.github.slovb.digg.user;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import io.quarkus.logging.Log;

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
	@Operation(summary="Get all users")
	@APIResponse(responseCode="200", description="A list of users")
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
	@Operation(summary="Add a new user")
	@APIResponses({
		@APIResponse(responseCode="201", description="User added"),
		@APIResponse(responseCode="400", description="User data is not valid"),
		@APIResponse(responseCode="403", description="Similar user already exists")
	})
	@POST
	public Response add(User user) {
		// Validate the user
		if (!user.validate()) {
			return Response.status(400, "User is missing critical data").build();
		}

		// Do not allow adding a new user with a key that already exists
		if (userStorage.containsKey(user.key())) {
			return Response.status(403, "Similar user already exists").build();
		}

		// Build a URI for the resource
		URI uri;
		try {
			uri = new URI("digg/user/" + user.key());
		} catch (URISyntaxException e) {
			Log.error("Key is not a valid URI", e);
			return Response.status(500, "Key is not a valid URI").build();
		}

		// Add the user
		Log.debug("Adding user");
		userStorage.put(user);
		Log.info("User added");
		return Response.created(uri).build();
	}
}
