package digital.library.configuration;

import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

import javax.sql.DataSource;

/**
 * Created by Iwan on 22.03.2016.
 */
@Configuration
@Profile("dev")
public class H2Configuration implements ApplicationListener<ContextRefreshedEvent>{

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        new EmbeddedDatabaseBuilder()
                .setType(EmbeddedDatabaseType.H2)
                .addScript("database_init.sql")
                .build();
    }
}
