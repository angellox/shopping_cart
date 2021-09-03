// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = []; // Carrito

cargarEventListeners();

function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
}

// Funciones
function agregarCurso(e) {

    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Elimina curso del carrito
function eliminarCurso(e) {
    if( e.target.classList.contains('borrar-curso') ) {
        const cursoId = e.target.getAttribute('data-id');
        
        // Elimina del arreglo
        articulosCarrito.forEach( curso => {
            if( curso.id === cursoId ) {
                //console.log('Curso seleccionado: ' + curso.titulo + 'Cantidad: ' + curso.cantidad);
                curso.cantidad === 1 ? articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId) : curso.cantidad--;
                carritoHTML();
            }
        });
    }
}

// Lee el contenido del HTML al que se le da click y extrae info
function leerDatosCurso(curso) {
    //console.log(curso);

    // Crear un objeto con el contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1 // Valor inicial
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );

    if(existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // Agrega elemento al carrito [arreglo]
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {

    limpiarHTML();

    articulosCarrito.forEach( curso => {
        const { imagen,titulo,precio,cantidad, id } = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100";>
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td> <a href="#" class="borrar-curso" data-id="${id}"> X </a> </td>
        `;

        // Inyectando en el HTML tbody
        contenedorCarrito.appendChild(row);
    });    
}

function limpiarHTML() {
    // Forma lenta
    // contenedorCarrito.innerHTML = "";
    // Forma rápida (100% Performance)
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}