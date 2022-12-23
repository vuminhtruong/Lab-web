package com.example.lab2web.model;

import java.util.ArrayList;

public class Data {
    private ArrayList<String> listAnswer;
    private String head = "<tr>" +
            "<th>x</th>" +
            "<th>y</th>" +
            "<th>r</th>" +
            "<th>Answer</th>" +
            "<th>Time</th></tr>";

    public Data() {
        listAnswer = new ArrayList<>();
    }

    public void setHead(){
        listAnswer.add(head);
    }

    public ArrayList<String> getListPoint() {
        return listAnswer;
    }

    public void addPoint(Point point){
        listAnswer.add(point.toString());
    }

}
