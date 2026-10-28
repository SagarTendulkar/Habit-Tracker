export type HabitCategory = "build" | "reduce";

export type Habit = {
    id: string;
    name: string;
    category: HabitCategory;
    isActive: boolean;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
    archivedAt?: string;
};

export type DailyRecord = {
    id: string;
    habitId: string;
    date: string;
    occurred: boolean;
    createdAt: string;
    updatedAt: string;
};

export type HabitData = {
    version: 1;
    habits: Habit[];
    records: DailyRecord[];
};
