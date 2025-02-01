package com.github.slovb.digg.user;

import java.util.UUID;

import org.eclipse.microprofile.openapi.annotations.media.Schema;

/**
 * Represents a user.
 *
 * The user is uniquely identified by the uuid field.
 */
public class User {

	/**
	 * The users name.
	 */
	public String name;

	/**
	 * The users address as a single string.
	 */
	public String address;

	/**
	 * The users email.
	 *
	 * Uniquely identifies a user.
	 */
	public String email;

	/**
	 * The users telephone number in string form.
	 */
	public String telephone;

	/**
	 * The users UUID in String form
	 */
	public final String uuid;

	/**
	 * Default constructor. Required for JSON serialization.
	 */
	public User() {
		uuid = UUID.randomUUID().toString();
	}
	
	/**
	 * Convenience constructor setting all the attributes.
	 *
	 * @param name
	 * @param address
	 * @param email
	 * @param telephone
	 */
	public User(String name, String address, String email, String telephone) {
		this();
		this.name = name;
		this.address = address;
		this.email = email;
		this.telephone = telephone;
	}
	

	/**
	 * Returns a key that uniquely identifies the user.
	 * Currently that is an uuid that is generated upon creation
	 *
	 * @return	a string that uniquely identifies a user.
	 */
	@Schema(hidden=true)
	public String key() {
		return uuid;
	}

	/**
	 * Does this user contain valid data?
	 * Valid in the current context means all fields are not null or blank.
	 *
	 * @return	<code>true</code> if this user is valid.
	 */
	@Schema(hidden=true)
	public boolean validate() {
		if (name == null || name.isBlank()) {
			return false;
		}
		if (address == null || address.isBlank()) {
			return false;
		}
		if (email == null || email.isBlank()) {
			return false;
		}
		if (telephone == null || telephone.isBlank()) {
			return false;
		}
		return true;
	}
}
