"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode';
import Item from "@/components/Item";
import { User, Task } from "@/utils/types";
import { showToast } from "@/utils/toast";

export default function Home() {
    const router = useRouter();

    const [user, setUser] = useState<User>(); 
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [taskTitle, setTaskTitle] = useState("");

    useEffect(() => {
        // fetching tasks from the server
        const token = localStorage.getItem("token");
        if(!token){
            router.push("/login");
            return;
        }
        fetchTasks();
        setUser(jwtDecode(token));

    }, []);

    async function fetchTasks() {
        try {
            const response = await fetch('http://localhost:3333/api/tasks', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
    
            if (!response.ok) {
                showToast("Failed to fetch tasks", "error");
                return;
            }
    
            const user = await response.json();
            setTasks(user.tasks);
            
        } catch (error) {
            console.error("Error fetching tasks:", error);
            showToast("Failed to fetch tasks", "error");
        }

        setIsLoading(false);
    }

    async function addTasks(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            const newTask = { id: Date.now().toString(), title: taskTitle, completed: false };
            setTasks([...tasks, newTask]);
            if(!user){
                showToast("Failed to add task", "error");
                return;
            }
            setTaskTitle("");

            try {
                const response = await fetch('http://localhost:3333/api/tasks', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        email: user.email
                    },
                    body: JSON.stringify(newTask)
                });

                if(!response.ok){
                    showToast("Failed to add task", "error");
                    setTasks(tasks.filter((task: Task) => task.id !== newTask.id)); 
                }
        
            } catch (error) {
                showToast("Failed to add task", "error");
                console.error("Error adding task:", error);
            }
        }
    }

    async function deleteTask(id: string | number) {
        setTasks(tasks.filter((task: Task) => task.id !== id));

        try {
            const response = await fetch(`http://localhost:3333/api/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    email: user.email
                }
            });

            if(!response.ok){
                showToast("Failed to delete task", "error");
            }

        } catch (error) {
            showToast("Failed to delete task", "error");
            console.error("Error deleting task:", error);
        }
    }

    return (
        <main className="bg-gray-800 min-h-screen w-screen flex flex-col items-center">
            {/* background SVG   */}
            <svg xmlns='http://www.w3.org/2000/svg' width='100%' className="fixed z-0 w-screen h-screen"><rect fill='#374151' width='540' height='450' /><defs><linearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%' gradientTransform='rotate(212,768,347)'><stop offset='0' stopColor='#374151' /><stop offset='1' stopColor='#111827' /></linearGradient><pattern patternUnits='userSpaceOnUse' id='b' width='650' height='541.7' x='0' y='0' viewBox='0 0 1080 900'><g fillOpacity='0.04'><polygon fill='#444' points='90 150 0 300 180 300' /><polygon points='90 150 180 0 0 0' /><polygon fill='#AAA' points='270 150 360 0 180 0' /><polygon fill='#DDD' points='450 150 360 300 540 300' /><polygon fill='#999' points='450 150 540 0 360 0' /><polygon points='630 150 540 300 720 300' /><polygon fill='#DDD' points='630 150 720 0 540 0' /><polygon fill='#444' points='810 150 720 300 900 300' /><polygon fill='#FFF' points='810 150 900 0 720 0' /><polygon fill='#DDD' points='990 150 900 300 1080 300' /><polygon fill='#444' points='990 150 1080 0 900 0' /><polygon fill='#DDD' points='90 450 0 600 180 600' /><polygon points='90 450 180 300 0 300' /><polygon fill='#666' points='270 450 180 600 360 600' /><polygon fill='#AAA' points='270 450 360 300 180 300' /><polygon fill='#DDD' points='450 450 360 600 540 600' /><polygon fill='#999' points='450 450 540 300 360 300' /><polygon fill='#999' points='630 450 540 600 720 600' /><polygon fill='#FFF' points='630 450 720 300 540 300' /><polygon points='810 450 720 600 900 600' /><polygon fill='#DDD' points='810 450 900 300 720 300' /><polygon fill='#AAA' points='990 450 900 600 1080 600' /><polygon fill='#444' points='990 450 1080 300 900 300' /><polygon fill='#222' points='90 750 0 900 180 900' /><polygon points='270 750 180 900 360 900' /><polygon fill='#DDD' points='270 750 360 600 180 600' /><polygon points='450 750 540 600 360 600' /><polygon points='630 750 540 900 720 900' /><polygon fill='#444' points='630 750 720 600 540 600' /><polygon fill='#AAA' points='810 750 720 900 900 900' /><polygon fill='#666' points='810 750 900 600 720 600' /><polygon fill='#999' points='990 750 900 900 1080 900' /><polygon fill='#999' points='180 0 90 150 270 150' /><polygon fill='#444' points='360 0 270 150 450 150' /><polygon fill='#FFF' points='540 0 450 150 630 150' /><polygon points='900 0 810 150 990 150' /><polygon fill='#222' points='0 300 -90 450 90 450' /><polygon fill='#FFF' points='0 300 90 150 -90 150' /><polygon fill='#FFF' points='180 300 90 450 270 450' /><polygon fill='#666' points='180 300 270 150 90 150' /><polygon fill='#222' points='360 300 270 450 450 450' /><polygon fill='#FFF' points='360 300 450 150 270 150' /><polygon fill='#444' points='540 300 450 450 630 450' /><polygon fill='#222' points='540 300 630 150 450 150' /><polygon fill='#AAA' points='720 300 630 450 810 450' /><polygon fill='#666' points='720 300 810 150 630 150' /><polygon fill='#FFF' points='900 300 810 450 990 450' /><polygon fill='#999' points='900 300 990 150 810 150' /><polygon points='0 600 -90 750 90 750' /><polygon fill='#666' points='0 600 90 450 -90 450' /><polygon fill='#AAA' points='180 600 90 750 270 750' /><polygon fill='#444' points='180 600 270 450 90 450' /><polygon fill='#444' points='360 600 270 750 450 750' /><polygon fill='#999' points='360 600 450 450 270 450' /><polygon fill='#666' points='540 600 630 450 450 450' /><polygon fill='#222' points='720 600 630 750 810 750' /><polygon fill='#FFF' points='900 600 810 750 990 750' /><polygon fill='#222' points='900 600 990 450 810 450' /><polygon fill='#DDD' points='0 900 90 750 -90 750' /><polygon fill='#444' points='180 900 270 750 90 750' /><polygon fill='#FFF' points='360 900 450 750 270 750' /><polygon fill='#AAA' points='540 900 630 750 450 750' /><polygon fill='#FFF' points='720 900 810 750 630 750' /><polygon fill='#222' points='900 900 990 750 810 750' /><polygon fill='#222' points='1080 300 990 450 1170 450' /><polygon fill='#FFF' points='1080 300 1170 150 990 150' /><polygon points='1080 600 990 750 1170 750' /><polygon fill='#666' points='1080 600 1170 450 990 450' /><polygon fill='#DDD' points='1080 900 1170 750 990 750' /></g></pattern></defs><rect x='0' y='0' fill='url(#a)' width='100%' height='100%' /><rect x='0' y='0' fill='url(#b)' width='100%' height='100%' /></svg>
            <div className="mt-10 w-11/12 max-w-[800px] max-h-5/6 z-10">
                <h1 className="text-3xl md:text-5xl self-start m-6 text-white ">{user && user?.fName + "'s Tasks"}</h1>

                <div className="rounded-lg shadow-lg rounded-b-none w-full max-h-[65vh] overflow-scroll scrollbar-hide" style={{ scrollbarWidth: "none" }}>
                    <ul className="flex flex-col items-center justify-center my-4 gap-2">
                        {!isLoading ?
                            (tasks.map((task: Task) => <Item key={task.id} id={task.id} title={task.title} completed={task.completed} deleteTask={deleteTask} />))
                            :
                            (<svg fill="#ffffff" width="32px" height="32px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" className="animate-spin my-16">
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z"></path>
                                </g>
                            </svg>)
                        }

                        <div className="bg-gray-900 text-white rounded-xl py-3 px-2 md:px-5 md:py-3 md:pl-16 w-full max-w-[700px] hover:shadow-xl">
                            <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} onKeyDown={addTasks} className="bg-gray-900 text-white w-full text-xl outline-none" type="text" placeholder="Add a new task..." />
                        </div>
                    </ul>
                </div>

            </div>
        </main>
    );
}
