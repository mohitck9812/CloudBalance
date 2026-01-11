package com.cloudBalance.backend.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

//@Configuration
@ConditionalOnProperty(
        name = "snowflake.enabled",
        havingValue = "true",
        matchIfMissing = true
)
public class SnowflakeConfig {


    @Bean(name = "snowflakeDataSource")
    public DataSource snowflakeDataSource(
            @Value("${snowflake.url}") String url,
            @Value("${snowflake.username}") String username,
            @Value("${snowflake.password}") String password,
            @Value("${snowflake.warehouse}") String warehouse
    ) {
        HikariDataSource ds = new HikariDataSource();
        ds.setJdbcUrl(url + "?warehouse=" + warehouse);
        ds.setUsername(username);
        ds.setPassword(password);
        ds.setDriverClassName("net.snowflake.client.jdbc.SnowflakeDriver");
        return ds;
    }

    @Bean(name = "snowflakeJdbcTemplate")
    public JdbcTemplate snowflakeJdbcTemplate(
            @Qualifier("snowflakeDataSource") DataSource ds
    ) {
        return new JdbcTemplate(ds);
    }
}
