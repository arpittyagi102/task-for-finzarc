interface Task {
    id: string|number;
    title: string;
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