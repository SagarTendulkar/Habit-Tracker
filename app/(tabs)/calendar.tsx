import { Text, View } from "react-native";

export default function CalendarScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-white dark:bg-gray-950">
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
                Calendar
            </Text>
            <Text className="mt-2 text-gray-500">
                Your habit history will appear here.
            </Text>
        </View>
    );
}
