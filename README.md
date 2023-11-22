# ParcialDWM2
Parcial Joaquín Pérez, en este README incluyo las instalaciones (abajo del todo) para que funcione todo y letra del ejercicio, tampoco pude realizar las pruebas como es debido con el postman así que hice una carpeta de test para probar algunas cosas.

## Letra:

Debido a los buenos resultados de las últimas fechas, la Asociación Uruguaya de Fútbol desea realizar una aplicación que permita catalogar a todos los futbolistas seleccionables por el actual DT, Marcelo Bielsa.

La aplicación permite agregar, eliminar listar y modificar jugadores. 

Se pide realizar una API en Node utilizando Express que permitirá realizar las siguientes acciones: 

Sign-up & Login - bien
Autenticación de todos los demás recursos utilizando JWT - creo que está bien
Listado de Jugadores
Alta y Baja de Jugadores
Se debe contemplar la entidad Jugador, que constará de las siguientes propiedades:
Id: string (se sugiere número representado como string)
Nombre: string
Posición: string (sólo se acepta GK, DF,MD,FW)
Suspendido: boolean
Lesionado: boolean
NO SE DEBE PERSISTIR EN BASE DE DATOS

INFORMACIÓN ADICIONAL
Se cuenta con una colección de Postman que puede ser utilizada para probar los endpoints creados antes de entregar. Asimismo, se cuenta con un db.json con varios jugadores pre-cargados que puede ser utilizado en caso de no querer mantener los datos en memoria.

OPCIONALES
Modificaciónde jugadores (la modificación sólo permite editar las propiedades de posición, suspendido, lesionado)
Listado de Jugadores convocados
Convocar Jugadores
El listado de jugadores convocados debe ser de 22 jugadores, en caso de no llegar, se retorna un error
Solo se podrán convocar jugadores que tengan las propiedades suspendido y lesionado con valor en false
Se debe validar que haya al menos un jugador por posición en la convocatoria
## Instalaciones Previas

- `express`: Un marco de trabajo para aplicaciones web para Node.js. Facilita la creación de servidores web.
- `jsonwebtoken`: Proporciona funcionalidades para generar y verificar tokens JWT, en este caso son utiles para la autenticación del usuario
- `bcrypt`: Un paquete para hashear contraseñas. Es crucial para la seguridad de las contraseñas almacenadas.
- `bcryptjs`: Una versión en JavaScript puro de bcrypt, utilizada para la compatibilidad en diferentes entornos.
- `nodemon` Reinicia automáticamente el servidor cuando detecta cambios en los archivos.
- `dotenv`: Carga variables de entorno desde un archivo `.env`. En este caso se uso para la autenticación 

```bash
npm init // se puede darle a -y si queres saltear la config basica
npm install express
npm install jsonwebtoken
npm install bcrypt
npm install bcryptjs
npm install --save-dev nodemon
npm install dotenv
npm install --save-dev supertest
npm install --save-dev jest 

- Estos ultimos dos son para los casos de test, ya que no leagarre la mano a postman y encontré esta forma para realizar pruebas, es más complejo por lo cual no voy a probar muchos metodos.
desp se puede correr con npm test
no me funciono, igualmente queda hecho un test con la estructura :c


