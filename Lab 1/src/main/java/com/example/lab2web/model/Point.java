package com.example.lab2web.model;

import java.text.DecimalFormat;
import java.util.Date;
import java.util.Objects;

public class Point {
    private double x,y,r;
    private boolean status;

    public Point(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.status = checkCoordinates(x,y,r);
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean getStatus() {
        return status;
    }

    private boolean checkCoordinates(double x, double y, double r){
        return  checkTria(x,y,r) ||
                ((x <= 0) && (x >= -r) && (y >= 0) && (y <= r)) ||
                ((Math.pow(x, 2) + Math.pow(y, 2)) <= ((Math.pow(r, 2))) && (x >= 0) && (y >= 0));
    }

    private boolean checkTria(double x,double y,double r){
        return x<=0 && y<=0 && x >= -r && y >= -r
                && ((Math.abs(area(0,0,0,-r,x,y)+area(0,0,-r,0,x,y)+area(-r,0,0,-r,x,y)) - area(0,0,-r,0,0,-r)) <= 0.001);
    }

    private double area(double x1,double y1,double x2,double y2,double x3,double y3){
        double a1 = x2 - x1;
        double a2 = y2 - y1;
        double b1 = x3 - x1;
        double b2 = y3 - y1;
        return Math.abs(a1 * b2 - a2 * b1);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Point point = (Point) o;
        return Double.compare(point.x, x) == 0 && Double.compare(point.y, y) == 0 && Double.compare(point.r, r) == 0 && status == point.status;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y, r, status);
    }

    @Override
    public String toString() {
        DecimalFormat formatter = new DecimalFormat("#0.0000");
        return "<tr><td>" + formatter.format(x) + "</td>" +
                "<td>" + formatter.format(y) + "</td>" +
                "<td>" + formatter.format(r) + "</td>" +
                "<td style='color: " + ((status) ? "green" : "red") + "'>" + status + "</td>" +
                "<td>" + new Date() + "</td></tr>";
    }
}
