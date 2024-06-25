const ApiUrl = 'https://api.yumserver.com/17045/products';

document.addEventListener("DOMContentLoaded", function() {
    fetch('encabezado.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar el encabezado: ' + response.statusText);
        }
        return response.text();
    })
      .then(data => {
        document.getElementById('encabezado').innerHTML = data;
    })
      .catch(error => {
        console.error(error);
    });

    fetch(ApiUrl)
    .then(response => response.json())
    .then(MostrarProductos)
    .catch(error => console.error('Error:', error));

    function MostrarProductos(productos){
        const tabla = document.getElementById('tabla-productos').querySelector('tbody');
        tabla.innerHTML = ''; // Limpia la tabla
        
        productos.forEach(producto => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
              <td>${producto.idcod}</td>
              <td>${producto.titulo}</td>
              <td>${producto.precioPeso}</td>
              <td>${producto.precioDolar}</td>
              <td>${producto.fecha}</td>
              <td>
                <button onclick="mostrarFormularioEdicion('${producto.idcod}')">Editar</button>
                <button onclick="confirmarEliminacion('${producto.idcod}')">Eliminar</button>
              </td>
            `;
            tabla.appendChild(fila);
        });

    }

});


  

  