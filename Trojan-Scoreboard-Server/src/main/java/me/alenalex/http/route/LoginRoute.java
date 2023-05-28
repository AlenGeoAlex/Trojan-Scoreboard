package me.alenalex.http.route;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import io.javalin.http.HttpStatus;
import me.alenalex.TScoreboardServer;
import me.alenalex.annotations.PublicRoute;
import me.alenalex.annotations.RouteMethod;
import me.alenalex.http.dto.Login;
import me.alenalex.model.AdminUser;
import org.jetbrains.annotations.NotNull;

import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.function.Supplier;

@PublicRoute(routeAddress = "api/authentication/")
public class LoginRoute {

    private final TScoreboardServer server;

    public LoginRoute(TScoreboardServer server) {
        this.server = server;
    }

    @RouteMethod(method = RouteMethod.Method.POST, route = "login")
    public Handler loginHandler(){
        return new Handler() {
            @Override
            public void handle(@NotNull Context context) throws Exception {
                Login.LoginInput o = context.bodyValidator(Login.LoginInput.class).get();
                if(o == null) {
                    context.status(HttpStatus.UNAUTHORIZED);
                    context.result("Incorrect data provided!");
                    return;
                }

                CompletableFuture<Optional<AdminUser>> future = server.getDbContext().getAdminUsers().ofUser(o.username, o.password);
                context.future(new Supplier<CompletableFuture<?>>() {
                    @Override
                    public CompletableFuture<?> get() {
                        return future.whenComplete((optionalUser, err) -> {
                            if(err != null){
                                context.status(HttpStatus.UNAUTHORIZED);
                                context.result(err.getMessage());
                                return;
                            }

                            AdminUser adminUser = optionalUser.orElse(null);
                            if(adminUser == null){
                                context.status(HttpStatus.UNAUTHORIZED);
                                context.result("No user found!");
                                return;
                            }

                            Login.LoginData resp = new Login.LoginData(adminUser.getId().toString());

                            context.json(resp);
                        });
                    }
                });
            }
        };
    }

}
