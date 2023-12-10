function validar() {

    //Hecha x el grupo 10 de la Comisión 23511 de Codo a Codo
    //Integrantes:
    //Uriel
    //Cristian
    //Melanie
    //Belen
    //Valentina


    let esValido = true
    // flag, si alguno de los campos en invalido se cambia a false
    // al final de la función si aún es True, entonces llama al Submit
    // del formulario, de lo contrario marca los campos invalidos

    let formulario = document.formContacto


    // Definición de las regex para la validación de los campos
    const regexNombre = /^[a-z\s]+$/gmi;
    //regex testeada en https://regex101.com/
    //el formato esperado son letras y espacios
    //^     : desde el principio del string
    //a-z   : caracteres de la "a" a la "z"
    //\s    : espacio
    //+     : 1 o muchos
    //$     : al final del string
    //gmi   : global, multiline, no discrimina mayusculas ni mins

    const regexEmail = /^[a-z0-9]+@[a-z0-9]+(.[a-z0-9]+){1,2}$/gmi;
    //regex testeada en https://regex101.com/
    //el formato esperado es xxxxx@xxxxxx + 1 o 2 .xxxx
    //^     : desde el principio del string
    //a-z   : caracteres de la "a" a la "z"
    //0-9   : números
    //@     : caracter @
    //+     : 1 o muchos
    //{1,2} : 1 o 2 ocurrencias de [a-z0-9]+ par los dominios
    //$     : al final del string
    //gmi   : global, multiline, no discrimina mayusculas ni mins

    const regexTelefono = /^\d{3}\s\d{4}-\d{4}$/gmi;
    //regex testeada en https://regex101.com/
    //el formato esperado es nnn nnnn-nnnnn
    //^     : desde el principio del string
    //\d{3} : 3 digitos, area como 011
    //\s    : caracter espacio
    //\d{4} : 4 digitos
    //-     : guion
    //\d{4} : 4 digitos
    //$     : al final del string



    let nombre = document.forms["formContacto"]["nombre"].value;
    let email = document.forms["formContacto"]["email"].value;
    let telefono = document.forms["formContacto"]["telefono"].value;
    let mensaje = document.forms["formContacto"]["mensaje"].value;

    if (!regexNombre.test(nombre)) {
        console.log("El campo nombre NO es valido (" + nombre + ").");
        document.getElementById("nombre").className = "inputInvalido";
        esValido = false
    } else {
        console.log("El campo nombre es valido (" + nombre + ").")
        document.getElementById("nombre").className = "inputValido";
    }

    if (!regexEmail.test(email)) {
        console.log("El campo email NO es valido (" + email + ").");
        document.getElementById("email").className = "inputInvalido";
        esValido = false
    } else {
        console.log("El campo email es valido (" + email + ").")
        document.getElementById("email").className = "inputValido";
    }


    if (!regexTelefono.test(telefono)) {
        console.log("El campo teléfono NO es valido (" + telefono + ").");
        document.getElementById("telefono").className = "inputInvalido";
        esValido = false
    } else {
        console.log("El campo teléfono es valido (" + telefono + ").")
        document.getElementById("telefono").className = "inputValido";
    }


    if (mensaje == "") { //solo considera invalidos los msgs vacios
        console.log("El campo mensaje NO es valido (" + mensaje + ").");
        document.getElementById("mensaje").className = "inputInvalido";
        esValido = false
    } else {
        console.log("El campo mensaje es valido (" + mensaje + ").")
        document.getElementById("mensaje").className = "inputValido";
    }


    if(esValido){
        alert("Formulario Validado OK")
    } else {
        alert("Formulario Invalido NOK")
    }
}