const URL = "http://127.0.0.1:5000/"

const app = Vue.createApp({
    data() {
        return {
            destino: '',
            inicio: '',
            final: '',
            dias: '',
            precio: '',
            imagen_url: '',
            imagenUrlTemp: null,
            mostrarDatospaquete: false,
        };
    },
    methods: {
        obtenerDestino() {
            fetch(URL + 'destinos/' + this.codigo)
                .then(response => response.json())
                .then(data => {
                    this.destino = data.Destino;
                    this.inicio = data.Inicio_vigencia;
                    this.final = data.Fin_vigencia;
                    this.dias = data.Dias;
                    this.imagen_url =  data.Imagen_url;
                    this.precio = data.Precio;
                    this.mostrarDatospaquete = true;
                })
                .catch(error => console.error('Error:', error));
        },
        seleccionarImagen(event) {
            const file = event.target.files[0];
            this.imagenSeleccionada = file;
            this.imagenUrlTemp = URL.createObjectURL(file); // Crea una URL temporal para la vista previa
        },
        guardarCambios() {
            const formData = new FormData();
            formData.append('Destino', this.destino);
            formData.append('Inicio_vigencia', this.inicio);
            formData.append('Fin_vigencia', this.final);
            formData.append('Dias', this.dias);
            formData.append('Precio', this.precio);

            if (this.imagenSeleccionada) {
                formData.append('Imagen_url', this.imagenSeleccionada, this.imagenSeleccionada.name);
            }

            fetch(URL + 'destinos/' + this.codigo, {
                method: 'PUT',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    alert('paquete actualizado correctamente');
                    this.limpiarFormulario();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al actualizar el paquete');
                });
        },
        limpiarFormulario() {
            this.destino = '';
            this.inicio = '';
            this.final = '';
            this.dias = '';
            this.precio = '';
            this.imagen_url = '';
            this.imagenSeleccionada = null;
            this.imagenUrlTemp = null;
            this.mostrarDatospaquete = false;
        }
    }
});

app.mount('#app');