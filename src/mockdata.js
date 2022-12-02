import workSpaceImage1 from './images/workspace-1.jpg';
import workSpaceImage2 from './images/workspace-2.jpeg';
import workSpaceImage3 from './images/workspace-3.jpg';
import workSpaceImage4 from './images/workspace-4.jpg';
import workSpaceImage5 from './images/workspace-5.jpg';
import workSpaceImage6 from './images/workspace-6.jpg';

const mockData = {
    workspaces: [
        {
            id: 1,
            title: 'Proyectos escolares',
            image: workSpaceImage1,
            boards: [
                {
                    id: 1,
                    title: 'Temas emergentes de web',
                    image: workSpaceImage1,
                    lists: {
                        "01list":{
                            id: "01list",
                            title: "To Dos",
                            cards: [
                                {
                                    id: "01card",
                                    title: "Aprender React",
                                },
                                {
                                    id: "02card",
                                    title: "Aprender Redux",
                                },
                                {
                                    id: "03card",
                                    title: "Aprender React Router",
                                }
                            ]
                        },
                        "02list": {
                            id: "02list",
                            title: "In Progress",
                            cards: [
                                {
                                    id: "04card",
                                    title: "Implementar componentes",
                                },
                                {
                                    id: "05card",
                                    title: "Integrar back y front",
                                }
                            ]
                        },
                        "03list": {
                            id: "03list",
                            title: "Done",
                            cards: []
                        }
                    },
                },
                {
                    id: 2,
                    title: 'Métodologías ágiles',
                    image: workSpaceImage2,
                    lists: {
                        "01list":{
                            id: "01list",
                            title: "To Dos",
                            cards: [
                                {
                                    id: "01card",
                                    title: "Implementar Pomodoro",
                                },
                                {
                                    id: "02card",
                                    title: "Implementar columnas",
                                },
                                {
                                    id: "03card",
                                    title: "Implementar alarma",
                                }
                            ]
                        },
                        "02list": {
                            id: "02list",
                            title: "In Progress",
                            cards: [
                                {
                                    id: "04card",
                                    title: "Modificar tareas",
                                },
                                {
                                    id: "05card",
                                    title: "Eliminar tareas",
                                }
                            ]
                        },
                        "03list": {
                            id: "03list",
                            title: "Done",
                            cards: [
                                {
                                    id: "06card",
                                    title: "Implementar drag and drop",
                                }
                            ]
                        }
                    },
                },
                {
                    id: 3,
                    title: 'Inteligencia artificial',
                    image: workSpaceImage3,
                    lists: {
                        "01list":{
                            id: "01list",
                            title: "To Dos",
                            cards: [
                                {
                                    id: "01card",
                                    title: "Aprender Python",
                                },
                                {
                                    id: "02card",
                                    title: "Obtener dataset",
                                },
                                {
                                    id: "03card",
                                    title: "Implementar modelo",
                                }
                            ]
                        },
                        "02list": {
                            id: "02list",
                            title: "In Progress",
                            cards: [
                                {
                                    id: "04card",
                                    title: "Correr entrenamiento",
                                },
                            ]
                        },
                        "03list": {
                            id: "03list",
                            title: "Done",
                            cards: []
                        }
                    },
                }
            ]
        }, 
        {
            id: 2,
            title: 'Proyectos personales',
            image: workSpaceImage2,
            boards: [
                {
                    id: 4,
                    title: 'Proyectos de Go',
                    image: workSpaceImage4,
                    lists: {
                        "01list":{
                            id: "01list",
                            title: "To Dos",
                            cards: [
                                {
                                    id: "01card",
                                    title: "Aprender Go",
                                },
                                {
                                    id: "02card",
                                    title: "Aprender sintaxis de go",
                                },
                                {
                                    id: "03card",
                                    title: "Integración de bd",
                                }
                            ]
                        },
                        "02list": {
                            id: "02list",
                            title: "In Progress",
                            cards: [
                                {
                                    id: "04card",
                                    title: "Implementar arquitectura",
                                },
                                {
                                    id: "05card",
                                    title: "Implementar ORM",
                                }
                            ]
                        },
                        "03list": {
                            id: "03list",
                            title: "Done",
                            cards: []
                        }
                    },
                },
                {
                    id: 5,
                    title: 'Proyectos de Java',
                    image: workSpaceImage5,
                    lists: {
                        "01list":{
                            id: "01list",
                            title: "To Dos",
                            cards: [
                                {
                                    id: "01card",
                                    title: "Hacer arquitectura",
                                },
                                {
                                    id: "02card",
                                    title: "Aprender ORM",
                                },
                                {
                                    id: "03card",
                                    title: "Implementar ORM",
                                }
                            ]
                        },
                        "02list": {
                            id: "02list",
                            title: "In Progress",
                            cards: [
                                {
                                    id: "04card",
                                    title: "Instalar dependencias",
                                },
                                {
                                    id: "05card",
                                    title: "Usar Maven",
                                }
                            ]
                        },
                        "03list": {
                            id: "03list",
                            title: "Done",
                            cards: []
                        }
                    },
                }
            ]
        },
        {
            id: 3,
            title: 'Trabajo',
            image: workSpaceImage3,
            boards: [
                {
                    id: 6,
                    title: 'Python',
                    image: workSpaceImage6,
                    lists: {
                        "01list":{
                            id: "01list",
                            title: "To Do",
                            cards: [
                                {
                                    id: "01card",
                                    title: "Aprender Python",
                                },
                                {
                                    id: "02card",
                                    title: "Crear proyecto",
                                },
                                {
                                    id: "03card",
                                    title: "Implementar modelos",
                                }
                            ]
                        },
                        "02list": {
                            id: "02list",
                            title: "In Progress",
                            cards: [
                                {
                                    id: "04card",
                                    title: "Sincronizar base de datos",
                                }
                            ]
                        },
                        "03list": {
                            id: "03list",
                            title: "Done",
                            cards: []
                        }
                    },
                }
            ]
        },
        {
            id: 4,
            title: 'Compras',
            image: workSpaceImage4,
        },
        {
            id: 5,
            title: 'Hogar',
            image: workSpaceImage5,
        },
        {
            id: 6,
            title: 'Navidad',
            image: workSpaceImage6,
        }
    ]
}

export default mockData;