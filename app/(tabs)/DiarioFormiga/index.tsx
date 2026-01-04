import { View, Text } from 'react-native';
import Screen from "@/app/components/Screen";
import globals from "@/app/globals";

export default function DiarioFormiga() {
    return (
        <Screen>
            <View style={globals.container}>
                <Text>Diário da Formiga Sábia</Text>
            </View>
        </Screen>
    );
}