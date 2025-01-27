package com.github.slovb;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("digg/user")
public class UserResource {
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String user() {
		return """
[
	{"name":"Kajsa Anka","address":"Vägen 13, 6742143 Staden","email":"kajsa@acme.org","telephone":"555-55532"},
	{"name":"Kalle Anka","address":"Vägen 13, 6742143 Staden","email":"kalle@acme.org","telephone":"555-55512"},
	{"name":"Knatte Anka","address":"Vägen 13, 6742143 Staden","email":"knatte@acme.org","telephone":"555-55565"},
	{"name":"Lasse Ludd","address":"Hittepåvägen 13, 6742143 Staden","email":"tomas@acme.org","telephone":"555-21343"}]""";
	}
}
