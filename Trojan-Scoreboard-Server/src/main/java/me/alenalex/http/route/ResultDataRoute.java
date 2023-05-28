package me.alenalex.http.route;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import io.javalin.http.HttpStatus;
import me.alenalex.TScoreboardServer;
import me.alenalex.annotations.PublicRoute;
import me.alenalex.annotations.RouteMethod;
import me.alenalex.http.dto.DataDto;
import me.alenalex.model.AdminUser;
import me.alenalex.model.Results;
import me.alenalex.model.Teams;
import org.apache.commons.lang3.StringUtils;
import org.jetbrains.annotations.NotNull;

import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.function.Supplier;

@PublicRoute(routeAddress = "api/result/")
public class ResultDataRoute {

    private final TScoreboardServer server;

    public ResultDataRoute(TScoreboardServer server) {
        this.server = server;
    }

    @RouteMethod(method = RouteMethod.Method.POST, route = "")
    public Handler createNewResult(){
        return new Handler() {
            @Override
            public void handle(@NotNull Context context) throws Exception {
                String authorization = context.header("Authorization");


                if(StringUtils.isBlank(authorization)){
                    context.status(HttpStatus.UNAUTHORIZED);
                    return;
                }

                Optional<AdminUser> present = server.getDbContext().getAdminUsers().isPresent(authorization);
                if(present.isEmpty()){
                    context.status(HttpStatus.UNAUTHORIZED);
                    return;
                }

                AdminUser adminUser = present.get();

                DataDto.FormData formData = context.bodyValidator(DataDto.FormData.class).get();
                if(formData == null){
                    context.status(HttpStatus.BAD_REQUEST);
                    return;
                }

                Results results = Results.fromFormData(formData);
                if(results == null){
                    context.status(HttpStatus.BAD_REQUEST);
                    return;
                }
                server.getLogger().info("Created new results of "+results.toString()+" from "+adminUser.getUsername());
                server.getDbContext().getResults().create(results);
                context.status(200);
            }
        };
    }

    @RouteMethod(route = "chart")
    public Handler getChart(){
        return new Handler() {
            @Override
            public void handle(@NotNull Context context) throws Exception {
                context.future(new Supplier<CompletableFuture<?>>() {
                    @Override
                    public CompletableFuture<?> get() {
                        return server.getDbContext().getResults().getScores().whenComplete((chart, err) -> {
                            if(err != null){
                                err.printStackTrace();
                                return;
                            }

                            context.json(chart);
                        });
                    }
                });
            }
        };
    }

    @RouteMethod(method = RouteMethod.Method.DELETE, route = "{id}")
    public Handler deleteById(){
        return new Handler() {
            @Override
            public void handle(@NotNull Context context) throws Exception {
                String id = context.pathParam("id");

                if(StringUtils.isBlank(id)){
                    context.status(HttpStatus.BAD_REQUEST);
                    return;
                }

                String authorization = context.header("Authorization");


                if(StringUtils.isBlank(authorization)){
                    context.status(HttpStatus.UNAUTHORIZED);
                    return;
                }

                Optional<AdminUser> present = server.getDbContext().getAdminUsers().isPresent(authorization);
                if(present.isEmpty()){
                    context.status(HttpStatus.UNAUTHORIZED);
                    return;
                }

                AdminUser adminUser = present.get();

                server.getLogger().info("Result "+id+" has been deleted by the request of user "+adminUser.getUsername());

                server.getDbContext().getResults().deleteById(Long.parseLong(id));
                context.status(200);
                return;
            }
        };
    }


    @RouteMethod(method = RouteMethod.Method.GET, route = "list")
    public Handler getAllResults(){
        return new Handler() {
            @Override
            public void handle(@NotNull Context context) throws Exception {
                context.future(new Supplier<CompletableFuture<?>>() {
                    @Override
                    public CompletableFuture<?> get() {
                        return server.getDbContext().getResults().getAllResults().whenComplete((resultList, err) -> {
                            if(err != null){
                                context.status(HttpStatus.BAD_REQUEST);
                                context.result(err.getMessage());
                                return;
                            }

                            DataDto.ResultFormattedDto formattedDto = new DataDto.ResultFormattedDto();

                            for (Results results : resultList) {
                                if(results.team == Teams.BLUE)
                                    formattedDto.blue.add(results);
                                if(results.team == Teams.WHITE)
                                    formattedDto.white.add(results);
                                if(results.team == Teams.YELLOW)
                                    formattedDto.yellow.add(results);
                                if(results.team == Teams.GREEN)
                                    formattedDto.green.add(results);
                                else formattedDto.unknown.add(results);
                            }

                            context.json(formattedDto);
                        });
                    }
                });
            }
        };
    }

}
