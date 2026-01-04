import { View, Text } from 'react-native';
import Screen from "@/app/components/Screen";
import globals from "@/app/globals";

export default function RadarAcucar() {
    return (
    <Screen>
        <View style={globals.container}>
            <Text>Radar do Açúcar</Text>
        </View>
    </Screen>
    );
}