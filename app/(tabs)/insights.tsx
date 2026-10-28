import { Text, View } from "react-native";

export default function InsightsScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-white dark:bg-gray-950">
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
                Insights
            </Text>
            <Text className="mt-2 text-gray-500">
                Your weekly and monthly statistics will appear here.
            </Text>
        </View>
    );
}
