package me.alenalex.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface RouteMethod {
    enum Method {
        GET,
        POST,
        DELETE,
    }

    public Method method() default Method.GET;

    public String route();

}
