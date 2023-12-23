const URL = "https://zettita.pythonanywhere.com/";

const app = Vue.createApp({
  data() {
    return {
      destinos: [],
    };
  },
  methods: {
    obtenerDestinos() {
      // Obtenemos el contenido del inventario
      fetch(URL + "destinos")
        .then((response) => {
          // Parseamos la respuesta JSON
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          // El código Vue itera este elemento para generar la tabla
          this.destinos = data;
          console.log(this.destinos);
        })
        .catch((error) => {
          console.log("Error:", error);
          alert("Error al obtener los destinos.");
        });
    },
    eliminarDestino(codigo) {
      Swal.fire({
        title: "¿Estas seguro?",
        text: "Este cambio no sera reversible",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Eliminado!",
            text: "El destino ha sido eliminado",
            icon: "success",
            timer: 1500,
          });
          setTimeout(() => {
            fetch(URL + `destinos/${codigo}`, { method: "DELETE" }).then(
              (response) => {
                if (response.ok) {
                  this.destinos = this.destinos.filter(
                    (destino) => destino.codigo !== codigo
                  );
                }
              }
            );
          }, "2000");
        }
      });

      // if (confirm('¿Estás seguro de que quieres eliminar este destino?')) {
      //     fetch(URL + `destinos/${codigo}`, { method: 'DELETE' })
      //         .then(response => {
      //             if (response.ok) {
      //                 this.destinos = this.destinos.filter(destino => destino.codigo !== codigo);
      //                 alert('Producto eliminado correctamente.');
      //             }
      //         })
      //         .catch(error => {
      //             alert(error.message);
      //         });
      // }
    },
  },
  mounted() {
    //Al cargar la página, obtenemos la lista de productos
    this.obtenerDestinos();
  },
});

app.mount("#cardsContainer");
