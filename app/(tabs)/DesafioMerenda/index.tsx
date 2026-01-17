import { View, Text } from 'react-native';
import Screen from "@/app/components/Screen";
import HintCard from "@/app/components/DesafioMerenda/hint";
import globals from "@/app/globals";
import FoodSelection from "@/app/components/DesafioMerenda/FoodSelection";


export default function DesafioMerenda() {

    return (
    <Screen>
        <View style={globals.container}>
            <HintCard
                text="Ajude o Glicemilton a Escolher os alimemntos saudáveis para a merenda!"
            />
            <View>
                <FoodSelection></FoodSelection>
            </View>

        </View>
    </Screen>
    );
}