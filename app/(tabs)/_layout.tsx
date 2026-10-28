import { useColorScheme } from "@/components/useColorScheme";
import { Tabs } from "expo-router";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                tabBarActiveTintColor: isDark ? "#4ADE80" : "#16A34A",
                tabBarInactiveTintColor: isDark ? "#9CA3AF" : "#6B7280",
                tabBarStyle: {
                    backgroundColor: isDark ? "#111827" : "#FFFFFF",
                    borderTopColor: isDark ? "#374151" : "#E5E7EB",
                },
                headerStyle: {
                    backgroundColor: isDark ? "#111827" : "#FFFFFF",
                },
                headerTintColor: isDark ? "#F9FAFB" : "#111827",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Today",
                    tabBarLabel: "Today",
                    tabBarIcon: () => null,
                }}
            />

            <Tabs.Screen
                name="calendar"
                options={{
                    title: "Calendar",
                    tabBarLabel: "Calendar",
                    tabBarIcon: () => null,
                }}
            />

            <Tabs.Screen
                name="insights"
                options={{
                    title: "Insights",
                    tabBarLabel: "Insights",
                    tabBarIcon: () => null,
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarLabel: "Settings",
                    tabBarIcon: () => null,
                }}
            />
        </Tabs>
    );
}
