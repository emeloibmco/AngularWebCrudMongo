<p align="center">
<img width="289" alt="img8" src="https://user-images.githubusercontent.com/40369712/77024696-2f05b680-695d-11ea-82c3-ec06083fd866.png">
 
 ## Despliegue de Mongo BD + node.js CRUD
</p>


Laboratorio para el aprovisionamiento de un servicio persistente de Mongo DB y su conexión con una app crud en node.js

## Requerimentos para la ejecucion de la guia :pushpin:


*	Tener una cuenta de IBM Cloud.
*	Contar con un cluster de Openshift.

## Indice :scroll:
---

* Crear un nuevo proyecto en el cluster de Openshift
* Aprovisione el servicio Mongo DB en un contenedor de Opeshift
* Configure las variables de entorno para la conexión del CRUD con el servicio de Mongo DB
* Despliegue de la aplicación CRUD node.js

---
## 1. Crear un nuevo proyecto en el cluster de Openshift 🛠️

**a.**	Una vez abierta la consola web de Openshift presione "Create Project" y llene los campos con el nombre y la descripción del proyecto.

<p align="center">
<img width="278" alt="Annotation 2020-03-18 181640" src="https://user-images.githubusercontent.com/40369712/77016805-c57aad80-6946-11ea-83b3-c043412dcba1.png">
</p>

## 2. Aprovisione el servicio Mongo DB en un contenedor de Opeshift 🛠️

### Opción 1 - Desplegar servicio
**a.**  Seleccione el proyecto que acabe de crear, presione "Browse Catalog" y seleccione el servicio de MongoDB.

<p align="center">
<img width="790" alt="img2" src="https://user-images.githubusercontent.com/40369712/77017187-c3651e80-6947-11ea-9e32-e45080035016.png">
</p>

Una vez detro del catalogo podra ver todas las opciones disponibles para el despliegue de aplicaciones y servicios, dentro de estas encontrara MongoDB y MongoDB(Ephemeral) que corresponden a los servicios de datos persistentes y efímeros, seleccione el servicio MongoDB.

**b.**	Presione "Next" y proporcione las credenciales de acceso para su servicio de MongoDB.

Para fines practicos, el cluster ya cuenta con un servicio de MongoDB al que podra conectarse si no desea crear uno nuevo, las credenciales de conexión, de este se pueden ver a continuación.

<p align="center">
<img width="608" alt="mongo" src="https://user-images.githubusercontent.com/60987042/77779686-e61ac580-7020-11ea-8c64-c911d360774a.PNG">
 
---

**Nota:** Debe tener en cuenta que el servicio de MongoDB no queda expuesto publicamente, por lo que solo podra realizarse la conexión con este, una vez la aplicacion se encuentre desplegada en el cluster de Openshift

---
Una vez igresadas las credenciales, presiones "Next" y luego "Create", espere unos minutos mientas se aprovisiona su servicio de base de datos MongoDB

### Opción 2 - Desplegar imagen
En caso de que su clúster no cuente con la opción para seleccionar MongoDB (por tema de versiones y actualizaciones, por ejemplo en clúster de versión 4.8) deberá completar los siguientes pasos para desplegar una imagen de la base de datos, y así utilizarla en el ejercicio. Realice lo siguiente:
 
**a.** Dentro de su cuenta de *IBM Cloud* acceda al ```IBM Cloud Shell``` dando click en la pestaña <a href="https://cloud.ibm.com/shell"> <img width="25" src="https://github.com/emeloibmco/Red-Hat-Open-Shift-Load-Balancer/blob/main/Cluster%20images/Shell_IBM.png"></a>, que se ubica en la parte superior derecha del portal. 

<p align="center"><img src="https://github.com/emeloibmco/Red-Hat-Open-Shift-Load-Balancer/blob/main/Cluster%20images/IBMCloudShell.png"></p>

**b.** Ingrese a la consola web de OpenShift presionando el botón ```OpenShift web console```. 

<p align="center"><img src="https://github.com/emeloibmco/Red-Hat-Open-Shift-Load-Balancer/blob/main/Cluster%20images/AccederConsolaOC.PNG"></p>

**c.** De click sobre su correo (parte superior derecha) y luego en la opción ```Copy Login Command```. Una vez cargue la nueva ventana, de click en la opción ```Display Token```. Copie el comando que sale en la opción ```Log in with this token``` y colóquelo en el IBM Cloud Shell para iniciar sesión y acceder a su clúster de OpenShift.

<p align="center"><img src="https://github.com/emeloibmco/Red-Hat-Open-Shift-Load-Balancer/blob/main/Cluster%20images/TokenFinal.gif"></p>

