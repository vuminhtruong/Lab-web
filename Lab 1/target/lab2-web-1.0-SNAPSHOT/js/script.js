"use strict"
let default_graph = true;
const canvas = document.getElementById("canvas");
let x,y,r;

function init(){
    createGraphic('canvas', r_out.value);
}

function setX(x_value){
    document.getElementById("x_out").value =  x_value;
    if(correctX(x_value))
        createNotification("");
}

function setRadius(){
    let select = document.getElementById("r");
    let option = select.options[select.selectedIndex];

    console.log('radius: '+ option.value);
    document.getElementById("r_out").value = option.value;
    r = option.value;
    if(correctR(r))
        createNotification("");
    createGraphic('canvas',option.value);

}

function setY(){
    let y_out = document.getElementById("y_value").value;
    let y_value = document.getElementById("y_out");
    y_value.value = correctY(y_out) ? y_out : "Error";
    if(!correctY(y_out))
        y_value.style.color = "#FC2C00";
    else{
        y_value.style.color = "#B4886B";
        createNotification("");
    }
}

function createGraphic(id,r){
    if(r === 0 || r === '')
        default_graph = true;
    else
        default_graph = false;

    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height);


    context.beginPath();
    context.rect(40, 40, 260, 260);
    context.closePath();
    context.fillStyle = "#2f9aff";
    context.fill();

    context.beginPath();
    context.moveTo(300,300);
    context.arc(300, 300, 260, 1.5*Math.PI, 0, false);
    context.closePath();
    context.fillStyle = "#2f9aff";
    context.fill();

    context.beginPath();
    context.moveTo(300,300);
    context.lineTo(40,300);
    context.lineTo(300,560);
    context.closePath();
    context.fillStyle = "#2f9aff";
    context.fill();

    context.beginPath();
    context.font = "12px Arial";
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.moveTo(300, 0);
    context.lineTo(300, 600);
    context.moveTo(300, 0);
    context.lineTo(295, 15);
    context.moveTo(300, 0);
    context.lineTo(305, 15);
    context.fillText("Y", 310, 15);
    context.moveTo(0, 300);
    context.lineTo(600, 300);
    context.moveTo(600, 300);
    context.lineTo(585, 295);
    context.moveTo(600, 300);
    context.lineTo(585, 305);
    context.fillText("X", 580, 320);

    context.moveTo(295, 170);
    context.lineTo(305, 170);
    context.fillText(default_graph ? 'R/2' : String(r/2), 320, 160);
    context.moveTo(295, 40);
    context.lineTo(305, 40);
    context.fillText(default_graph ? 'R' : String(r), 320, 30);
    context.moveTo(295, 430);
    context.lineTo(305, 430);
    context.fillText(default_graph ? '-R/2' : String(-(r / 2)), 320, 420);
    context.moveTo(295, 560);
    context.lineTo(305, 560);
    context.fillText(default_graph ? '-R' : String(-r), 320, 550);

    context.moveTo(430, 295);
    context.lineTo(430, 305);
    context.fillText(default_graph ? 'R/2' : String(r/2), 440, 280);
    context.moveTo(560, 295);
    context.lineTo(560, 305);
    context.fillText(default_graph ? 'R' : String(r), 570, 280);
    context.moveTo(170, 295);
    context.lineTo(170, 305);
    context.fillText(default_graph ? '-R/2' : String(-r / 2), 180, 290);
    context.moveTo(40, 295);
    context.lineTo(40, 305);
    context.fillText(default_graph ? '-R' : String(-r), 50, 290);

    context.closePath();
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.stroke();
}

function setPoint(x,y){
    var context = canvas.getContext('2d');
    context.fillStyle = "red";
    context.beginPath();
    context.arc(x,y,5,0,Math.PI * 2);
    context.fill();
}

function correctX(x_val){
    if(isNumber(x_val))
        return true;
    else {
        createNotification("Please enter value of X");
        return false;
    }
}

function correctY(y_val){
    if(y_val === ''){
        createNotification("Please enter value of Y");
    }
    else if(!isNumber(y_val)){
        createNotification("Y needs to be a number");
        return false;
    } else{
        if(parseFloat(y_val) > 3 || parseFloat(y_val) < -5){
            createNotification("Y out of range");
            return false;
        }
        return true;
    }

}

function correctR(r_val){
    if(isNumber(r_val))
        return true;
    else {
        createNotification("Please enter value of R");
        return false;
    }
}

function createNotification(mess){
    let output = document.getElementById("notification");
    output.value = mess;
}

canvas.addEventListener('click',ev => {
    console.log("Click on canvas");
    const rect = canvas.getBoundingClientRect();
    const corX = ev.clientX - rect.left;
    const corY = ev.clientY - rect.top;
    console.log("This is default graphic: " + default_graph);
    if(default_graph){
        console.log("Error : R is not set");
        createGraphic("canvas",0);
        document.getElementById("error").innerHTML="R not set";
    }
    else{
        document.getElementById("error").innerHTML = "";
        setPoint(corX,corY);
        let r = r_out.value / 2;
        const X = (((corX - (canvas.width / 2)) / 130)*r);
        const Y = ((-(corY -(canvas.height / 2)) / 130)*r);
        x = X;
        y = Y;
        sendRequest();
    }
})

document.getElementById("checkSubmit").onclick = function (ev){
    console.log("Click on submit");
    y = document.getElementById("y_value").value;
    x = document.getElementById("x_out").value;
    r = document.getElementById("r_out").value;
    if(correctX(x) && correctY(y) && correctR(r)){
        createNotification("");
        sendRequest();
    }
    ev.preventDefault();
}

function sendRequest(){
    let request = "x=" + encodeURIComponent(x) + "&y=" + encodeURIComponent(y) + "&r=" + encodeURIComponent(r);
    fetch("controller",{
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: request
    })
        .then(response => response.text())
        .then(function (answer){
            document.getElementById("result").innerHTML = answer;
        }).catch(err => createNotification('Ошибка HTTP'));
}

canvas.addEventListener('mousemove',ev => {
    if(!default_graph){
        let r = r_out.value / 2;

        const rect = canvas.getBoundingClientRect();
        const corX = ev.clientX - rect.left;
        const corY = ev.clientY - rect.top;
        const X = (corX - (canvas.width / 2)) / 130;
        const Y = -(corY -(canvas.height / 2)) / 130;

        document.getElementById("pos").innerHTML = "X coords: " + (X*r).toFixed(4) + ", Y coords: " + (Y*r).toFixed(4);
        document.getElementById("error").innerHTML = "";
    }
})


function clearCoords(){
    document.getElementById("pos").innerHTML = ""
}

function isNumber(number){
    return !isNaN(parseFloat(number)) && (number !== '');
}
