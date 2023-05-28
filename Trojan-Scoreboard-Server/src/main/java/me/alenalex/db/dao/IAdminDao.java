package me.alenalex.db.dao;

import me.alenalex.model.AdminUser;

import java.util.Optional;
import java.util.concurrent.CompletableFuture;

public interface IAdminDao {

    CompletableFuture<Optional<AdminUser>> ofUser(String username, String password);

    Optional<AdminUser> isPresent(String uuid);

}
