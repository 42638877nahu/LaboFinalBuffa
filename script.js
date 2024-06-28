const ApiUrl = 'https://api.yumserver.com/17045/products';

document.addEventListener("DOMContentLoaded", function() {
    // MUESTRA ENCABEZADO
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

    // AGREGAMOS EVENTO CLICK AL BOTÓN AGREGAR PASTELES
    const botonAgregarTorta = document.getElementById('agregarTorta');
    if (botonAgregarTorta) {
        botonAgregarTorta.addEventListener('click', function() {
            const titulo = document.getElementById('titulo').value;
            const precioPeso = document.getElementById('precioPeso').value;
            const precioDolar = document.getElementById('precioDolar').value;
            const fecha = document.getElementById('fecha').value;

            const pastel = {
                titulo: titulo,
                precioPeso: precioPeso,
                precioDolar: precioDolar,
                fecha: fecha
            };

            // SOLICITUD A LA API PARA AGREGAR PASTELES
            fetch(ApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pastel),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al agregar el pastel');
                }
                return response.json();
            })
            .then(data => {
                alert('Pastel agregado correctamente'); 
                obtenerYMostrarProductos(); 
                document.getElementById('formularioalta').reset(); 
            })
            .catch(error => {
                console.error('Error al agregar el pastel:', error);
            });
        });
    }

    // AGREGAMOS EVENTO CLICK AL BOTÓN MOSTRAR
    const botonMostrar = document.getElementById('mostrar');
    if (botonMostrar) {
        botonMostrar.addEventListener('click', function() {
            // OBTENER Y MOSTRAR PRODUCTOS
            obtenerYMostrarProductos();
        });
    }

    // FUNCION PARA MOSTRAR PRODUCTOS
    function MostrarProductos(productos) {
        const tabla = document.getElementById('tablaproductos').querySelector('tbody');
        tabla.innerHTML = '';

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
                    <button class="eliminarbtn" data-id="${producto.idcod}">Eliminar</button> <!-- Botón para eliminar -->
                </td>
            `;
            tabla.appendChild(fila);
        });

        // Agregar evento click a cada botón de eliminar
        const botonesEliminar = tabla.querySelectorAll('.eliminarbtn');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', function() {
                const idcod = boton.getAttribute('data-id');
                eliminarPastel(idcod);
            });
        });
    }

    // Función para obtener y mostrar productos
    function obtenerYMostrarProductos() {
        fetch(ApiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los productos');
                }
                return response.json();
            })
            .then(productos => {
                MostrarProductos(productos);
                document.getElementById('tablaproductos').style.display = 'block';
            })
            .catch(error => console.error('Error al obtener los productos:', error));
    }

    // Función para eliminar un producto por su id
    function eliminarPastel(idcod) {
      const idcodigo = idcod;
      if (confirm(`¿Estás seguro de eliminar el producto con ID ${idcod}?`)) {
        fetch(ApiUrl, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({idcod: idcodigo}),
          })
          .then(response => {
              console.log(response);
              if (!response.ok) {
                  throw new Error('Error al eliminar el producto');
              }
              alert('Producto eliminado correctamente');
              obtenerYMostrarProductos();
          })
          .catch(error => {
              console.error('Error al eliminar el producto:', error);
              alert('Error al eliminar el producto:', error);
          });
      }
  }
});