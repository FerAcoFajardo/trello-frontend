const mockData = {
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
    listIds: ["01list", "02list", "03list"]
}

export default mockData;