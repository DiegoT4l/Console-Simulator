class Carpeta {
    constructor(nombre) {
        this.nombre = nombre;
        this.archivos = [];
        this.carpetasHijas = [];
    }

    crearArchivo(nombre) {
        if (nombre.endsWith('.txt')) {
            this.archivos.push(nombre);
            return `Archivo ${nombre} creado correctamente.`;
        } else {
            return 'Solo se pueden crear archivos .txt.';
        }
    }

    editarArchivo(nombre, contenido) {
        const archivo = this.archivos.find(a => a === nombre);
        if (archivo) {
            // Aquí podrías añadir código para editar el contenido del archivo.
            return `Archivo ${nombre} editado correctamente.`;
        } else {
            return `El archivo ${nombre} no existe.`;
        }
    }

    crearCarpeta(nombre) {
        const nuevaCarpeta = new Carpeta(nombre);
        nuevaCarpeta.padre = this;
        this.carpetasHijas.push(nuevaCarpeta);
        return `Carpeta ${nombre} creada correctamente.`;
    }

    editarNombre(nuevoNombre) {
        this.nombre = nuevoNombre;
        return `Nombre de la carpeta editado a ${nuevoNombre}.`;
    }

    eliminarCarpeta(nombre) {
        const indexCarpeta = this.carpetasHijas.findIndex(c => c.nombre === nombre);
        if (indexCarpeta !== -1) {
            this.carpetasHijas.splice(indexCarpeta, 1);
            return `Carpeta ${nombre} eliminada correctamente.`;
        } else {
            return `La carpeta ${nombre} no existe.`;
        }
    }

    listarContenido() {
        const contenido = {
            carpetas: this.carpetasHijas.map(c => c.nombre),
            archivos: this.archivos
        };
        return contenido;
    }
}

export default Carpeta;