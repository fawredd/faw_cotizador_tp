const { createApp } = Vue;

// Crea una instancia de la aplicación Vue
createApp({
  data() {
    /* El código define una instancia de la aplicación Vue. Aquí se especifican los datos utilizados por la aplicación, incluyendo la lista de productos, la URL del backend, indicadores de error y carga, así como los atributos para almacenar los valores del formulario de producto.
     */
    return {
      productos: [], // Almacena los productos obtenidos del backend
      // url:'http://localhost:5000/productos', // URL local
      url: "https://fawredd.pythonanywhere.com/productos", // URL del backend donde se encuentran los productos
      error: false,
      cargando: true,
      // Atributos para el almacenar los valores del formulario
      id: 0,
      nombre: "",
      imagen: "",
      stock: 0,
      precio: 0,
      // Productos cotizados
      productosCotizados: [],
      // Componente actual
      tablaActual: 1,
      titulo: "Stock",
      tituloTabla: "Productos"
      };
  },
  methods: {
    fetchData(url) {
      /**El método fetchData realiza una solicitud HTTP utilizando la función fetch a la URL especificada. Luego, los datos de respuesta se convierten en formato JSON y se asignan al arreglo productos. Además, se actualiza la variable cargando para indicar que la carga de productos ha finalizado. En caso de producirse un error, se muestra en la consola y se establece la variable error en true.
      **/
      fetch(url)
        .then((response) => response.json()) // Convierte la respuesta en formato JSON
        .then((data) => {
          // Asigna los datos de los productos obtenidos al arreglo 'productos'
          this.productos = data;
          this.cargando = false;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },
    eliminar(producto) {
      /* El método eliminar toma un parámetro producto y construye la URL para eliminar ese producto en particular. Luego, realiza una solicitud fetch utilizando el método HTTP DELETE a la URL especificada. Después de eliminar el producto, la página se recarga para reflejar los cambios.
       */
      // Construye la URL para eliminar el producto especificado
      const url = this.url + "/" + producto;
      var options = {
        method: "DELETE", // Establece el método HTTP como DELETE
      };
      fetch(url, options)
        .then((res) => res.text()) // Convierte la respuesta en texto (or res.json())
        .then((res) => {
          location.reload(); // Recarga la página actual después de eliminar el producto
        });
    },
    grabar() {
      /* El método grabar se encarga de guardar los datos de un nuevo producto en el servidor. Primero, se crea un objeto producto con los datos ingresados en el formulario. Luego, se configuran las opciones para la solicitud fetch, incluyendo el cuerpo de la solicitud como una cadena JSON, el método HTTP como POST y el encabezado Content-Type como application/json. Después, se realiza la solicitud fetch a la URL especificada utilizando las opciones establecidas. Si la operación se realiza con éxito, se muestra un mensaje de éxito y se redirige al usuario a la página de productos. Si ocurre algún error, se muestra un mensaje de error.
       */
      // Crear un objeto 'producto' con los datos del formulario
      let producto = {
        nombre: this.nombre,
        precio: this.precio,
        stock: this.stock,
        imagen: this.imagen,
      };

      // Configurar las opciones para la solicitud fetch
      var options = {
        body: JSON.stringify(producto), // Convertir el objeto a una cadena JSON
        method: "POST", // Establecer el método HTTP como POST
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };

      // Realizar una solicitud fetch para guardar el producto en el servidor
      fetch(this.url, options)
        .then(function () {
          alert("Registro grabado!");
          window.location.href = "./productos.html"; // Redirigir a la página de productos
        })
        .catch((err) => {
          console.error(err);
          alert("Error al Grabar.");
        });
    },
    mostrarCotizacion() {
      if (this.tablaActual==1){
        this.tablaActual = 2;
        this.titulo = "Acumulado";
        document.getElementById("elBoton").classList.toggle("btn-primary");
        document.getElementById("elBoton").classList.toggle("btn-success");
        this.tituloTabla = "Productos cotizados";
      }else{
        this.tablaActual = 1;
        this.titulo = "Stock";
        document.getElementById("elBoton").classList.toggle("btn-primary");
        document.getElementById("elBoton").classList.toggle("btn-success");
        this.tituloTabla = "Productos";
      }
    },
    // Agrega un producto a la lista de cotizados
    agregarACotizacion(producto) {
      this.productosCotizados.push(producto);
      sessionStorage.setItem('cotizados',JSON.stringify(this.productosCotizados));
    },
    // Elimina un producto a la lista de cotizados mediante su ID
    eliminarDeCotizacion(productoId) {
        // Busca el índice del producto con el ID correspondiente en la lista
        const index = this.productosCotizados.findIndex(producto => producto.id === productoId);
        // Si se encontró el producto, elimínalo de la lista
        if (index !== -1) {
          this.productosCotizados.splice(index, 1);
          console.log("Se elimino el producto" + producto + " en pos " + index)
        }
    }
  },
  created() {
    this.fetchData(this.url);
    
    //this.productosCotizados = JSON.parse(sessionStorage.getItem('cotizados'));
    
    var elVue = this;
    
    document.getElementById("formularioBusqueda").addEventListener("submit", function (event) {
      // Evitar que el formulario se envíe de forma predeterminada
      event.preventDefault();
    
      // Obtener el valor del campo de búsqueda
      var textoBuscado = document.getElementsByName("textoBuscado")[0].value;
      if(textoBuscado!=""){
      
        elVue.cargando = true;
      
        // Realizar una solicitud fetch para enviar los datos del formulario a la ruta Flask
        fetch("https://fawredd.pythonanywhere.com/productos/find/" + textoBuscado )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            // Mostrar los productos que coinciden con el término de búsqueda
            elVue.productos = data;
            elVue.cargando = false;
            elVue.tituloTabla = "Productos filtrados cuyo nombre contienen el texto " + textoBuscado;
          })
          .catch((err) => {
            console.error(err);
            elVue.error = true;
            alert("Error al buscar productos.");
          });
      } else {
        elVue.tituloTabla = "Productos"
        elVue.fetchData(elVue.url);

      }
    });

    document.getElementById("menuCotiza").addEventListener("click", function (event) {
      // Evitar que el formulario se envíe de forma predeterminada
      event.preventDefault();
      elVue.mostrarCotizacion();
    });
  },
  computed: {
    sumaTotal() {
      return this.productosCotizados.reduce((sum, producto) => sum + producto.precio, 0);
    },
    textoBoton() {
      var devolver = "-";
      if(this.tablaActual==1){
        devolver = `Mostrar cotización. Items agregados (${this.productosCotizados.length})`;
      } else {
        devolver = `Mostrar productos. Items cotizados (${this.productosCotizados.length})`;
      }
      return devolver;
    }
  }
}).mount("#app");