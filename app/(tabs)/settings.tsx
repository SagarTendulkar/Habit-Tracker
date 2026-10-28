import { Text, View } from "react-native";

export default function SettingsScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-white dark:bg-gray-950">
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
                Settings
            </Text>
            <Text className="mt-2 text-gray-500">
                Your preferences and backup options will appear here.
            </Text>
        </View>
    );
}
