const databaseURL = 'https://landing2-f3d3a-default-rtdb.firebaseio.com/data.json';

const sendData = () => {
const form = document.getElementById("form");

const formData = new FormData(form);

const data = Object.fromEntries(formData.entries());
data["saved"] = new Date().toLocaleString("es-CO", {
    timeZone: "America/Guayaquil",
});

fetch(databaseURL, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
})
    .then((response) => {
    if (!response.ok) {
        alert(
        "Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces",
        );
        form.reset();
    }
    return response.json();
    })
    .then((result) => {
    alert(
        "Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces",
    );
    form.reset();
    getData();
    })
    .catch((error) => {
    alert("Hemos experimentado un error. ¡Vuelve pronto!");
    });
};

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
            let countSubscribers = new Map();
      
            if (Object.keys(data).length > 0) {
              for (let key in data) {
                let { email, saved } = data[key];
      
                let date = saved.split(",")[0];
      
                let count = countSubscribers.get(date) || 0;
                countSubscribers.set(date, count + 1);
              }
            }
      
            if (countSubscribers.size > 0) {
              const subscribers = document.getElementById("subscribers");
              subscribers.innerHTML = "";
      
              let i = 1;
              for (let [date, count] of countSubscribers) {
                let rowTemplate = `
                               <tr>
                                   <th scope="row">${i}</th>
                                   <td>${date}</td>
                                   <td>${count}</td>
                               </tr>`;
                subscribers.innerHTML += rowTemplate;
                i++;
              }
            }
          }

    } catch (error) {
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
    }
}


let ready = () => {
console.log("DOM está listo");

getData();
};

let loaded = () => {
console.log("Iframes e Images cargadas");

let myform = document.getElementById("form");
myform.addEventListener("submit", (eventSubmit) => {
    eventSubmit.preventDefault();

    let emailElement = document.querySelector(".form-control-lg");
    let emailText = emailElement.value;

    if (emailText.length === 0) {
    emailElement.focus();

    const animation = new Animation(
        new KeyframeEffect(
        emailElement,
        [
            { transform: "translateX(0)" },
            { transform: "translateX(50px)" },
            { transform: "translateX(-50px)" },
            { transform: "translateX(0)" },
        ],
        { duration: 400, iterations: 1 },
        ),
    );

    animation.play();
    return;
    }

    sendData();
});
};
  
  window.addEventListener("DOMContentLoaded", ready);
  window.addEventListener("load", loaded);