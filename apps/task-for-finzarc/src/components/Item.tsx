import React, { useState, useRef, useEffect } from "react";
import { Task } from "@/utils/types";

export default function Item(props: ItemProps) {
    const { id, title, completed, deleteTask } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const [titleInput, setTitleInput] = useState(title);
    const [isEditing, setIsEditing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(completed);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleTaskInputKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setIsEditing(false);
            updateTaskTitle();
        }
    };

    const updateTaskTitle = async () => {
        setIsEditing(false);
        setTitleInput(titleInput.trim());
        try {
            const response = await fetch(`https://task-for-finzarc.onrender.com/api/tasks/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ title: titleInput, completed: isCompleted }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

        } catch (error) {

            console.error("Error updating task title:", error);
        }
    };

    const handleCompleteUpdate = async (completed: boolean) => {
        setIsCompleted(completed);
        try {
            const response = await fetch(`https://task-for-finzarc.onrender.com/api/tasks/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ completed, title: titleInput }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

        } catch (error) {
            console.error("Error updating task completion:", error);
        }
    };

    return (
        <li className="bg-gray-900 text-white rounded-xl py-3 px-2 md:px-5 md:py-3 w-full max-w-[700px] hover:shadow-xl">
            <div className="task-title flex justify-between items-center ">
                <div className="left flex items-center grow">
                    {/* Menu Icon */}
                    <svg className="w-4 h-4 mr-2 md:w-6 md:h-6 md:mr-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                        <g id="SVGRepo_iconCarrier">
                            <path d="M4 6H20M4 12H20M4 18H20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </g>
                    </svg>

                    {/* Task title */}
                    {isEditing ? (
                        <input
                            type="text"
                            className="bg-transparent inline-block text-red-300 text-sm md:text-xl w-full focus:outline-none"
                            ref={inputRef}
                            value={titleInput}
                            onChange={(e) => setTitleInput(e.target.value)}
                            onKeyDown={handleTaskInputKeyDown}
                            onBlur={updateTaskTitle}
                        />
                    ) : (
                        <span className="text-sm md:text-xl">{titleInput || "untitled"}</span>
                    )}
                </div>

                <div className="right flex md:gap-2">
                    {/* Checkbox */}
                    {!isCompleted ? (
                        <svg className="w-4 h-4 mr-1 md:mr-3 md:w-6 md:h-6 cursor-pointer" onClick={() => handleCompleteUpdate(true)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <g id="Interface / Checkbox_Unchecked">
                                    <path id="Vector" d="M4 7.2002V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </g>
                            </g>
                        </svg>
                    ) : (
                        <svg className="w-4 h-4 mr-1 md:mr-3 md:w-6 md:h-6 cursor-pointer" viewBox="0 0 24 24" fill="none" onClick={() => handleCompleteUpdate(false)} xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <g id="Interface / Checkbox_Check">
                                    <path id="Vector" d="M8 12L11 15L16 9M4 16.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2842 4.21799 18.9079C4 18.4801 4 17.9203 4 16.8002Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </g>
                            </g>
                        </svg>
                    )}

                    {/* Edit Icon */}
                    <svg className="w-4 h-4 mr-1 md:mr-3 md:w-6 md:h-6 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" onClick={() => setIsEditing(true)}>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M18.3785 8.44975L8.9636 17.8648C8.6844 18.144 8.3288 18.3343 7.94161 18.4117L4.99988 19.0001L5.58823 16.0583C5.66566 15.6711 5.85597 15.3155 6.13517 15.0363L15.5501 5.62132M18.3785 8.44975L19.7927 7.03553C20.1832 6.64501 20.1832 6.01184 19.7927 5.62132L18.3785 4.20711C17.988 3.81658 17.3548 3.81658 16.9643 4.20711L15.5501 5.62132M18.3785 8.44975L15.5501 5.62132" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                            </path>
                        </g>
                    </svg>

                    {/* Delete Icon */}
                    <svg className="w-4 h-4 mr-1 md:mr-3 md:w-6 md:h-6 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" onClick={() => deleteTask(id)}>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M10 11V17" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M14 11V17" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M4 7H20" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </g>
                    </svg>
                </div>
            </div>
        </li>
    );
}

interface ItemProps extends Task {
    deleteTask: (id: string | number) => void;
}
