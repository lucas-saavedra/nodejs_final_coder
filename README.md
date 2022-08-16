
# _Curso Backend - MERN Stack: Proyecto Final_

## _E-commerce project_

Desarrollarás el backend de una aplicación de **e-commerce** para poder vender productos de un rubro a elección.
User story/brief:

- Contendrá las rutas necesarias que permitan listar los productos existentes, ingresar productos nuevos, borrar y modificar sus detalles, así como interactuar con el carrito de compras.
- Se implementará una API RESTful con los verbos get, post, put y delete para cumplir con todas las acciones necesarias.
- [x] Debe brindar al frontend un mecanismo de ingreso autorizado al sistema basado en JWT (Json Web Token).
- [x] Los productos ingresados se almacenarán en una base de datos MongoDB.
- [x] El usuario podrá registrar sus credenciales de acceso (email y password) para luego poder ingresar a su cuenta. Estas credenciales serán guardadas en la base de datos MongoDB encriptando la contraseña.
- [x] El cliente tendrá una sesión activa de usuario con tiempo de expiración configurable.
- Implementarás un canal de chat basado en websockets, el cual permita atender las consultas del cliente.
- [x] La arquitectura del servidor estará basada en capas (MVC)
- El servidor podrá tomar configuraciones desde un archivo externo.
- Dispondrá de una vista creada con pug, que permita ver la configuración del servidor.
- Se enviará un mail a una casilla configurable, por cada registro nuevo de usuario y con cada orden de compra generada.
- En caso de detectar algún error, el servidor enviará una vista implementada con ejs, que contenga el id y el detalle completo

## Rutas

  | AUTH    | Metodo | Ruta                      | Descripción                                               | Body |
  | ------- | ------ | ------------------------- | --------------------------------------------------------- | ---- |
  | Session | GET    | /chat                     | Rendeiza un listado de chats del sevridor y permite escribir consultas         |      |
  | Session | GET    | /mensajes                 | Rendeiza un listado de chats del usuario                   |      |
  | Session | GET    | /productos                | Devuelve la lista de productos                     |      |
  | Session | GET    | /productos/${producto_id} | Devuelve un producto con sus detalles por su ID    |      |
  | Session | GET    | /carrito                  | Mustra el carrito del cliente en session           |      |
  | Session | POST   | /carrito/clear            | Limpia el carrito del cliente  en session          |      |
  | Session | POST   | /checkout                 | Realiza el pedido de la orden con los productos    |      |
  | Admin   | GET    | /serverconfigs            | Se pueden consultar las configuraciones del server |      |
  |    | GET    | /auth/logout            | Desloguea al usuario y elimina la sesion |      |

Requisitos base

- **Inicio:** Al momento de requerir la ruta base **&#39;/&#39;**
  
- [x]  Permitir un menú de ingreso al sistema con email y password así como también la posibilidad de registro de un nuevo usuario.
- [x]  El menú de registro consta del nombre completo del cliente, número telefónico, email y campo de password duplicado para verificar coincidencia.
- [x]  Si un usuario se loguea exitosamente o está en sesión activa, la ruta &#39;/&#39; hará una re dirección a la ruta del carrito **/productos**
- [x]  La ruta **/productos** devolverá el listado de todos los productos disponiblespara la compra.
- [x] La ruta **/productos/?categoria={categoria}** devolverá los productos por la categoría requerida.
- [x]  Los ítems podrán ser agregados al carrito de compras y listados a través de la ruta **/carrito**.
- [x] Se podrán modificar y borrar por su id a través de la ruta **/carrito:id**.

- **Flow:** Se puede solicitar un producto específico con la ruta **/productos/:id** , donde **id** es el id del item generado por MongoDB y devolver la descripción del producto ( foto, precio, selector de cantidad).
- Si se ingresa a **/productos/:id** y el producto no existe en MongoDB, debemos responder un mensaje adecuado que indique algo relacionado a que el producto no existe.

- **MongoDB** :
  - Implementar al menos estas colecciones:
    - [x] **usuarios:** clientes registrados
    - [x] **productos:** catálogo completo
      - Precio unitario
      - Descripción
      - Categoría

    - [x] **mensajes:** chat del usuario (preguntas y respuestas)
      - Email: del usuario que pregunta o al que se responde
      - Tipo (&#39;usuario&#39; para preguntas ó &#39;sistema&#39; para respuestas)
      - Fecha y hora
      - Cuerpo del mensaje

    - [x] **Carrito:** orden temporal de compra
      - Email: del usuario que pregunta o al que se responde
      - Fecha y hora
      - Items con sus cantidades
      - Dirección de entrega  
    - [x] **Ordenes:** las órdenes generadas, que deben incluir los productos, descripciones y los precios **al momento de la compra.**
      - Ítems: las órdenes deben poder tener productos surtidos, cada uno con su cantidad. Por ejemplo: remeras x 2 y gorra x 1
      - Número de orden: Se extrae de la cantidad de órdenes almacenadas
      - Fecha y hora
      - estado ( por defecto en &#39;generada&#39;)
      - Email de quién realizó la orden
  
- [x] Finalizada la orden, enviar un mail a la dirección de mi cuenta con los detalles de la orden.
- [x] Se dispondrá de un archivo de configuración externo con opciones para desarrollo y otras para producción, que serán visualizadas a través de una vista construida con pug
- [ ] Vamos a contar con un canal de chat general donde el usuario enviará los mensajes en la ruta **/chat** y en **/chat/:email** podrá ver sólo los suyos. Se utilizará la colección **mensajes** en MongoDB. La tecnología de comunicación a utilizar será Websockets. El servidor implementará una vista, utilizando handlebars, para visualizar todos los mensajes y poder responder individualmente a ellos, eligiendo el email de respuesta.
