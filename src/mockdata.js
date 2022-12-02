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
            title: 'Workspace 1',
            image: workSpaceImage1,
            boards: [
                {
                    id: 1,
                    title: 'Board 1',
                    image: workSpaceImage1,
                    lists: {
                        "01list":{
                            id: "01list",
                            title: "To Do",
                            cards: [
                                {
                                    id: "01card",
                                    title: "Learn React",
                                },
                                {
                                    id: "02card",
                                    title: "Learn Redux",
                                },
                                {
                                    id: "03card",
                                    title: "Learn Firebase",
                                }
                            ]
                        },
                        "02list": {
                            id: "02list",
                            title: "In Progress",
                            cards: [
                                {
                                    id: "04card",
                                    title: "Learn React Native",
                                },
                                {
                                    id: "05card",
                                    title: "Learn GraphQL",
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
                    title: 'Board 2',
                    image: workSpaceImage2,
                    lists: {
                        "01list":{
                            id: "01list",
                            title: "To Do",
                            cards: [
                                {
                                    id: "01card",
                                    title: "Learn React",
                                },
                                {
                                    id: "02card",
                                    title: "Learn Redux",
                                },
                                {
                                    id: "03card",
                                    title: "Learn Firebase",
                                }
                            ]
                        },
                        "02list": {
                            id: "02list",
                            title: "In Progress",
                            cards: [
                                {
                                    id: "04card",
                                    title: "Learn React Native",
                                },
                                {
                                    id: "05card",
                                    title: "Learn GraphQL",
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
                    id: 3,
                    title: 'Board 3',
                    image: workSpaceImage3,
                    lists: {
                        "01list":{
                            id: "01list",
                            title: "To Do",
                            cards: [
                                {
                                    id: "01card",
                                    title: "Learn React",
                                },
                                {
                                    id: "02card",
                                    title: "Learn Redux",
                                },
                                {
                                    id: "03card",
                                    title: "Learn Firebase",
                                }
                            ]
                        },
                        "02list": {
                            id: "02list",
                            title: "In Progress",
                            cards: [
                                {
                                    id: "04card",
                                    title: "Learn React Native",
                                },
                                {
                                    id: "05card",
                                    title: "Learn GraphQL",
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
            id: 2,
            title: 'Workspace 2',
            image: workSpaceImage2,
            boards: [
                {
                    id: 4,
                    title: 'Board 4',
                    image: workSpaceImage4,
                    lists: {
                        "01list":{
                            id: "01list",
                            title: "To Do",
                            cards: [
                                {
                                    id: "01card",
                                    title: "Learn React",
                                },
                                {
                                    id: "02card",
                                    title: "Learn Redux",
                                },
                                {
                                    id: "03card",
                                    title: "Learn Firebase",
                                }
                            ]
                        },
                        "02list": {
                            id: "02list",
                            title: "In Progress",
                            cards: [
                                {
                                    id: "04card",
                                    title: "Learn React Native",
                                },
                                {
                                    id: "05card",
                                    title: "Learn GraphQL",
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
                    title: 'Board 5',
                    image: workSpaceImage5,
                    lists: {
                        "01list":{
                            id: "01list",
                            title: "To Do",
                            cards: [
                                {
                                    id: "01card",
                                    title: "Learn React",
                                },
                                {
                                    id: "02card",
                                    title: "Learn Redux",
                                },
                                {
                                    id: "03card",
                                    title: "Learn Firebase",
                                }
                            ]
                        },
                        "02list": {
                            id: "02list",
                            title: "In Progress",
                            cards: [
                                {
                                    id: "04card",
                                    title: "Learn React Native",
                                },
                                {
                                    id: "05card",
                                    title: "Learn GraphQL",
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
            title: 'Workspace 3',
            image: workSpaceImage3,
            boards: [
                {
                    id: 6,
                    title: 'Board 6',
                    image: workSpaceImage6,
                    lists: {
                        "01list":{
                            id: "01list",
                            title: "To Do",
                            cards: [
                                {
                                    id: "01card",
                                    title: "Learn React",
                                },
                                {
                                    id: "02card",
                                    title: "Learn Redux",
                                },
                                {
                                    id: "03card",
                                    title: "Learn Firebase",
                                }
                            ]
                        },
                        "02list": {
                            id: "02list",
                            title: "In Progress",
                            cards: [
                                {
                                    id: "04card",
                                    title: "Learn React Native",
                                },
                                {
                                    id: "05card",
                                    title: "Learn GraphQL",
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
            title: 'Workspace 4',
            image: workSpaceImage4,
        },
        {
            id: 5,
            title: 'Workspace 5',
            image: workSpaceImage5,
        },
        {
            id: 6,
            title: 'Workspace 6',
            image: workSpaceImage6,
        }
    ]
}

export default mockData;