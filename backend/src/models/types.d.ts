interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

interface User {
    fName: string;
    lName: string;
    email: string;
    password: string;
    tasks: Task[];
}

export { Task, User };