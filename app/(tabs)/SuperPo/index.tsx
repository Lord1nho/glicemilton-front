import { View, Text } from 'react-native';
import Screen from "@/app/components/Screen";
import globals from "@/app/globals";

export default function SuperPo() {
    return (
    <Screen>
        <View style={globals.container}>
            <Text>Hora do SuperPó</Text>
        </View>
    </Screen>
    );
}