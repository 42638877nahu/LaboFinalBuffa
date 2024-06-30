document.addEventListener("DOMContentLoaded", function() {
    const btnAgregar = document.getElementById("btnAgregar");

    btnAgregar.addEventListener("click", function() {
        agregarProducto();
    });

    async function agregarProducto() {
        const nombre = document.getElementById("nombre").value;
        const precioPeso = document.getElementById("precioPeso").value;
        const precioDolar = document.getElementById("precioDolar").value;
        const fecha = document.getElementById("fecha").value;

        const producto = {
            titulo: nombre,
            precioPeso: precioPeso,
            precioDolar: precioDolar,
            fecha: fecha
        };

        try {
            // Agregar producto a la API
            const productoAgregado = await agregarProductoEnAPI(producto);
            console.log("Producto agregado correctamente:", productoAgregado);
            alert("Producto agregado correctamente");

            // Después de agregar el producto correctamente
            document.getElementById('formularioalta').reset();


        } catch (error) {
            console.error("Error al agregar el producto:", error);
            alert("Error al agregar el producto");
        }
    }

    async function agregarProductoEnAPI(producto) {
        const apiUrl = 'https://api.yumserver.com/17045/products';
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
        })
        
    }

    

});


