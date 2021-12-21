# triviaMillonaria
Aplicativo en JavaScript que aleatoriamente diseña una trivia de preguntas de cultura general en 5 niveles o categorías de dificultad.

Utilicé el IDE Visual Studio Code para la creación y edición de código. El proyecto cuenta con 3 archivos principales: 
  -  *base-preguntas.json*: Archivo que alberga un array con las 25 preguntas, en orden ascendente de dificultad (5 preguntas por nivel/categoría), de las cuales posteriormente se       escogerán 5 preguntas al azar, una por cada nivel/categoría.  
  -  *index.html*: Archivo que detalla las clases utilizadas junto con su respectivo diseño (frontend)
  -  *index.js*: Archivo que detalla la parte lógica del proyecto (backend).
  -  *sweetalert2.all.min.js*: Archivo script de la librería Sweetalert, por medio de esta librería se mostrará un cuadro modal de fin del juego.
   
Fue preciso descargar una extensión llamada Live Server que habilitó un servidor local en el navegador.  

Luego de abrir la carpeta triviaMillonaria por medio de Visual Studio Code, accedemos al archivo index.html para dar clic derecho dentro del código del mismo y escoger la opción Open with Live Server. Enseguida se abrirá en nuestro navegador predeterminado la dirección del servidor local, así como un recuadro que muestra en la esquina superior derecha el valor o premio en pesos colombianos correspondiente a la Pregunta número 1, un título centrado de color verde que señala la categoría o nivel actual en el que el jugador está concursando (que progresivamente irá ascendiendo si se eescogen las respuestas acertadas), luego la pregunta como tal, una imagen de referencia a ese nivel, cuatro botones contiguos que muestran las alternativas de respuesta a la pregunta planteada y en la parte inferior un botón con la opción de retirarse del juego, para asegurar el acumulado que ha ganado hasta el momento previo a responder. 

Si la respuesta elegida es correcta, el botón se tornará verde y enseguida se actualizará el servidor con una nueva pregunta en el nivel inmediatamente superior y con un acumulado en la parte superior, que es el total de dinero ganado hasta el momento por las respuestas correctas. Si la respuesta escogida es incorrecta, se muestra en pantalla el aviso de que el jugador perdió (gana $0) y la opción de oprimir un nuevo botón para reiniciar el juego.

Si el jugador se retira o contesta afirmativamente a las cinco preguntas, se despliega una pantalla de aviso donde se totaliza el dinero que obtuvo en su participación. Además, en el segundo caso, aparecerá un cuadro de diálogo y la invitación para que el jugador ingrese su nombre que, junto al acumulado que ganó, quedará registrado en el localStorage del navegador. De hacerlo así, el cuadro modal se actualiza agregando el nombre al aviso del fin del juego y dando la instrucción de refrescar/actualizar el navegador para iniciar un juego nuevo.
