package com.cloudBalance.backend.enums;


public enum RoleType {
    ADMIN(1L),
    CUSTOMER(2L),
    READ_ONLY(3L);

    private final Long id;


    RoleType(Long id) { this.id = id; }

    public Long getId() { return id; }

    public static RoleType fromId(Long id) {
        if (id == null) return null;
        for (RoleType r : RoleType.values()) {
            if (r.id.equals(id)) return r;
        }
        throw new IllegalArgumentException("Unknown RoleType id: " + id);
    }

    public static RoleType fromName(String name) {
        if (name == null) return null;
        return RoleType.valueOf(name);
    }

}
