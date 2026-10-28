import AsyncStorage from "@react-native-async-storage/async-storage";
import { HabitData } from "../features/habits/types";

const HABITS_STORAGE_KEY = "habit-ledger:data:v1";

export async function saveHabitData(data: HabitData): Promise<void> {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(HABITS_STORAGE_KEY, jsonValue);
}

export async function loadHabitData(): Promise<HabitData | null> {
    const jsonValue = await AsyncStorage.getItem(HABITS_STORAGE_KEY);

    if (jsonValue === null) {
        return null;
    }

    return JSON.parse(jsonValue) as HabitData;
}
