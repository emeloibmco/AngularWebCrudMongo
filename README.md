<p align="center">
<img width="289" alt="img8" src="https://user-images.githubusercontent.com/40369712/77024696-2f05b680-695d-11ea-82c3-ec06083fd866.png">
 
 ## Despliegue de Mongo BD + node.js CRUD
</p>


Laboratorio para el aprovisionamiento de un servicio persistente de Mongo DB y su conexión con una app crud en node.js

## Requerimentos para la ejecucion de la guia :pushpin:


*	Tener una cuenta de IBM Cloud.
*	Contar con un cluster de Openshift 3.11.

## Indice :scroll:
---

* Crear un nuevo proyecto en el cluster de Openshift
* Aprovisione el servicio Mongo DB en un contenedor de Opeshift
* Configure las variables de entorno para la conexión del CRUD con el servicio de Mongo DB
* Despliegue de la aplicación CRUD node.js

---
### 1. Crear un nuevo proyecto en el cluster de Openshift 🛠️

**a.**	Una vez abierta la consola web de Openshift presione "Create Project" y llene los campos con el nombre y la descripción del proyecto.

<p align="center">
<img width="278" alt="Annotation 2020-03-18 181640" src="https://user-images.githubusercontent.com/40369712/77016805-c57aad80-6946-11ea-83b3-c043412dcba1.png">
</p>

### 2. Aprovisione el servicio Mongo DB en un contenedor de Opeshift 🛠️

**a.**  Seleccione el proyecto que acabe de crear, presione "Browse Catalog" y seleccione el servicio de MongoDB.

<p align="center">
<img width="790" alt="img2" src="https://user-images.githubusercontent.com/40369712/77017187-c3651e80-6947-11ea-9e32-e45080035016.png">
</p>

Una vez detro del catalogo podra ver todas las opciones disponibles para el despliegue de aplicaciones y servicios, dentro de estas encontrara MongoDB y MongoDB(Ephemeral) que corresponden a los servicios de datos persistentes y efímeros, seleccione el servicio MongoDB.

**b.**	Presione "Next" y proporcione las credenciales de acceso para su servicio de MongoDB.

Para fines practicos, el cluster ya cuenta con un servicio de MongoDB al que podra conectarse si no desea crear uno nuevo, las credenciales de conexión, de este se pueden ver a continuación.

<p align="center">
<img width="502" alt="img3" src="https://user-images.githubusercontent.com/40369712/77017999-0e803100-694a-11ea-958a-fb7ddc8a9ce0.png">
</p>
 
---

**Nota:** Debe tener en cuenta que el servicio de MongoDB no queda expuesto publicamente, por lo que solo podra realizarse la conexión con este, una vez la aplicacion se encuentre desplegada en el cluster de Openshift

---
Una vez igresadas las credenciales, presiones "Next" y luego "Create", espere unos minutos mientas se aprovisiona su servicio de base de datos MongoDB

### 3.	Configure las variables de entorno para la conexión del CRUD con el servicio de MongoDB 🛠️

---

Antes de modificar el archivo de conexión de la aplicación, es necesario conocer la IP del pod donde se ha desplegado el servicio de la base de datos para eso podemos seguir los siguientes pasos:

---

**a.** Dirijase a Applications -> Deployments -> mongodb y vera una pantalla como la siguiente, seleccione el numero del ultimo despliegue realizado.

<p align="center">
<img width="778" alt="img4" src="https://user-images.githubusercontent.com/40369712/77023613-5909a980-695a-11ea-8cbf-632c363c5353.png">
</p>
 
**b.**	Dirijase al final de la pagina y seleccione el nombre del pod donde se ha desplegado el servicio.

<p align="center">
<img width="773" alt="img5" src="https://user-images.githubusercontent.com/40369712/77023743-b30a6f00-695a-11ea-89e0-612636db6b98.png">
</p>

**c.**	Identifique la Ip del pod, la cual debera ser asignada en la configuración de la conexión de la aplicación.

<p align="center">
<img width="775" alt="img6" src="https://user-images.githubusercontent.com/40369712/77023847-f238c000-695a-11ea-987b-e40c7bafe08c.png">
</p>


---

**Nota:** La aplicacion CRUD que se encuentra en este repositorio esta configurada con las credenciales proporcionadas para la conexión con el servicio que se creo anteriormente, si desea cambiar las credenciales de acceso para hacer la conexión con un servicio diferente, debera descargar y modificar el codigo en la ruta server\conection\mongo.js y cambiar los valores de las credenciales de las siguientes lineas

Para esto puede seguir los siguientes pasos:

**I.** Clone este repositorio desde la pagina web como un **.ZIP** o desde la linea de comandos ejecutando:

```
git clone https://github.com/CristianR11/CrudMongo
```

**II.** Ingrese a la ruta antes mencionada ./server/conection y edite el archivo mongo.js, allí encontrara las siguientes lineas, donde debera agregar las credenciales de conexión para el servicio MongoDB

```
const mongoURL = process.env.MONGO_URL || '<Ip_del_pod>';
const mongoUser = process.env.MONGO_USER || '<mongo_user_name>';
const mongoPass = process.env.MONGO_PASS || '<Password>';
const mongoDBName = process.env.MONGO_DB_NAME || '<mongo_db_name>';
```

---

### 4.	Despliegue de la aplicación CRUD node.js 🛠️

**a.** Dirijase al catalogo y seleccione la opcion Node.js

**b.** Una vez seleccionada, presione "Next" y proporciones el nombre de la aplicación, la URL del git donde se encuentra el proyecto a desplegar y presione "Create".

<p align="center">
<img width="668" alt="img7" src="https://user-images.githubusercontent.com/40369712/77024355-527c3180-695c-11ea-8f74-d58c9d5c8999.png">
</p>

---

**Nota:** Espere unos mintos mientras el proceso de construcción y despliegue de la aplicación se termina.

---

**b.** Una vez terminado el proceso de despliegue puede dirigirse a Overview, donde podra ver la URL mediante la cual podra acceder al CRUD de MongoDB

<p align="center">
<img width="783" alt="img9" src="https://user-images.githubusercontent.com/40369712/77024952-d682e900-695d-11ea-8724-ffa8b08c8b58.png">
</p>
