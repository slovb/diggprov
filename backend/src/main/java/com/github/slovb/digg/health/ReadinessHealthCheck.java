package com.github.slovb.digg.health;

import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.health.Readiness;

import jakarta.enterprise.context.ApplicationScoped;

@Readiness
@ApplicationScoped
public class ReadinessHealthCheck implements HealthCheck {

	@Override
	public HealthCheckResponse call() {
		// I need to research health checks. As far as I saw I may not use dependency injection which makes this tricky
		return HealthCheckResponse.up("Readiness health check");
	}
}
