#Proyecto final EP01
#Juego 1-121

El juego consta de encontrar los numeros del 1 al 121 en el menor tiempo posible.

##Funciones Principales
Se creó la funcion juego, por medio de la cual se dibuja una matriz, o mas bien una tabla sobre la cual se van a 
ver los numeros de forma aleatoria.

```
var juego = (function juego(matriz)//para dibujar la matriz basado en https://developer.mozilla.org/es/docs/Trazado_de_una_tabla_HTML_mediante_JavaScript_y_la_Interface_DOM
      {
        cuadricula = "<table id = 'numcir'>";
        for(var columna=0; columna < matriz; columna++)
        {
          cuadricula+="<tr>";
          for(var fila=0; fila < matriz; fila++)
          {
            opcion++;
            ordenados.push(opcion); //Llena el array de numeros en orden
            cuadricula += "<td>";
            cuadricula += "<div id='cuadricula_"+(opcion)+"' style='color:"+randomColor()+";'class= 'circulo'>"+usados[opcion-1]+"</div>";
            cuadricula += "</td>";
          }
          cuadricula += "<tr>";
        }
        cuadricula += "</table>";
        $("#cuadricula").append(cuadricula);
        $(".circulo").css({"width": 38,	"height": 38});
        return juego;
      })(matriz);
```

Tambien se creo una funcion mediante la cual se obtienen los numeros aleatorios y otra funcion para verificar si el numero esta repetido.
```
     var Aleatorios = (function Aleatorios(Tamaño)//para guardar los numeros en el vector de aleatorios
      {
        for(var i=0; i<Tamaño; i++)
        {
          numero = Math.floor(Math.random()*(Tamaño-1+1)+1);
          if(!repetido())
          {
            usados.push(numero);
          }else
          {
            i--;
            numero = Math.floor(Math.random()*(Tamaño-1+1)+1);
          }
        }
        return Aleatorios;
      })(Tamaño);

function repetido()// para saber si un numero aleatorio se repite
            {                   //tomado de http://www.codigoactionscript.org/obtener-un-numero-aleatorio-sin-que-se-repita/
              var repe = false;
              for (var i=0; i<usados.length; i++)
              {
                if (numero === usados[i])
                {
                  repe = true;
                }
              }
              return repe;
            }
```
y la funcion mas importante es la de inicio de partida:
```
function iniciaPartida()
    {
      $("#mensaje").text("Encuentra el: "+(aciertos.length+1));
      temp(); //inicia el cronometro
      $("#inicio").hide(); //Esconde el boton inicio
      $(".circulo").click(function circulo(e) //Evento click de los circulos(numeros) de la matriz
      {
        click = e.target.id;
        click = click.split("_");
        var seleccion = Number(click[1]-1);
        if(usados[seleccion]===ordenados[aciertos.length])
        {
            aciertos.push(usados[seleccion]);//agrega los aciertos al array aciertos.
            puntuacion+=10;
            $("#cuadricula_"+click[1]).css({"border-radius": "100px", "border-color":"red", "background-color":"red"}).unbind();//coloca el circulo de color rojo una vez es seleccionado y es valido.
            $("#mensaje").text("Encuentra el: "+(aciertos.length+1));
            $("#puntuacion").text("Puntuacion: "+puntuacion);
        }
        if(aciertos.length===Tamaño)//para determinar cuando el juego termina
        {
          swal({//alert que muestra la puntuacion obtenida al final del juego
            title: "Juego Terminado",
            html: '<p><font color=""><h4>Su puntuación es: '+puntuacion+'</h4></font></p>'
            +'<p> Tiempo Final:'+hor+':'+min+':'+seg+'</p>',
            confirmButtonText:"Ok",
            confirmButtonColor:"green",
            showLoaderOnConfirm:"true",
          }).then(function(){
            location.reload();
            })
        }
      });
    }
```
#Links de apoyo (Bibliografia)
+http://www.paulirish.com/2009/random-hex-color-code-snippets/
+https://developer.mozilla.org/es/docs/Trazado_de_una_tabla_HTML_mediante_JavaScript_y_la_Interface_DOM
+http://www.codigoactionscript.org/obtener-un-numero-aleatorio-sin-que-se-repita/
+http://librosweb.es/libro/javascript/capitulo_8/relojes_contadores_e_intervalos_de_tiempo.html

### Autor
Fabian Ortiz Mahecha

