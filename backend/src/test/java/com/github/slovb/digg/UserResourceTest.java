package com.github.slovb.digg;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.hamcrest.MatcherAssert.assertThat;

import java.util.List;
import java.util.Map;

import org.apache.http.HttpStatus;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import com.github.slovb.digg.user.UserResource;

import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.common.mapper.TypeRef;
import io.restassured.http.ContentType;

/**
 * Tests for UserResource.
 *
 * Note that MockUserStorage adds test data to the system so there is some data already there. This is relevant context
 * for some of the tests.
 */
@QuarkusTest
@TestHTTPEndpoint(UserResource.class)
public class UserResourceTest {

	@Test
	@DisplayName("GET, expect JSON")
	@Tag("GET")
	public void	testGetIsJSON() {
		given().
		when().
			get().
		then().
			assertThat().
			statusCode(HttpStatus.SC_OK).
			and().
			contentType(ContentType.JSON);
	}

	@Test
	@DisplayName("GET, expect 3 entries having names ending with \" Anka\"")
	@Tag("GET")
	public void	testGetHasThreeDucks() {
		List<Map<String, Object>> users = get().as(new TypeRef<List<Map<String, Object>>>() {});
		int ducks = 0;
		for (Map<String, Object> user: users) {
			String name = (String) user.get("name");
			if (name.endsWith(" Anka")) {
				ducks += 1;
			}
		}
		assertThat(ducks, equalTo(3));	
	}

	@Test
	@DisplayName("GET/key, expect to find entry")
	@Tag("GET")
	public void testGetSpecific() {
		// Get a key and and make sure that item can be gotten
		// Maybe should inject the userStorage and get the id locally
		List<Map<String, Object>> users = get().as(new TypeRef<List<Map<String, Object>>>() {});
		String key = (String) users.get(0).get("uuid");
		given().
		when().
			get(key).
		then().
			assertThat().
			statusCode(HttpStatus.SC_OK).
			and().
			body("uuid", equalTo(key));
	}

	@Test
	@DisplayName("POST, expect CREATED")
	@Tag("POST")
	public void testCanAddUser() {
		String json = """
			{
				"name": "Kurre Knös",
				"address": "Svartskogen 1, 1819 Calisota",
				"email": "kurre@quack.duck",
				"telephone": "555-10003"
			}""";
		given().
			accept(ContentType.JSON).
			contentType(ContentType.JSON).
			body(json).
		when().
			post().
		then().
			assertThat().
			statusCode(HttpStatus.SC_CREATED);
	}

	@Test
	@DisplayName("PUT, expect CREATED, then OK")
	@Tag("PUT")
	public void testCanPutUser() {
		String json = """
			{
				"name": "Kompis Knös",
				"address": "Svartskogen 2, 2819 Calisota",
				"email": "kompis@quack.duck",
				"telephone": "555-10017",
				"uuid": "1-2-3-4"
			}""";
		// CREATE
		given().
			accept(ContentType.JSON).
			contentType(ContentType.JSON).
			body(json).
		when().
			put("1-2-3-4").
		then().
			assertThat().
			statusCode(HttpStatus.SC_CREATED);

		// UPDATE
		given().
			accept(ContentType.JSON).
			contentType(ContentType.JSON).
			body(json).
		when().
			put("1-2-3-4").
		then().
			assertThat().
			statusCode(HttpStatus.SC_OK);
	}

	@Test
	@DisplayName("DELETE/key, expect OK and deleted")
	@Tag("DELETE")
	public void testDeleteSpecific() {
		// Get a key and and make sure that item can be gotten
		// Maybe should inject the userStorage and get the id locally
		List<Map<String, Object>> users = get().as(new TypeRef<List<Map<String, Object>>>() {});
		String key = null;
		for (Map<String, Object> user: users) {
			String name = (String) user.get("name");
			if (!name.endsWith(" Anka")) {
				// Make sure to not delete an ..." Anka"
				key = (String) user.get("uuid");
				break;
			}
		}
		assertNotNull(key);
		if (key != null) {
			given().
			when().
				delete(key).
			then().
				assertThat().
				statusCode(HttpStatus.SC_OK);

			when().
				get(key).
			then().
				assertThat().
				statusCode(HttpStatus.SC_NOT_FOUND);
		}
	}

	@Test
	@DisplayName("POST malformed, expect BAD REQUEST")
	@Tag("POST")
	public void testCanNotPostNonsense() {
		String json = "jPe&BEtaa";
		given().
			accept(ContentType.JSON).
			contentType(ContentType.JSON).
			body(json).
		when().
			post().
		then().
			assertThat().
			statusCode(HttpStatus.SC_BAD_REQUEST);
	}

	@Test
	@DisplayName("POST missing telephone, expect BAD REQUEST")
	@Tag("POST")
	public void testCanNotPostIncompleteEntry() {
		String json = """
			{
				"name": "Dunhilde O'Rapp",
				"address": "Irland",
				"email": "dunhilde@quack.duck"
			}""";
		given().
			accept(ContentType.JSON).
			contentType(ContentType.JSON).
			body(json).
		when().
			post().
		then().
			assertThat().
			statusCode(HttpStatus.SC_BAD_REQUEST);
	}

	@Test
	@DisplayName("POST same user twice, expect OK and then FORBIDDEN")
	@Tag("POST")
	public void testCanNotAddDuplicates() {
		// Side note, not sure if it is a good idea to let the user set uuid, but they already can due to PUT
		String json ="""
			{
				"name": "Folke Fiskmås",
				"address": "Hemlös",
				"email": "folke@caw.gull",
				"telephone": "555-55000",
				"uuid": "abc"
			}""";
		// Add the user once, should be allowed
		given().
			accept(ContentType.JSON).
			contentType(ContentType.JSON).
			body(json).
		when().
			post().
		then().
			assertThat().
			statusCode(HttpStatus.SC_CREATED);

		// Add the user another time, should not be allowed
		given().
			accept(ContentType.JSON).
			contentType(ContentType.JSON).
			body(json).
		when().
			post().
		then().
			assertThat().
			statusCode(HttpStatus.SC_FORBIDDEN);
	}
}
