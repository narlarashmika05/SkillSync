package com.skillsync.security;

import com.skillsync.exception.OwnershipException;
import org.springframework.security.core.Authentication;

public final class AccessGuard {

    private AccessGuard() {
    }

    // Rejects requests for another user's data (path emails must match the JWT subject).
    public static void requireSelf(String email, Authentication authentication) {
        if (email == null || !email.equalsIgnoreCase(authentication.getName())) {
            throw new OwnershipException("You do not have permission to access this user's data.");
        }
    }
}
