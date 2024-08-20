# Photobooth

Photobooth es una web app que por medio de la camara del dispositivo en uso, toma una foto del usuario y aplica un marco personalizado a esta foto.

Para extender la experiencia del usuario, la foto tomada es enviada al correo suministrado por el usuario en la pantalla de registro.

## Tecnologías

<p align='center'>
<img alt="React" src="https://img.shields.io/badge/-React-45b8d8?style=flat-square&logo=react&logoColor=white" />
<img alt="JavaScript" src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
<img alt="Firebase" src="https://img.shields.io/badge/-Firebase-DD2C00?style=flat-square&logo=firebase&logoColor=white" />
<img alt="Vite" src="https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white" />

</p>

## Flujo de la experiencia

![Flujo de la experiencia](/public/flujoexp.png)

## Brandeo

### Marco

Marco personalizado en formato png.

### Artes

Artes puntuales de cada una de las pantallas del flujo.

## Instalación y ejecución

```bash
# Clonar el repositorio en local

# Tener en cuenta que para esto debe ser colaborador
# o dueño del repositorio
git clone https://github.com/mociontech/PhotoBooth.git

# Entra en el directorio
cd photoboothrepublica

# Crear una nueva rama para el nuevo desarrollo
git branch [nombre del proyecto]

# Trabajar sobre la nueva rama
git checkout [nombre del proyecto]

# Instalar dependencias del desarrollo
npm install

# Ejecutar en servidor local en el puerto 5173
npm run dev
```

# Resolución

Esta webapp fue desarrollada de manera responsive unicamente para pantallas en modo retrato.
