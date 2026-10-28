import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import {
    loadOrCreateHabitData,
    saveHabitData,
} from "@/src/features/habits/habitRepository";
import toggleDailyRecord from "@/src/features/habits/records";
import type { Habit, HabitData } from "@/src/features/habits/types";
import { getLocalDateKey } from "@/src/utils/dateUtils";

function getTodayLabel() {
    return new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
}

function HabitRow({
    habit,
    occurred,
    onToggle,
}: {
    habit: Habit;
    occurred: boolean;
    onToggle: (id: string) => void;
}) {
    return (
        <Pressable
            onPress={() => onToggle(habit.id)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: occurred }}
            className="mt-3 flex-row items-center rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
        >
            <View
                className={`mr-3 h-6 w-6 items-center justify-center rounded-md border-2 ${
                    occurred
                        ? "border-green-600 bg-green-600"
                        : "border-gray-300 dark:border-gray-600"
                }`}
            >
                {occurred && <Text className="font-bold text-white">✓</Text>}
            </View>

            <Text
                className={`flex-1 text-base font-medium ${
                    occurred
                        ? "text-gray-500 line-through"
                        : "text-gray-900 dark:text-gray-100"
                }`}
            >
                {habit.name}
            </Text>
        </Pressable>
    );
}

export default function TodayScreen() {
    const [habitData, setHabitData] = useState<HabitData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        async function loadSavedData() {
            try {
                const data = await loadOrCreateHabitData();
                setHabitData(data);
            } catch (error) {
                console.error("Failed to load HabitLedger data:", error);
                setLoadError(true);
            } finally {
                setIsLoading(false);
            }
        }

        loadSavedData();
    }, []);

    const today = getLocalDateKey();

    const habits = habitData?.habits.filter((habit) => habit.isActive) ?? [];

    const todayRecords =
        habitData?.records.filter(
            (record) => record.date === today && record.occurred,
        ) ?? [];

    const buildHabits = habits
        .filter((habit) => habit.category === "build")
        .sort((a, b) => a.sortOrder - b.sortOrder);

    const reduceHabits = habits
        .filter((habit) => habit.category === "reduce")
        .sort((a, b) => a.sortOrder - b.sortOrder);

    function isHabitRecorded(habitId: string) {
        return todayRecords.some((record) => record.habitId === habitId);
    }

    const completedBuild = buildHabits.filter((habit) =>
        isHabitRecorded(habit.id),
    ).length;

    const recordedReduce = reduceHabits.filter((habit) =>
        isHabitRecorded(habit.id),
    ).length;

    async function toggleHabit(habitId: string) {
        if (!habitData) return;

        const updatedData: HabitData = {
            ...habitData,
            records: toggleDailyRecord(habitData.records, habitId, today),
        };

        // Update the screen immediately.
        setHabitData(updatedData);

        try {
            await saveHabitData(updatedData);
        } catch (error) {
            console.error("Failed to save daily record:", error);

            // Restore the previous state if saving fails.
            setHabitData(habitData);
        }
    }

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-950">
                <Text className="text-base text-gray-500 dark:text-gray-400">
                    Loading habits...
                </Text>
            </View>
        );
    }

    if (loadError || !habitData) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50 px-6 dark:bg-gray-950">
                <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                    Couldn't load your habits
                </Text>
                <Text className="mt-2 text-center text-gray-500 dark:text-gray-400">
                    Your saved data has not been intentionally deleted. Please
                    check the console for the error.
                </Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-gray-50 dark:bg-gray-950">
            <ScrollView
                className="flex-1"
                contentContainerClassName="px-5 pb-8 pt-5"
                showsVerticalScrollIndicator={false}
            >
                <Text className="text-sm text-gray-500 dark:text-gray-400">
                    {getTodayLabel()}
                </Text>

                <Text className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                    Today
                </Text>

                <Text className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    Small steps, every day.
                </Text>

                <View className="mt-6 rounded-2xl bg-green-700 p-5">
                    <Text className="text-sm font-medium text-green-100">
                        BUILD HABITS
                    </Text>

                    <View className="mt-2 flex-row items-end">
                        <Text className="text-4xl font-bold text-white">
                            {completedBuild}
                        </Text>

                        <Text className="mb-1 ml-2 text-base text-green-100">
                            of {buildHabits.length} completed
                        </Text>
                    </View>

                    <View className="mt-4 h-2 overflow-hidden rounded-full bg-green-900">
                        <View
                            className="h-full rounded-full bg-green-200"
                            style={{
                                width: `${
                                    buildHabits.length > 0
                                        ? (completedBuild /
                                              buildHabits.length) *
                                          100
                                        : 0
                                }%`,
                            }}
                        />
                    </View>
                </View>

                <View className="mb-2 mt-8 flex-row items-center justify-between">
                    <Text className="text-xl font-bold text-gray-900 dark:text-white">
                        Build
                    </Text>

                    <Text className="text-sm text-gray-500 dark:text-gray-400">
                        {completedBuild}/{buildHabits.length}
                    </Text>
                </View>

                <Text className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                    Positive habits you want to develop.
                </Text>

                {buildHabits.map((habit) => (
                    <HabitRow
                        key={habit.id}
                        habit={habit}
                        occurred={isHabitRecorded(habit.id)}
                        onToggle={toggleHabit}
                    />
                ))}

                <View className="mb-2 mt-8 flex-row items-center justify-between">
                    <Text className="text-xl font-bold text-gray-900 dark:text-white">
                        Reduce
                    </Text>

                    <Text className="text-sm text-gray-500 dark:text-gray-400">
                        {recordedReduce} recorded
                    </Text>
                </View>

                <Text className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                    Behaviors to keep an eye on, without judgment.
                </Text>

                {reduceHabits.map((habit) => (
                    <HabitRow
                        key={habit.id}
                        habit={habit}
                        occurred={isHabitRecorded(habit.id)}
                        onToggle={toggleHabit}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