**d.** Acceda al proyecto creado en IBM Cloud Shell. Para ello utilice el comando:

   ```powershell
   oc project <nombre_proyecto>
   ```
   
**e.** Despliegue una imagen de MongoDB con el comando:

 ```
 oc new-app -e MONGODB_USER=admin -e MONGODB_PASSWORD=secret -e MONGODB_DATABASE=mongo_db -e MONGODB_ADMIN_PASSWORD=very-secret registry.access.redhat.com/rhscl/mongodb-36-rhel7
 ```
 
 <p align="center">
 <img src="https://github.com/emeloibmco/OpenShift-AngularWebCRUDMongo/blob/master/Images/DesplegarMongo.PNG">
 </p>
 
 **f.** Visualice los pods y obtenga el estado para verificar que está corriendo sin problemas. Utilice el comando:
 
  ```
  oc get pods
  ```
  
  <p align="center">
  <img src="https://github.com/emeloibmco/OpenShift-AngularWebCRUDMongo/blob/master/Images/oc_get_mongo.PNG">
  </p>
  
 **g.** Ingrese a la base de datos desde el IBM Cloud Shell para verificar que está funcionando. Para ello coloque:
 
  ```
  oc rsh nombre_pod
  ```
  
  ```
  mongo -u admin -p very-secret admin
  ```

  <p align="center">
  <img src="https://github.com/emeloibmco/OpenShift-AngularWebCRUDMongo/blob/master/Images/Acceso_mongo.PNG">
  </p>
 
<br />
 
## 3.	Configure las variables de entorno para la conexión del CRUD con el servicio de MongoDB 🛠️

---

Antes de modificar el archivo de conexión de la aplicación, es necesario conocer la IP del pod donde se ha desplegado el servicio de la base de datos para eso podemos seguir los siguientes pasos:

---

**a.** Seleccione el pod de la base de datos.

**b.** Identifique la Ip del pod, la cual debera ser asignada en la configuración de la conexión de la aplicación. Aparece en la pestaña ```details```.

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

Si desplegó la imagen coloque:
```
const mongoURL = process.env.MONGO_URL || '<Ip_del_pod>';
const mongoUser = process.env.MONGO_USER || 'admin';
const mongoPass = process.env.MONGO_PASS || 'very-secret';
const mongoDBName = process.env.MONGO_DB_NAME || 'admin';
```


Luego suba la aplicación a una nuevo repositorio y guarde la URL.
<br />

## 4.	Despliegue de la aplicación CRUD node.js 🛠️

**a.** En el mismo proyecto donde desplegó la base de datos, seleccione la pestaña ```+ Add``` ➡ ```From Git```.

<p align="center">
<img width="668" alt="img7" src="https://github.com/emeloibmco/OpenShift-AngularWebCRUDMongo/blob/master/Images/GitBackEnd.PNG">
</p>

**b.** Proporcione la URL del git donde se encuentra el proyecto a desplegar y presione "Create", seleccione la imagen **Node.js**. Indique aplicación y nombre, luego deje los demás campos como se muestran por defecto y de click en el botón ```Create```.

---

**Nota:** Espere unos mintos mientras el proceso de construcción y despliegue de la aplicación se termina.

---

**c.** Una vez terminado el proceso de despliegue, de click en Open URL para poder ver la el enlace mediante la cual podra acceder al CRUD de MongoDB. Agregue al final de la ruta el path ```/api/customers```.

<p align="center">
<img width="783" alt="img9" src="https://github.com/emeloibmco/OpenShift-AngularWebCRUDMongo/blob/master/Images/OpenURL.PNG">
</p>

> NOTA: En caso de que la ruta no entregue ninguna respuesta, realice lo que se indica en el paso 5. Aún asi, para la conexión con el backend utilice la ruta indicada en Open URL.

<br />

## 5. Prueba del backend con port-froward
**a.** Obtenga el nombre del pod de la aplicación con el comando
 
 ```
 oc get pods
 ```
 **b.** Luego coloque el comando:
 
 ```
 oc port-forward nombre_pod 8080:8080
 ``` 
 
 <p align="center">
 <img width="783" alt="img9" src="https://github.com/emeloibmco/OpenShift-AngularWebCRUDMongo/blob/master/Images/Port-forward.PNG">
 </p>
 
 **c.** En una ventana del anevgador coloque 
   
 ```
 localhost:8080/api/customers
 ```
 
 **d.** Debe encontrar como respuesta [ ] si no hay ningún dato.
 
 <p align="center">
 <img width="783" alt="img9" src="https://github.com/emeloibmco/OpenShift-AngularWebCRUDMongo/blob/master/Images/prueba_backend.PNG">
 </p>

## Autores ✒️

_Equipo IBM Cloud Tech sales Colombia._
