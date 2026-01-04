import { View, Text } from 'react-native';
import Screen from "@/app/components/Screen";
import globals from "@/app/globals";

export default function EscudoProtetor() {
    return (
    <Screen>
        <View style={globals.container}>
            <Text>Escudo Protetor</Text>
        </View>
    </Screen>
    );
}