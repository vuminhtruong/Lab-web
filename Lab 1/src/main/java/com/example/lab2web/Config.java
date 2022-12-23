package com.example.lab2web;

public class Config {
    private static String HOST = "localhost";
    private static String PORT = "8080";

    public static String getHOST() {
        return HOST;
    }

    public static void setHOST(String HOST) {
        Config.HOST = HOST;
    }

    public static String getPORT() {
        return PORT;
    }

    public static void setPORT(String PORT) {
        Config.PORT = PORT;
    }
}
