const URL = "https://zettita.pythonanywhere.com/"

        // Capturamos el evento de envío del formulario
        document.getElementById('formulario').addEventListener('submit', function (event) {
            event.preventDefault(); // Evitamos que se envie el form 

            let formData = new FormData();
            formData.append('codigo', document.getElementById('codigo').value);
            formData.append('destino', document.getElementById('destino').value);
            formData.append('inicio_vigencia', document.getElementById('inicio_vigencia').value);
            formData.append('fin_vigencia', document.getElementById('fin_vigencia').value);
            formData.append('dias', document.getElementById('dias').value); 
            formData.append('imagen_url', document.getElementById('imagen_url').files[0]);
            formData.append('precio', document.getElementById('precio').value);
            console.log(formData);
            
            fetch(URL + 'destinos', {
                method: 'POST',
                body: formData // Aquí enviamos formData en lugar de JSON
            })
            .then(function (response) {
                if (response.ok) { return response.json(), Swal.fire("SweetAlert2 is working!"); }
            })
            .then(function (data) {
                alert("El producto ha sido cargado correctamente")
                // Limpiar el formulario para el proximo producto
                document.getElementById('codigo').value = "";
                document.getElementById('destino').value = "";
                document.getElementById('inicio_vigencia').value = "";
                document.getElementById('fin_vigencia').value = "";
                document.getElementById('dias').value = "";
                document.getElementById('imagen_url').value = "";
                document.getElementById('precio').value = "";
            })
            .catch(function (error) {
                // Mostramos el error, y no limpiamos el form.
                Swal.fire("Error al cargar destino");
            });
            
        })
        