$(function()
{
  //Variables para la matriz
      var cuadricula = "",
          opcion=0, //para identificar el numero seleccionado
          matriz=11, //matriz de la tabla
          Tamaño=121;

  //Variables para generar los numeros aleatorios
      var numero=0, //numero aleatorio  usados=[], //Array de numeros aleatorios
          ordenados=[], //Array de numeros en orden
          usados=[];

  //Variables de las opciones del juego
      var click=[], //Para identificar cuando un elemento es clickeado
          aciertos=[],
          ayuda=0,
          puntuacion=0;

  

            function temp() //para llevar el tiempo, basado en http://librosweb.es/libro/javascript/capitulo_8/relojes_contadores_e_intervalos_de_tiempo.html
            {
              //variables para ejecutar el cronometro
              var tiempo,
              segundos=0,
              minutos=0,
              horas=0,
              seg,
              min,
              hor;
              tiempo=setInterval(function(){
                segundos++;
                seg=segundos<10?"0"+segundos:segundos; //tomado de http://librosweb.es/libro/javascript/capitulo_8/relojes_contadores_e_intervalos_de_tiempo.html
                min=minutos<10?"0"+minutos:minutos;
                hor=horas<10?"0"+horas:horas;
                if (segundos===59)
                {
                  segundos=0
                  minutos++;
                }
                if (minutos===59)
                {
                  minutos=0;
                  horas++;
                }
                $("#tiempo").text("Tiempo: "+hor+":"+min+":"+seg);
              },1000);
            }



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
            aciertos.push(usados[seleccion]);
            puntuacion+=10;
            $("#cuadricula_"+click[1]).css({"border-radius": "100px", "border-color":"red", "background-color":"red"}).unbind();
            $("#mensaje").text("Encuentra el: "+(aciertos.length+1));
            $("#puntuacion").text("Puntuacion: "+puntuacion);
        }
        if(aciertos.length===Tamaño)
        {
          swal({
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

    $("#iniciar").click(function()//evento click del boton de inicio de la partida
    {
      iniciaPartida();
      $("#iniciar").hide();
    });



    $("#reiniciar").click(function()//evento click del boton de inicio de la partida
    {
      swal({title: "Game Over"})
      location.reload();
    });

          $("#ayuda").click(function circulo(e) //evento click del boton de ayuda
          {
            puntuacion-=10;
            ayuda++;
            if (ayuda>2)
            {
              swal({title: "No tienes mas Ayudas"})
              $("#ayuda").unbind();
              $("#ayuda").hide();
            }
            for (var i = 0; i < usados.length; i++)
            {
              if(ordenados[aciertos.length]===(1+ordenados.indexOf(usados[i])))
              {
                aciertos.push(usados[i]);
                var pinta=1+i;
                $("#cuadricula_"+pinta).css({"border-radius": "100px", "border-color":"red", "background-color":"red"}).unbind();
                $("#mensaje").text("Encuentra el: "+(aciertos.length+1));
                $("#puntuacion").text("Puntuacion: "+puntuacion);
                break;
              }
            }
          });


    function randomColor() //para generar los colores aleatorios sacado de http://www.paulirish.com/2009/random-hex-color-code-snippets/
    {
      return'#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] +
      (c && lol(m,s,c-1));})(Math,'0123456789ABCD',4);
    };
});
