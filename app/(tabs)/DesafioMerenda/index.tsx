import { View, Text } from 'react-native';
import styles from "@/app/(tabs)/DesafioMerenda/styles";
import Screen from "@/app/components/Screen";
import HintCard from "@/app/components/DesafioMerenda/hint";
import globals from "@/app/globals";
import FoodSelection from "@/app/components/DesafioMerenda/FoodSelection";

export default function Index() {
    return (
    <Screen>
        <View style={globals.container}>
            <HintCard
                text="Ajude o Glicemilton a Escolher os alimemntos saudáveis para a merenda!"
            />
            <View style={styles.scoreBox}>
                <Text>Pontos: 0</Text>
                <Text>Pergunta 1 de 5</Text>
            </View>

            <View>
                <FoodSelection></FoodSelection>
            </View>

        </View>
    </Screen>
    );
}