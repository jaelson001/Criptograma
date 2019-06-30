/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


var deslocamento = (Math.floor(Math.random()*100)%26)+1;

function tamanhoDe(o){
    var contador = 0;
    for(x in o){
        contador++;
    }
    return contador;
}

function cripto(c){
    c = c.toUpperCase();
    var limite = 90 - deslocamento;
    var ascii;
    if(c != ' ' && c != '.' && c != ',' && c != '?'){
        var charAtual = c.charCodeAt(0);
        if(charAtual > limite){
            ascii =  (c.charCodeAt(0) + deslocamento) - 26;
        }else{
            ascii = c.charCodeAt(0) + deslocamento;
        }
        c = String.fromCharCode(ascii);
    }
    return c; 
}

function converter(){
    var texto = document.getElementById("texto").value;
    var palavra = texto.split(' ');
    document.getElementById("texto").value = '';
    for (var i = 0; i < palavra.length; i++) {
        var divPalavra = document.createElement("DIV");
        divPalavra.classList.add("palavra");

        var palavraQuebrada = palavra[i].split('');
            for (var j = 0; j < palavraQuebrada.length; j++) {
                var cifrado = cripto(palavraQuebrada[j]);

                var span = document.createElement("SPAN");
                span.innerHTML = cifrado;
                span.classList.add("caractere");

                var input = document.createElement("INPUT");
                input.setAttribute("type", "text");
                input.setAttribute("letra", palavraQuebrada[j].toUpperCase());
                input.setAttribute("maxlength", "1");
                input.classList.add("caractere");
                input.classList.add("input");

                var letra = document.createElement("DIV");
                letra.classList.add("letra");
                if (cifrado!=' ' && cifrado!='.' && cifrado!=',' && cifrado!='?') {
                    letra.appendChild(input);
                }
                letra.appendChild(span);
                divPalavra.appendChild(letra);
            }
        var no = document.getElementById("resultado");
        no.appendChild(divPalavra);
    }
}

function verificar(){
    var dom = document.getElementsByClassName('input');
    var fim = 0;
    for(i=0;i<dom.lenght;i++){
        var texto = dom[i].value.toUpperCase();
        var res = dom[i].getAttribute("letra");
        if(res != texto){
            alert("Jogo incorreto!");
            fim = 1;
            break;
        }
    }
    if(fim==0){
        alert("Acertou!");
    }
}