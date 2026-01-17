import { View, ActivityIndicator } from "react-native";

export function Loading() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#6C63FF" />
        </View>
    );
}