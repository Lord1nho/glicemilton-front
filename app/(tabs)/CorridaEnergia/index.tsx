import { View, Text } from 'react-native';
import Screen from "@/app/components/Screen";
import HintCard from "@/app/components/DesafioMerenda/hint";
import globals from "@/app/globals";

export default function Energia() {
    return (
        <Screen>
            <View style={globals.container}>
                <HintCard
                    text="Oi"
                />
                <Text>Energia</Text>
            </View>
        </Screen>

    );
}