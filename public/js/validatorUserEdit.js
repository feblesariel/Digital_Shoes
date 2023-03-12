window.addEventListener("load", function () {

    // CAPTURA DE FORMULARIO Y CAMPOS   

    let form = document.querySelector('.form');
    let formName = document.querySelector('#name');
    let formPassword = document.querySelector('#password');
    let formDomicilio = document.querySelector('#domicilio');
    let formZip = document.querySelector('#zipcode');
    let erroresView = document.querySelector('.errores');

    formName.focus();  // HACE FOCO EN ESTE CAMPO

    form.addEventListener("submit", function (e) {

        let error = 0;
        let errores = [];

        // NOMBRE DE USUARIO

        if (formName.value == "") {
            error++;
            errores.push("Debes ingresar un nombre de usuario.");
        } else if (formName.value.length < 2) {
            error++;
            errores.push("El nombre de usuario debe tener al menos 2 caracteres.");
        }

        // PASSWORD

        if (formPassword.value == "") {
            error++;
            errores.push("Debes ingresar una contraseña.");
        } else if (formPassword.value.length < 8) {
            error++;
            errores.push("La contraseña debe tener un minimo 8 caracteres.");
        }

        // DOMICILIO

        if (formDomicilio.value == "") {
            error++;
            errores.push("Debes ingresar un domicilio.");
        }

        // ZIP CODE

        if (formZip.value == "") {
            error++;
            errores.push("Debes ingresar un codigo postal.");
        }

        if (error > 0) {
            erroresView.innerHTML = "";
            e.preventDefault();
            for (let i = 0; i < errores.length; i++) {
                erroresView.innerHTML += errores[i] + "<br>";
            }
        }

    });

})

