window.addEventListener("load", function () {

    // CAPTURA DE FORMULARIO Y CAMPOS   

    let form = document.querySelector('.form');
    let formNombre = document.querySelector('#nombre');
    let formPrecio = document.querySelector('#precio');
    let formDescripcion = document.querySelector('#descripcion');
    let formCategoria = document.querySelector('#categoria');
    let erroresView = document.querySelector('.errores');

    formNombre.focus();  // HACE FOCO EN ESTE CAMPO

    form.addEventListener("submit", function (e) {

        let error = 0;
        let errores = [];

        // NOMBRE

        if (formNombre.value == "") {
            error++;
            errores.push("Debes ingresar un nombre de producto.");
        } else if (formNombre.value.length < 5) {
            error++;
            errores.push("El nombre debe tener un min de 5 caracteres.");
        }

        // PRECIO

        if (formPrecio.value == "") {
            error++;
            errores.push("Debes ingresar un precio.");
        }

        // DESCRIPCION

        if (formDescripcion.value == "") {
            error++;
            errores.push("Debes ingresar una descripcion.");
        } else if (formDescripcion.value.length < 20) {
            error++;
            errores.push("La descripcion debe tener un min de 20 caracteres.");
        }

        // CATEGORIA

        if (formCategoria.value == "") {
            error++;
            errores.push("Debes ingresar una categoria para el producto.");
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
