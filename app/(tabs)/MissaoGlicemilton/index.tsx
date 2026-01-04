import { View, Text } from 'react-native';
import Screen from "@/app/components/Screen";
import globals from "@/app/globals";

export default function MissaoGlicemilton() {
    return (
    <Screen>
        <View style={globals.container}>
            <Text>Missão SOS Glicemilton</Text>
        </View>
    </Screen>
    );
}