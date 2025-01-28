package com.github.slovb;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

import static org.hamcrest.MatcherAssert.assertThat;

import java.util.List;
import java.util.Map;

import org.apache.http.HttpStatus;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;


import io.quarkus.test.junit.QuarkusTest;
import io.restassured.common.mapper.TypeRef;
import io.restassured.http.ContentType;

@QuarkusTest
public class UserResourceTest {
	
	public final String URL = "/digg/user";
	
	@BeforeAll
	public static void setup() {
		// TODO: Insert test data
	}
	
	@AfterAll
	public static void cleanup() {
		// TODO: Remove test data
	}
	
	@Test
	@DisplayName("GET, expect JSON")
	@Tag("GET")
	public void	testGetIsJSON() {
		given().
		when().
			get(URL).
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
		List<Map<String, Object>> users = get(URL).as(new TypeRef<List<Map<String, Object>>>() {});
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
			post(URL).
		then().
			assertThat().
			statusCode(HttpStatus.SC_CREATED);
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
			post(URL).
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
			post(URL).
		then().
			assertThat().
			statusCode(HttpStatus.SC_BAD_REQUEST);
	}
	
	@Test
	@DisplayName("POST same user twice, expect OK and then FORBIDDEN")
	@Tag("POST")
	public void testCanNotAddDuplicates() {
		String json ="""
			{
				"name": "Folke Fiskmås",
				"address": "Hemlös",
				"email": "folke@caw.gull",
				"telephone": "555-55000"
			}""";
		// Lägg till användaren, bör vara tillåtet en gång
		given().
			accept(ContentType.JSON).
			contentType(ContentType.JSON).
			body(json).
		when().
			post(URL).
		then().
			assertThat().
			statusCode(HttpStatus.SC_CREATED);
		
		// Lägg till igen, bör inte vara tillåtet då den redan existerar
		given().
			accept(ContentType.JSON).
			contentType(ContentType.JSON).
			body(json).
		when().
			post(URL).
		then().
			assertThat().
			statusCode(HttpStatus.SC_FORBIDDEN);
	}
}
