package me.alenalex.http;

import io.javalin.Javalin;
import io.javalin.http.Context;
import io.javalin.http.Handler;
import io.javalin.http.RequestLogger;
import io.javalin.plugin.bundled.CorsPluginConfig;
import me.alenalex.TScoreboardServer;
import me.alenalex.annotations.PublicRoute;
import me.alenalex.annotations.RouteMethod;
import me.alenalex.bootstrap.Boot;
import me.alenalex.constants.FlagConstants;
import org.jetbrains.annotations.NotNull;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;
import java.util.stream.Collectors;

public final class HttpJavalin {

    private final TScoreboardServer server;

    private Javalin javalinServer;
    public HttpJavalin(TScoreboardServer server) {
        this.server = server;
    }

    public boolean start(){
        Boot.BootFlags startupFlags = Boot.getStartupFlags();
        String portRaw = Boot.getStartupFlags().get(FlagConstants.SERVER_PORT);
        int port = Integer.parseInt(portRaw);

        this.javalinServer = Javalin.create(config -> {
           config.plugins.enableCors(c -> {
               c.add(new Consumer<CorsPluginConfig>() {
                   @Override
                   public void accept(CorsPluginConfig corsPluginConfig) {
                       corsPluginConfig.anyHost();
                   }
               });
           });

           config.requestLogger.http(new RequestLogger() {
               @Override
               public void handle(@NotNull Context context, @NotNull Float aFloat) throws Exception {
                   server.getLogger().info("A new request has been hit on "+context.path()+". Method: "+context.method()+". Authorization?: "+context.header("authorization"));
               }
           });
        });

        this.javalinServer.start(port);

        return true;
    }

    public void register(Class<?> clazz){
        if(this.server == null)
        {
            throw new RuntimeException("The javalin server is not yet ready!");
        }

        boolean annotationPresent = clazz.isAnnotationPresent(PublicRoute.class);
        if(!annotationPresent)
        {
            throw new RuntimeException("Failed to register the class "+clazz.getName()+", is the class annotated with @PublicRoute");
        }

        PublicRoute publicRouteAnnotation = clazz.getAnnotation(PublicRoute.class);
        String parentRoute = publicRouteAnnotation.routeAddress();
        if(!parentRoute.endsWith("/"))
            parentRoute = parentRoute + "/";

        Object routeClass = null;

        Constructor<?> classConstructor = null;

        try {
            classConstructor = clazz.getConstructor(TScoreboardServer.class);
            routeClass = classConstructor.newInstance(server);
        } catch (NoSuchMethodException ignored) {} catch (InvocationTargetException | InstantiationException |
                                                          IllegalAccessException e) {
            throw new RuntimeException(e);
        }

        if(classConstructor == null){
            try {
                classConstructor = clazz.getConstructor();
                routeClass = classConstructor.newInstance();
            } catch (NoSuchMethodException e) {
                throw new RuntimeException("The class should have either a no-args constructor or constructor with param of TScoreboardServer");
            } catch (InvocationTargetException | InstantiationException | IllegalAccessException e) {
                throw new RuntimeException(e);
            }
        }

        Class<?> aClass = routeClass.getClass();
        List<Method> possibleMethods = Arrays.stream(aClass.getDeclaredMethods()).filter(m -> m.isAnnotationPresent(RouteMethod.class) && m.getReturnType().equals(Handler.class)).toList();

        if(possibleMethods.isEmpty()){
            server.getLogger().info("No methods has been found on class with both return type as Handler and annotated properly!"+aClass.getName());
            return;
        }

        for (Method method : possibleMethods) {
            RouteMethod routeMethod = method.getAnnotation(RouteMethod.class);
            RouteMethod.Method methodType = routeMethod.method();
            String absoluteRoute = parentRoute + routeMethod.route().trim();

                try{
                    switch (methodType) {
                        case GET -> javalinServer.get(absoluteRoute, (Handler) method.invoke(routeClass));
                        case POST -> javalinServer.post(absoluteRoute, (Handler) method.invoke(routeClass));
                        case DELETE -> javalinServer.delete(absoluteRoute, (Handler) method.invoke(routeClass));
                        default -> {}
                    }

                    server.getLogger().info("Registered "+absoluteRoute+" as method "+methodType.name());
                }catch (Exception e){
                    e.printStackTrace();
                }
        }

    }


    public void stop(){
        if(javalinServer != null)
            javalinServer.stop();
    }
}
