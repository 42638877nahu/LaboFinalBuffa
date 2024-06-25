document.addEventListener('DOMContentLoaded', llenarTablaProductos);

const producto = {
  titulo: '',
  precioPeso: 0,
  precioDolar: 0,
  fecha: null
};

async function llenarTablaProductos() {
  try {
    const productos = await getProductos();
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
  } catch (error) {
    console.error('Error al llenar la tabla de productos:', error);
  }
}

const agregarbtn = document.getElementById('agregarTorta').addEventListener('click', agregar)

async function agregar(event){
  event.preventDefault();

  producto.titulo = document.getElementById('titulo').value
  producto.precioPeso = parseInt(document.getElementById('precioPeso').value)
  producto.precioDolar = parseInt(document.getElementById('precioDolar').value)

  var inputDate = document.getElementById('fecha').value
  var dateObj = new Date(inputDate);

            // Obtener el año, mes y día del objeto Date
            var year = dateObj.getFullYear();
            var month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
            var day = String(dateObj.getDate()).padStart(2, '0');

            // Formatear la fecha en YYYY-MM-DD
            var formattedDate = `${year}-${month}-${day}`;

  producto.fecha = formattedDate
  
  try {
    const result = await addProducto(producto);
    if (result === 'OK') {
      alert('Producto creado exitosamente');
      llenarTablaProductos();
    } else {
      alert(`Error: ${result}`);
    }
  } catch (error) {
    console.error('Error al agregar producto:', error);
  }
}
/*document.getElementById('formulario-alta').addEventListener('submit', async (event) => {
  event.preventDefault();

  const producto = {
    titulo: event.target.titulo.value,
    precioPeso: event.target.precioPeso.value,
    precioDolar: event.target.precioDolar.value,
    fecha: event.target.fecha.value
  };

  try {
    const result = await addProducto(producto);
    if (result === 'OK') {
      alert('Producto creado exitosamente');
      llenarTablaProductos();
    } else {
      alert(`Error: ${result}`);
    }
  } catch (error) {
    console.error('Error al agregar producto:', error);
  }
});*/

document.getElementById('formulario-edicion').addEventListener('submit', async (event) => {
  event.preventDefault();

  const producto = {
    idcod: event.target.idcod.value,
    titulo: event.target.titulo.value,
    precioPeso: event.target.precioPeso.value,
    precioDolar: event.target.precioDolar.value,
    fecha: event.target.fecha.value
  };

  try {
    const result = await updateProducto(producto);
    if (result === 'OK') {
      alert('Producto actualizado exitosamente');
      llenarTablaProductos();
    } else {
      alert(`Error: ${result}`);
    }
  } catch (error) {
    console.error('Error al actualizar producto:', error);
  }
});

async function confirmarEliminacion(idcod) {
  const confirmacion = confirm('¿Estás seguro de que quieres eliminar este producto?');
  if (confirmacion) {
    try {
      const result = await deleteProducto(idcod);
      if (result === 'OK') {
        alert('Producto eliminado exitosamente');
        llenarTablaProductos();
      } else {
        alert(`Error: ${result}`);
      }
    } catch (error) {
      console.error
