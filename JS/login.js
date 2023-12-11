const user = "ADMIN";
const password = "1532";

const form = document.getElementById("formLogin");
const usuario = document.getElementById("usuario");
const contraseña = document.getElementById("contraseña");
const boton = document.getElementById("buttonSubmit");

console.log(usuario);

const login = (e) => {
    e.preventDefault();

    if (usuario.value !== user){
        Swal.fire({
            icon: "error",
            title: "Algo anda mal...",
            text: "Verifica el nombre de usuario",
          });
        throw new Error('Usuario inorrecto')
    };
    if (contraseña.value !== password){
        Swal.fire({
            icon: "error",
            title: "Algo anda mal...",
            text: "Verifica tu contraseña",
          });
        throw new Error('Contraseña inorrecto')
    };
    
    return Swal.fire({
        icon: "success",
        title: "Bienvenido",
        showConfirmButton: false,
        timer: 1500
      }), setTimeout(() => {
        window.location.href="indexadmin.html";
      }, "2000"); 
      
    
    };    



boton.addEventListener("click", login);