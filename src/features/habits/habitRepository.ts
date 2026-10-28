import { getLocalDateKey } from "@/src/utils/dateUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initialHabits } from "./initialHabits";
import type { DailyRecord, Habit, HabitData } from "./types";

const DATA_KEY = "habit-ledger:data:v1";
const OLD_HABITS_KEY = "habit-ledger:habits:v1";

export async function loadOrCreateHabitData(): Promise<HabitData> {
    // First, try the new data format.
    const savedData = await AsyncStorage.getItem(DATA_KEY);

    if (savedData !== null) {
        const parsedData = JSON.parse(savedData) as HabitData;

        if (
            parsedData.version === 1 &&
            Array.isArray(parsedData.habits) &&
            Array.isArray(parsedData.records)
        ) {
            return parsedData;
        }

        throw new Error("Saved HabitLedger data has an unsupported format.");
    }

    // If no new data exists, check for the older format.
    const oldSavedHabits = await AsyncStorage.getItem(OLD_HABITS_KEY);

    if (oldSavedHabits !== null) {
        const oldHabits = JSON.parse(oldSavedHabits) as {
            id: string;
            name: string;
            category: "build" | "reduce";
            occurred: boolean;
        }[];

        const now = new Date().toISOString();

        const habits: Habit[] = oldHabits.map((habit, index) => ({
            id: habit.id,
            name: habit.name,
            category: habit.category,
            isActive: true,
            sortOrder: index,
            createdAt: now,
            updatedAt: now,
        }));

        const today = getLocalDateKey();

        const records: DailyRecord[] = oldHabits
            .filter((habit) => habit.occurred)
            .map((habit) => ({
                id: `${habit.id}-${today}`,
                habitId: habit.id,
                date: today,
                occurred: true,
                createdAt: now,
                updatedAt: now,
            }));

        const migratedData: HabitData = {
            version: 1,
            habits,
            records,
        };

        // Save the new data before returning it.
        await AsyncStorage.setItem(DATA_KEY, JSON.stringify(migratedData));

        // Keep the old key as a backup for now.
        return migratedData;
    }

    // No saved data yet: start with the starter habits.
    const newData: HabitData = {
        version: 1,
        habits: initialHabits,
        records: [],
    };

    await AsyncStorage.setItem(DATA_KEY, JSON.stringify(newData));

    return newData;
}

export async function saveHabitData(data: HabitData): Promise<void> {
    await AsyncStorage.setItem(DATA_KEY, JSON.stringify(data));
}
