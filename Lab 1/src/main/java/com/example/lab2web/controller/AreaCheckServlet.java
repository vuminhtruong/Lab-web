package com.example.lab2web.controller;

import com.example.lab2web.model.Data;
import com.example.lab2web.model.Point;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession();
        Data data = (Data) session.getAttribute("data");
        if(data == null){
            data = new Data();
            session.setAttribute("data",data);
            data.setHead();
        }
        try(PrintWriter writer = resp.getWriter()){
            data.addPoint(getPoint(req));
            for(String answer : data.getListPoint()){
                writer.println(answer);
            }
        }
    }

    private Point getPoint(HttpServletRequest request){
        double x = Double.parseDouble(request.getParameter("x"));
        double y = Double.parseDouble(request.getParameter("y"));
        double r = Double.parseDouble(request.getParameter("r"));
        return new Point(x,y,r);
    }

}
