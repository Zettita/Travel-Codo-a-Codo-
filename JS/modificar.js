const URL = "https://zettita.pythonanywhere.com/"

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
                    this.destino = data.destino;
                    this.inicio = data.inicio_vigencia;
                    this.final = data.fin_vigencia;
                    this.dias = data.dias;
                    this.imagen_url =  data.imagen_url;
                    this.precio = data.precio;
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
            formData.append('destino', this.destino);
            formData.append('inicio_vigencia', this.inicio);
            formData.append('fin_vigencia', this.final);
            formData.append('dias', this.dias);
            formData.append('precio', this.precio);

            if (this.imagenSeleccionada) {
                formData.append('imagen_url', this.imagenSeleccionada, this.imagenSeleccionada.name);
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