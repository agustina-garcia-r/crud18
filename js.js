const bot1 = document.getElementById("btnGet1");
const bot2 = document.getElementById("btnPost");
const bot3 = document.getElementById("btnPut");
const bot4 = document.getElementById("btnDelete");
const userId = document.getElementById("inputGet1Id");
const resultados = document.getElementById("results");

const inputPutNombre = document.getElementById("inputPutNombre");
const inputPutApellido = document.getElementById("inputPutApellido");
const botonguardarcambios = document.getElementById("btnSendChanges");
const dataModal = new bootstrap.Modal(document.getElementById("dataModal"));

let usuarioidseleccionado; 

bot1.addEventListener("click", function () {
  const id = userId.value;
  if (id) {
    fetch(`https://654a3963e182221f8d52c314.mockapi.io/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const nombre = document.createElement('p');
        nombre.textContent = "NAME: " + data.name;
        const aidi = document.createElement('p');
        aidi.textContent = "ID: " + data.id;
        const apellido = document.createElement('p');
        apellido.textContent = "LASTNAME: " + data.lastname;
        resultados.innerHTML = ''; 
        resultados.appendChild(nombre);
        resultados.appendChild(aidi);
        resultados.appendChild(apellido);
        usuarioidseleccionado = data.id;
      })
      .catch((error) => {
        resultados.innerHTML = `Error al obtener el usuario: ${error}`;
      });
  }
});


function openModalWithData(data) {
  inputPutNombre.value = data.name;
  inputPutApellido.value = data.lastname;
  dataModal.show();
}

bot3.addEventListener("click", function () {
  const id = document.getElementById("inputPutId").value;
  if (id) {
    fetch(`https://654a3963e182221f8d52c314.mockapi.io/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        openModalWithData(data);
      })
      .catch((error) => {
        resultados.innerHTML = `Error al obtener el usuario: ${error}`;
      });
  }
});


botonguardarcambios.addEventListener("click", function () {
  const nombre = inputPutNombre.value;
  const apellido = inputPutApellido.value;

  if (nombre && apellido && usuarioidseleccionado) {
    const updatedUser = {
      name: nombre,
      lastname: apellido,
    };

    fetch(`https://654a3963e182221f8d52c314.mockapi.io/users/${usuarioidseleccionado}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (response.ok) {
          dataModal.hide();
          mstrarlistausuarios();
        } else {
          throw new Error(`Error: ${response.status}`);
        }
      })
      .catch((error) => {
        resultados.innerHTML = `Error al actualizar el usuario: ${error}`;
      });
  }
});


bot4.addEventListener("click", function () {
  const id = document.getElementById("inputDelete").value;
  if (id) {
    fetch(`https://654a3963e182221f8d52c314.mockapi.io/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
         
          mstrarlistausuarios();
        } else {
          throw new Error(`Error: ${response.status}`);
        }
      })
      .catch((error) => {
        resultados.innerHTML = `Error al eliminar el usuario: ${error}`;
      });
  }
});


function mstrarlistausuarios() {
  fetch("https://654a3963e182221f8d52c314.mockapi.io/users")
    .then((response) => response.json())
    .then((data) => {
      resultados.innerHTML = ''; 
      data.forEach((persona) => {
        const nombre = document.createElement('p');
        nombre.textContent = "NAME: " + persona.name;
        const aidi = document.createElement('p');
        aidi.textContent = "ID: " + persona.id;
        const apellido = document.createElement('p');
        apellido.textContent = "LASTNAME: " + persona.lastname;
        resultados.appendChild(nombre);
        resultados.appendChild(aidi);
        resultados.appendChild(apellido);
      });
    })
    .catch((error) => {
      resultados.innerHTML = `Error al obtener la lista de usuarios: ${error}`;
    });
}

