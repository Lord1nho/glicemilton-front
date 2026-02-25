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
                text="Help Glicemilton choose healthy foods for snack time!"
            />
            <View>
                <FoodSelection></FoodSelection>
            </View>

        </View>
    </Screen>
    );
}