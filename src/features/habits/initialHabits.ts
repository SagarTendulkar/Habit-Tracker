import { Habit } from "./types";

const now = new Date().toISOString();

export const initialHabits: Habit[] = [
    {
        id: "exercise",
        name: "Exercise",
        category: "build",
        isActive: true,
        sortOrder: 0,
        createdAt: now,
        updatedAt: now,
    },
    {
        id: "learning",
        name: "Learn something",
        category: "build",
        isActive: true,
        sortOrder: 1,
        createdAt: now,
        updatedAt: now,
    },
    {
        id: "reading",
        name: "Read",
        category: "build",
        isActive: true,
        sortOrder: 2,
        createdAt: now,
        updatedAt: now,
    },
    {
        id: "soft-drinks",
        name: "Soft drinks",
        category: "reduce",
        isActive: true,
        sortOrder: 3,
        createdAt: now,
        updatedAt: now,
    },
    {
        id: "sweets",
        name: "Sweets",
        category: "reduce",
        isActive: true,
        sortOrder: 4,
        createdAt: now,
        updatedAt: now,
    },
];
