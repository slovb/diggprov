package com.github.slovb.digg.user;

import java.util.UUID;

/**
 * Choices:
 *
 * 1. Use of UUID:
 * 	  I needed a key for the frontend and backend to talk about specific items, mostly for GET/key, PUT/key, DELETE/key.
 *    UUIDs are seemingly becoming a standard for these task so I wanted to try using it in a sample system.
 *
 * 2. Validate function:
 *    I think it makes sense that the object itself should have the most context for validation. That said I did not
 *    spend time writing anything realistic, but just checking that there is some data.
 */

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
	 * Setting all the attributes except UUID
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
	 * Setting all the attributes
	 *
	 * @param name
	 * @param address
	 * @param email
	 * @param telephone
	 * @param uuid
	 */
	public User(String name, String address, String email, String telephone, String uuid) {
		this.name = name;
		this.address = address;
		this.email = email;
		this.telephone = telephone;
		this.uuid = uuid;
	}


	/**
	 * Returns a key that uniquely identifies the user.
	 * Currently that is an uuid that is generated upon creation
	 *
	 * @return	a string that uniquely identifies a user.
	 */
	public String key() {
		return uuid;
	}

	/**
	 * Does this user contain valid data?
	 * Valid in the current context means all fields are not null or blank.
	 *
	 * @return	<code>true</code> if this user is valid.
	 */
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
		if (uuid == null || uuid.isBlank()) {
			return false;
		}
		return true;
	}
}
