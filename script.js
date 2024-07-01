document.addEventListener("DOMContentLoaded", function() {
    const tablaProductos = document.getElementById("tablaproductos").querySelector("tbody");
    const apiURL = "https://api.yumserver.com/17045/products";

    // Función para obtener productos desde la API
    async function obtenerProductos() {
        try {
            const response = await fetch(apiURL);
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            const productos = await response.json();
            mostrarProductos(productos);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    }

    // Función para mostrar productos en la tabla
    function mostrarProductos(productos) {
        tablaProductos.innerHTML = ""; // Limpiar el cuerpo de la tabla antes de agregar los productos

        productos.forEach(producto => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${producto.idcod}</td>
                <td>${producto.titulo}</td>
                <td>${producto.precioPeso}</td>
                <td>${producto.precioDolar}</td>
                <td>${producto.fecha}</td>
                <td>
                <button class="editar-btn" onclick="mostrarFormularioEdicion('${producto.idcod}', '${producto.titulo}', '${producto.precioPeso}', '${producto.precioDolar}', '${producto.fecha}')">Editar</button>
                <button class="eliminarbtn" data-id="${producto.idcod}">Eliminar</button>
                </td>
            `;

            // Agregar evento click al botón Eliminar de esta fila
            const btnEliminar = fila.querySelector(".eliminarbtn");
            btnEliminar.addEventListener("click", function() {
                const idProducto = btnEliminar.getAttribute("data-id");
                eliminarProducto(idProducto);
            });


            tablaProductos.appendChild(fila);
        });

        // Mostrar la tabla una vez que los productos han sido agregados
        tablaProductos.parentElement.style.display = "table";
    }
    

    // Función para eliminar un producto por su id
    async function eliminarProducto(idProducto) {
        if(confirm('¿Seguro que va a eliminar el producto?')){
            try {
                const response = await fetch(apiURL, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({idcod: idProducto}),
                    })
                    
                
                obtenerProductos(); // Actualizar la lista de productos después de eliminar
                alert('Producto eliminado correctamente');
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                alert("Error al eliminar el producto:", error.message);
            }
        }
        else{
            console.log('Eliminar cancelado');
        }
       
    }

    const btnGuardarCambios = document.getElementById('guardarCambios');
    btnGuardarCambios.addEventListener('click', function() {
        const id = document.getElementById('idcod').value;
        const titulo = document.getElementById('titulo-editar').value;
        const precioPeso = document.getElementById('precioPeso-editar').value;
        const precioDolar = document.getElementById('precioDolar-editar').value;
        const fecha = document.getElementById('fecha-editar').value;

        const productoActualizado = {
            idcod: id,
            titulo: titulo,
            precioPeso: precioPeso,
            precioDolar: precioDolar,
            fecha: fecha
        };

        // Enviar solicitud PATCH a la API para actualizar el producto
        fetch(apiURL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productoActualizado),
            
        })
        
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            }
            
            obtenerProductos()
            ocultarFormularioEdicion()
            alert('Producto guardado correctamente');
        })
        .catch(error => {
            console.error('Error al actualizar el producto:', error);
            alert('Error al actualizar el producto:', error);
        });
    });

    //Abre el modal 
    window.mostrarFormularioEdicion = function(id, titulo, precioPeso, precioDolar, fecha) {
        document.getElementById('idcod').value = id;
        document.getElementById('titulo-editar').value = titulo;
        document.getElementById('precioPeso-editar').value = precioPeso;
        document.getElementById('precioDolar-editar').value = precioDolar;
        document.getElementById('fecha-editar').value = fecha;

        const modal = document.getElementById('modal-edicion');
        modal.style.display = 'block';
    }

    function ocultarFormularioEdicion() {
        const modal = document.getElementById('modal-edicion');
        modal.style.display = 'none';
    }

    // Cerrar el modal cuando se hace clic en la "x"
    document.querySelector(".close").addEventListener("click", ocultarFormularioEdicion);

    // Cerrar el modal cuando se hace clic fuera del modal
    window.addEventListener("click", function(event) {
        const modal = document.getElementById('modal-edicion');
        if (event.target == modal) {
            ocultarFormularioEdicion();
        }
    });

    obtenerProductos(); // Obtener y mostrar productos al cargar la página


});




