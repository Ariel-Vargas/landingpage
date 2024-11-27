const databaseURL = 'https://landing2-f3d3a-default-rtdb.firebaseio.com/data.json';

let sendData = () => {

    // Obtén los datos del formulario
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Convierte FormData a objeto
    data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' })

    fetch(databaseURL, {
        method: 'POST', // Método de la solicitud
        headers: {
            'Content-Type': 'application/json' // Especifica que los datos están en formato JSON
        },
        body: JSON.stringify(data) // Convierte los datos a JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json(); // Procesa la respuesta como JSON
        })
        .then(result => {
            alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces'); // Maneja la respuesta con un mensaje
            form.reset();
            getData();
        })
        .catch(error => {
            alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        });

}

let getData = async () => {
    try {
        // Realiza la petición fetch a la URL de la base de datos
        const response = await fetch(databaseURL);

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
            return;
        }

        // Convierte la respuesta en formato JSON
        const data = await response.json();

        if (data != null) {
            // Cuenta el número de personas que eligieron cada película favorita
            let countMovies = new Map();

            if (Object.keys(data).length > 0) {
                for (let key in data) {
                    let { email, saved, favoriteMovie } = data[key];
                    
                    let count = countMovies.get(favoriteMovie) || 0;
                    countMovies.set(favoriteMovie, count + 1);
                }
            }

            // Genera y agrega filas de una tabla HTML para mostrar películas y cantidades de personas que las eligieron
            if (countMovies.size > 0) {
                const peliculaTableBody = document.getElementById('pelicula');
                peliculaTableBody.innerHTML = '';

                let index = 1;
                for (let [movie, count] of countMovies) {
                    let rowTemplate = `
                        <tr>
                            <th scope="row">${index}</th>
                            <td>${movie}</td>
                            <td>${count}</td>
                        </tr>`;
                    peliculaTableBody.innerHTML += rowTemplate;
                    index++;
                }
            }
        }

    } catch (error) {
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
    }
}




let ready = () => {
    console.log('DOM está listo');
    getData();
}

let loaded = () => {
    console.log('Iframes e Images cargadas')
    let myform = document.getElementById('form');
    myform.addEventListener('submit', (eventSubmit) => {
        eventSubmit.preventDefault();

        const emailElement = document.querySelector('.form-control-lg');

        const emailText = emailElement.value;

        if (emailText.length === 0) {
            emailElement.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(25px)" },
                    { transform: "translateX(-25px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 400,
                    easing: "linear",
                }
            )
            emailElement.focus()
            return
        }

        sendData();
    })

}



//window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded);