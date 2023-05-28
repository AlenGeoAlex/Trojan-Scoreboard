package me.alenalex.db;

import com.j256.ormlite.dao.Dao;
import com.j256.ormlite.dao.DaoManager;
import com.j256.ormlite.jdbc.JdbcPooledConnectionSource;
import com.j256.ormlite.support.ConnectionSource;
import com.j256.ormlite.table.TableUtils;
import lombok.Getter;
import me.alenalex.TScoreboardServer;
import me.alenalex.db.dao.AdminDao;
import me.alenalex.db.dao.IAdminDao;
import me.alenalex.db.dao.ResultDao;
import me.alenalex.model.AdminUser;
import me.alenalex.model.Results;

import java.util.UUID;

public final class DbContext implements AutoCloseable{

    private final TScoreboardServer server;

    private ConnectionSource connectionSource;

    @Getter
    private AdminDao adminUsers;

    @Getter
    private ResultDao results;


    public DbContext(TScoreboardServer server) {
        this.server = server;
    }

    public boolean start(){
        try {
            this.connectionSource = new JdbcPooledConnectionSource("jdbc:mysql://u6_mgC80IJels:71qhJ%3DY5mai%5E%2B7x%5EFadyh1M%5E@server.alenalex.me:3306/s6_trojan_scoreboard");
            TableUtils.createTableIfNotExists(this.connectionSource, AdminUser.class);
            TableUtils.createTableIfNotExists(this.connectionSource, Results.class);

            this.adminUsers = DaoManager.createDao(this.connectionSource, AdminUser.class);
            this.results = DaoManager.createDao(this.connectionSource, Results.class);
            this.server.getLogger().info("Database has been started!");
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    public void stop(){
        try {
            if(this.connectionSource != null)
                this.connectionSource.close();

            this.server.getLogger().info("Database has been stopped!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void close() throws Exception {
        this.stop();
    }
}
