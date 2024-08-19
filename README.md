# ic-registegic

#  Client
El cliente utiliza las siguientes librerias:
* Firebase - v9.18.0
    * Para la autenticacion por medio de correo electronico y contraseña
    * El envio de correos con las credenciales de la persona registrada
*Reac-Email - v1.9.1
    * Esta libreria crea un proyecto dentro de el proyecto principal que nos facilita la visualizacion de las plantillas de correo que estamos creando sin necesidad de tener que enviarnos correo a cada momento
    * Si deseas crear una nueva plantilla de correo deberas crearla en **client/src/components/Email**
    *Visita la documentacion oficial para que conozcas los componentes permitidos por esta libreria: **https://react.email/docs/introduction**
*React-PDF - v3
 *  Nos permite crear una plantilla de PDF utilizando componentes de React
 * Si deseas crear una nueva plantilla PDF debes crearla en **src/client/components/PDF** y despues consumirlo en    donde lo necesites o enviarle la informacion que deseas mostrar
 * Visita la documentacion oficial para que conozcas los componentes permitidos por esta libreria: **https://react-pdf.org/**
*React-Router
*Tanstack Table


## modules

### operator
---
** Lugares de uso de enviroments  **
> nota se tienen dos variables una con la api de produccion y otra con la de development, aun no he encontrado la forma de que se asigne de manera automatica como en angularm Eso esta pendiente Por lo que se debera cambiar la api de produccion cada que se desarrolle una nueva funcionalidad y si ya esta en el sever dejar la de produccion, de todo modos apnta al el railway de desarrollo.
 - Login: client/src/components/Auth/login
 - Vehicle: client/src/components/operator-layout/trade-enter/vehicle/vehicle
---
admin
guest(optional)
