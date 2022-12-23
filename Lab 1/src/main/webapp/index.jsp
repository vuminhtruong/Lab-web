<%@ page import="com.example.lab2web.model.Point" %>
<%@ page import="com.example.lab2web.model.Data" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Лабораторная работа 1</title>
    <link rel="stylesheet" href="stylesheets/page.css">
</head>
<body onload="init()">
<table id="mainTable">
    <tr class="student">
        <td>Веб-программирование, Лабораторная работа №1 , Вариант <i>31073</i>
            <br>Ву Минь Чыонг
            <br>Группа <i>Р33212</i></td>
    </tr>
    <tr class="src">
        <td>
            <form id="form_value">
                <h4>Параметры</h4>
                <p>Введите значение X:
                    <output name="x" id="x_out" class="output"></output>
                </p>
                <table class="x-buttons" >
                    <tr>
                        <td><input type="button" name="x11" id="x_11" value="-3" onclick="setX(x11.value)" ></td>
                        <td><input type="button" name="x12" id="x_12" value="-2" onclick="setX(x12.value)" ></td>
                        <td><input type="button" name="x13" id="x_13" value="-1" onclick="setX(x13.value)" ></td>
                    </tr>
                    <tr>
                        <td><input type="button" name="x21" id="x_21" value="0" onclick="setX(x21.value)" ></td>
                        <td><input type="button" name="x22" id="x_22" value="1" onclick="setX(x22.value)" ></td>
                        <td><input type="button" name="x23" id="x_23" value="2" onclick="setX(x23.value)" ></td>
                    </tr>
                    <tr>
                        <td><input type="button" name="x31" id="x_31" value="3" onclick="setX(x31.value)" ></td>
                        <td><input type="button" name="x32" id="x_32" value="4" onclick="setX(x32.value)" ></td>
                        <td><input type="button" name="x33" id="x_33" value="5" onclick="setX(x33.value)" ></td>
                    </tr>
                </table>
                <br>
                <p>Введите значение Y:
                    <output id="y_out" class="output"></output>
                </p>
                <input required name="y" id="y_value" type="text" placeholder="-5...3" onblur="setY()">
                <br>
                <br>
                <p>Введите значение R:
                    <output name="r_output" id="r_out" class="output"></output>
                </p>
                <select required id="r" name="r" onchange="setRadius()">
                    <option value="" selected></option>
                    <option value="1">1</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2</option>
                    <option value="2.5">2.5</option>
                    <option value="3">3</option>
                </select>
                <br><br><br>
                <input type="submit" id="checkSubmit" value="Проверить">
            </form>
        </td>
        <td class="graphic">
            <canvas id="canvas" onmouseout="clearCoords()" width="600" height="600"></canvas>
            <p id="pos"></p>
            <p id="error"></p>
        </td>
    </tr>
</table>
<h1><output id="notification"></output></h1>
<table id = "result">
</table>
<script src="js/script.js"></script>
</body>
</html>