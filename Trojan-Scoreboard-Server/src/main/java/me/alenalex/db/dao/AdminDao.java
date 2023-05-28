package me.alenalex.db.dao;

import com.j256.ormlite.dao.BaseDaoImpl;
import com.j256.ormlite.support.ConnectionSource;
import com.j256.ormlite.table.DatabaseTableConfig;
import me.alenalex.model.AdminUser;

import java.sql.SQLException;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.function.Supplier;

public class AdminDao extends BaseDaoImpl<AdminUser, UUID> implements IAdminDao {
    public AdminDao(Class<AdminUser> dataClass) throws SQLException {
        super(dataClass);
    }

    public AdminDao(ConnectionSource connectionSource, Class<AdminUser> dataClass) throws SQLException {
        super(connectionSource, dataClass);
    }

    public AdminDao(ConnectionSource connectionSource, DatabaseTableConfig<AdminUser> tableConfig) throws SQLException {
        super(connectionSource, tableConfig);
    }


    @Override
    public CompletableFuture<Optional<AdminUser>> ofUser(String username, String password) {
        return CompletableFuture.supplyAsync(new Supplier<Optional<AdminUser>>() {
            @Override
            public Optional<AdminUser> get() {
                try {

                    AdminUser adminUser = AdminDao.super.queryBuilder()
                            .where()
                            .eq("username", username)
                            .and()
                            .eq("password", password)
                            .queryForFirst();


                    return Optional.ofNullable(adminUser);
                }catch (Exception ignored){
                    return Optional.empty();
                }
            }
        });
    }

    @Override
    public Optional<AdminUser> isPresent(String uuid) {
        try {
            return Optional.ofNullable(AdminDao.super.queryBuilder()
                    .where()
                    .eq("id", UUID.fromString(uuid))
                    .queryForFirst());
        } catch (SQLException e) {
            return Optional.empty();
        }
    }
}
