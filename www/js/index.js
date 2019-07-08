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


var indiceAtual;
var deslocamento = (Math.floor(Math.random()*100)%26)+1;
var frases = ["mais vale um passaro na mao do que dois voando", "a vinganca e um prato que se come frio",
                "o povo nao deve temer seu governo, o governo deve temer seu povo", "ser ou nao ser? eis a questao"];

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
    indiceAtual = (Math.floor(Math.random()*10)%4);
    var texto = frases[indiceAtual];
    var palavra = texto.split(' ');
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
    alert(dom.lenght);
    for(i = 0; i < dom.lenght; i++){
        var texto = dom[i].value.toUpperCase();
        var res = dom[i].getAttribute("letra").toUpperCase();
        if(res != texto){
            alert("Jogo incorreto!");
            fim = 1;
            break;
        }
        alert(texto + res);
    }
    if(fim == 0){
        alert("Acertou!\n" + frases[indiceAtual]);
        var url = window.location.href;
        window.location = url;
    }
}


function mapearLetras(){
    var letras = document.getElementsByClassName("input");
    for (var i = 0; i < letras.length; i++) {
        letras[i].addEventListener('focusout', function(event){
            var x = document.getElementsByClassName("input");
            var tecla = this.value;
            tecla = tecla.toUpperCase();
            var minhaletra = this.getAttribute("letra");
            for (var i = 0; i < x.length; i++) {
                var letraRepassada = x[i].getAttribute("letra");
                letraRepassada = letraRepassada.toUpperCase();
                if(letraRepassada == tecla){
                    x[i].value = tecla;
                }
            }
        });
    }
}

function iniciar(){
    converter();
    mapearLetras();
}

window.onload = iniciar();