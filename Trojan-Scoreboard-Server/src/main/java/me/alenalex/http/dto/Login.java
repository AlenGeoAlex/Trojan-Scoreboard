package me.alenalex.http.dto;

public class Login {

    public static final class LoginInput {
        public String username;
        public String password;

        public LoginInput(String username, String password) {
            this.username = username;
            this.password = password;
        }

        public LoginInput() {
        }
    }

    public static final class LoginData {
        public String jwt;
        public long timestamp;

        public LoginData(String jwt) {
            this.jwt = jwt;
            this.timestamp = System.currentTimeMillis();
        }

        public LoginData() {
        }
    }

}
