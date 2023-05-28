package me.alenalex;

import lombok.Getter;
import me.alenalex.bootstrap.Boot;
import me.alenalex.constants.FlagConstants;
import me.alenalex.db.DbContext;
import me.alenalex.http.HttpJavalin;
import me.alenalex.http.route.LoginRoute;
import me.alenalex.http.route.ResultDataRoute;
import me.alenalex.model.AdminUser;
import org.apache.logging.log4j.Logger;

import java.sql.SQLException;

public class TScoreboardServer {

    @Getter
    private final org.apache.logging.log4j.Logger logger;

    @Getter
    private final DbContext dbContext;

    @Getter
    private final HttpJavalin javalin;

    public TScoreboardServer(Logger logger) {
        this.logger = logger;
        this.getLogger().info("Starting TScoreboard Server");
        this.dbContext = new DbContext(this);
        this.javalin = new HttpJavalin(this);
    }

    public void init(){
        if(!this.dbContext.start()){
            Boot.exit("Failed to initialize database context!");
            return;
        }


        if(!javalin.start()) {
            Boot.exit("Failed to start javalin server");
            return;
        }

        javalin.register(LoginRoute.class);
        javalin.register(ResultDataRoute.class);

    }

    public void stop(){
        this.dbContext.stop();
        this.javalin.stop();
    }


}
