import { Text, View } from "react-native";

export default function Index() {
    return (
        <View className="flex-1 items-center justify-center bg-green-50 p-6">
            <View className="w-full rounded-2xl bg-white p-6">
                <Text className="text-2xl font-bold text-green-700">
                    HabitLedger
                </Text>

                <Text className="mt-2 text-base text-gray-600">
                    Build better habits, one day at a time.
                </Text>

                <View className="mt-6 rounded-xl bg-green-100 p-4">
                    <Text className="font-semibold text-green-800">
                        NativeWind is being tested!
                    </Text>
                </View>
            </View>
        </View>
    );
}
