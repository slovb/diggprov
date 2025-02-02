package com.github.slovb.digg.health;

import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.health.Liveness;

import jakarta.enterprise.context.ApplicationScoped;

@Liveness
@ApplicationScoped
public class LivenessHealthCheck implements HealthCheck {

	@Override
	public HealthCheckResponse call() {
		// I need to research health checks. As far as I saw I may not use dependency injection which makes this tricky
		return HealthCheckResponse.up("Liveness health check");
	}
}
