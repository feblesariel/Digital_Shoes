window.addEventListener("load", function () {

    // CAPTURA DE FORMULARIO Y CAMPOS   

    let form = document.querySelector('.form');
    let formEmail = document.querySelector('#email');
    let formPassword = document.querySelector('#password');
    let erroresView = document.querySelector('.errores');

    formEmail.focus();  // HACE FOCO EN ESTE CAMPO

    form.addEventListener("submit", function (e) {

        let error = 0;
        let errores = [];

        // EMAIL

        if (formEmail.value == "") {

            error++;
            errores.push("Debes ingresar un correo electronico.");
        }

        // PASSWORD

        if (formPassword.value == "") {
            error++;
            errores.push("Debes ingresar una contraseña.");
        } else if (formPassword.value.length < 8) {
            error++;
            errores.push("La contraseña debe tener un minimo 8 caracteres.");
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
