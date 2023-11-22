export default {

    problem: "",

    data: [],
    requested: [],
    resolution: [],

    // Requested data for selection
    requestedDataOptions: [
        {
            key: 'distancia',
            name: 'Distancia',
        },
        {
            key: 'velocidad',
            name: 'Velocidad',
        },
        {
            key: 'tiempo',
            name: 'Tiempo',
        },
        {
            key: 'posicion_inicial',
            name: 'Posición Inicial',
        },
        {
            key: 'hora',
            name: 'Hora',
        },

        {
            key: 'rapidez',
            name: 'Rapidez',
        },
        {
            key: 'velocidad_inicial',
            name: 'Velocidad Inicial',
        },
        {
            key: 'velocidad_final',
            name: 'Velocidad Final',
        },
        {
            key: 'tiempo_inicial',
            name: 'Tiempo Inicial',
        },
        {
            key: 'tiempo_final',
            name: 'Tiempo Final',
        },
        {
            key: 'posicion_final',
            name: 'Posición Final',
        },
        {
            key: 'posicion',
            name: 'Posición',
        },
        {
            key: 'aceleracion',
            name: 'Aceleración',
        },
    ],
    problemData: {
        // MRU
        'distancia': ['posicion_inicial', 'velocidad', 'tiempo'],
        'velocidad': ['distancia', 'posicion_inicial', 'tiempo', /* MRUV */ 'velocidad_inicial', 'aceleracion'],
        'tiempo': ['distancia', 'posicion_inicial', 'velocidad', /* MRUV */ 'velocidad_inicial', 'aceleracion'],
        'posicion_inicial': [],
        'hora': ['tiempo'],
        'rapidez': ['distancia', 'posicion_inicial', 'tiempo', /* MRUV */ 'velocidad_inicial', 'aceleracion'],

        // MRUV
        'velocidad_inicial': [],
        'velocidad_final': ['velocidad_inicial', 'aceleracion', 'tiempo'],
        'tiempo_inicial': [],
        'tiempo_final': [],
        'posicion_final': ['posicion_inicial', 'velocidad_inicial', 'tiempo', 'aceleracion'],
        'posicion': ['posicion_inicial', 'velocidad_inicial', 'tiempo', 'aceleracion'],
        'aceleracion': ['velocidad', 'velocidad_inicial', 'tiempo', 'tiempo_inicial'],
    },
    unitsData: {
        aceleracion: ['m/s2', 'km/s2', 'km/h2'],

        velocidad: ['m/s', 'km/s', 'km/h'],
        velocidad_inicial: ['m/s', 'km/s', 'km/h'],
        velocidad_final: ['m/s', 'km/s', 'km/h'],

        posicion: ['km', 'm', 'cm'],
        posicion_inicial: ['km', 'm', 'cm'],
        posicion_final: ['km', 'm', 'cm'],

        distancia: ['km', 'm', 'cm'],

        tiempo: ['min', 's', 'h'],
        tiempo_inicial: ['min', 's', 'h'],
        tiempo_final: ['min', 's', 'h'],
    },
}
