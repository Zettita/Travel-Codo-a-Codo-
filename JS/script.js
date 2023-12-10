window.addEventListener('load', () => {


    let lat = null;
    let lon = null;

    const cardClima = document.getElementById('climaSection')

    const nombreCiudad = document.getElementById('ciudadNombre')
    const grados = document.getElementById('grados');
    const descripcion = document.getElementById('descripcionClima');
    const iconoClima = document.getElementById('iconoClima');

    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(posicion => {
        
        lat = posicion.coords.latitude
        lon = posicion.coords.longitude

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&units=metric&lon=${lon}&lang=es&appid=4722fff9f195c129e8f8fe9a99cd16bb`

        fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
        
            let temp = datos.main.temp;
            grados.innerText = `${temp} °C`;

            let desc = datos.weather[0].description.toUpperCase()
            descripcion.innerText = `${desc}`

            let icono = datos.weather[0].icon
            iconoClima.setAttribute('src', `https://openweathermap.org/img/wn/${icono}.png`)

            let ciudad = datos.name
            nombreCiudad.innerText = `${ciudad}`
        })
       });
    
   
    }
});