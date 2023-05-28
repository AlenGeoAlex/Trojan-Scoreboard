package me.alenalex.model;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;
import lombok.Getter;
import me.alenalex.db.dao.AdminDao;

import java.util.UUID;

@Getter
@DatabaseTable(tableName = "users", daoClass = AdminDao.class)
public class AdminUser {

    public AdminUser() {
    }

    public AdminUser(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @DatabaseField(generatedId = true)
    private UUID id;

    @DatabaseField
    private String username;

    @DatabaseField
    private String password;

}
