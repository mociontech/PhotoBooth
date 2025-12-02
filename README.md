# Insta Face

Insta Face es una webapp capaz de tomar una foto de una o varias personas, para que por medio de IA cambie las caras en una imagen objetivo, como por ejemplo pilotos de formula 1, tarjetas navideñas, deportistas, etc.

Esta IA cuenta con detector de genero, por lo que si se detecta que el usuario es mujer y en la imagen objetivo no hay ninguna mujer no se realizara el cambio de caras.

La [API](https://rapidapi.com/MorfranTechnology/api/faceswap-image-transformation-api) es proporcionada por rapidApi con la cuenta de tech

## Tecnologías

<p align='center'>
<img alt="Next" src="https://img.shields.io/badge/-Next.Js-000000?style=flat-square&logo=next.js&logoColor=white" />
<img alt="React" src="https://img.shields.io/badge/-React-45b8d8?style=flat-square&logo=react&logoColor=white" />
<img alt="JavaScript" src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
<img alt="Tailwind" src="https://img.shields.io/badge/-Tailwind-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white" />

</p>

## Flujo de la experiencia

![Flujo de la experiencia](/public/flujoExp.png)

1. Pantalla de bienvenida
2. Registro de usuario en la experiencia.
3. Toma de la foto
4. Pantalla de carga mientras se genera la imagen
5. Imagen generada por el face swap
6. Pantalla de despedida.

## Brandeo

### Imagenes objetivo

- Base de imagenes donde se vea claramente la cara, tanto para mjuer como hombre
- En caso de ser para multiples personas tener imagenes para todas las opciones (ej. 4 personas, tener imagenes con 1 mujer 3 hombres, 2 mujeres 2 hombres, 3 mujeres 1 hombre etc...)

### Artes

Artes puntuales de cada una de las pantallas del flujo.

- Para background, imágenes en 1080x1920 formato PNG.
- Assets como logos, personajes, botones, etc. en formato SVG.

## Instalación y ejecución

```bash
# Clonar el repositorio en local

# Tener en cuenta que para esto debe ser colaborador
# o dueño del repositorio
git clone https://github.com/mociontech/insta-face.git

# Entra en el directorio
cd insta-face

# Crear una nueva rama para el nuevo desarrollo
git branch [nombre del proyecto]

# Trabajar sobre la nueva rama
git checkout [nombre del proyecto]

# Instalar dependencias del desarrollo
npm install

# Ejecutar en servidor local en el puerto 3000
npm run dev


# Ejecutar el backend en caso de necesitar impresion
# Dirigirse a la carpeta lib
cd lib

# Correr el backend
node server.js

```

Es posible realizar un despliegue con todas las funcionalidades basicas, para poder utilizar la funcionalidad de impresión, se debe correr local utilizando el comando `npm run printer` y actualizando los valores de las lineas `54 y 55` del archivo ` server.js` correspondientes al nombre de la impresora y el tamaño del papel deseado, normalmente se usará `4x6 in` o `10.5 x 14.8 cm`

# Resolución

La resolución esta dispuesta para un tótem touch de 1080x1920, pero hay posibilidad de manejar una pantalla 1920x1080

# Actualizacion en el componente de la camara

Se cambio de libreria para lectura de la camara, la nueva libreria es [react-camera-pro](https://www.npmjs.com/package/react-camera-pro).
