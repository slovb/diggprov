package com.github.slovb;

public class User {
	public String name;
	public String address;
	public String email;
	public String telephone;
	
	public User() {
	}
	
	public User(String name, String address, String email, String telephone) {
		this.name = name;
		this.address = address;
		this.email = email;
		this.telephone = telephone;
	}
	
	public String getKey() {
		// TODO: Consider UUID
		// TODO: Motivate
		return email;
	}

	public boolean isValid() {
		// TODO: Motivate
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
