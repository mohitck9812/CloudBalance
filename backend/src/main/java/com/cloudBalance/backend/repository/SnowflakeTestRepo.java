//package com.cloudBalance.backend.repository;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.stereotype.Repository;
//
//@Repository
//public class SnowflakeTestRepo {
//
//    @Autowired
//    @Qualifier("snowflakeJdbcTemplate")
//    private JdbcTemplate jdbc;
//
//    public String test() {
//        return jdbc.queryForObject("SELECT CURRENT_VERSION()", String.class);
//    }
//}
//
