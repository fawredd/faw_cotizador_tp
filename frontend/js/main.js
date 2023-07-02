/* Este código selecciona el elemento del documento con el id "header" y le asigna un bloque de código HTML para construir una barra de navegación. El código HTML contiene una estructura de navegación típica de una barra de navegación de Bootstrap, con enlaces a diferentes páginas y un formulario de búsqueda. El código se encarga de asignar el contenido HTML al elemento con el id "header", lo que resulta en la visualización de la barra de navegación en ese lugar dentro del documento HTML.
*/
document.getElementById("header").innerHTML = ` 
<nav class="navbar navbar-expand-sm navbar-dark bg-transparent">
<div class="container">
  <a class="navbar-brand" href="productos.html">
    <img src="logo.png" />
  </a>
  <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="collapsibleNavId">
      <ul class="navbar-nav me-auto mt-2 mt-lg-0">
          <li class="nav-item">
              <a class="nav-link active" href="productos.html" aria-current="page">Home <span class="visually-hidden">(current)</span></a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="#" id="menuCotiza">Cotización</a>
          </li>
          <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">CRUD</a>
              <div class="dropdown-menu" aria-labelledby="dropdownId">
                  <a class="dropdown-item" href="producto-create.html">Nuevo produto</a>
              </div>
          </li>
      </ul>

      <form class="d-flex my-2 my-lg-0" name="busqueda" method="POST" action="" id="formularioBusqueda">
          <input class="form-control me-sm-2" type="text" placeholder="Search" name="textoBuscado">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>

  </div>
</div>
</nav>
`;

/* 
Este código selecciona el elemento del documento con el id "footer" y le asigna un bloque de código HTML. 
*/
document.getElementById("Footer").innerHTML = `
<div>
  <!-- Boton de whatsapp -->
  <a href="https://wa.me/5491123456789?text=Hola,%20quiero%20saber%20más%20sobre%20los%20planes%20de%20medicina%20prepaga" target="_blank"><i class="fab fa-whatsapp"></i></a>
  <!-- fin boton whatsapp -->
  <a href="https://www.facebook.com/tubroker" target="_blank"><i class="fab fa-brands fa-facebook"></i></a>
  <a href="https://twitter.com/tubroker" target="_blank"><i class="fab fa-twitter"></i></a>
  <a href="https://www.linkedin.com/company/tubroker" target="_blank"><i class="fab fa-linkedin-in"></i></a>
  <a href="https://www.instagram.com/tubroker" target="_blank"><i class="fab fa-instagram"></i></a>
</div>
<div>
    <p>Sistema de cotizacion</p>
</div>
`;

