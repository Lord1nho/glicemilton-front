import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from "@/app/components/Screen";

type HintCardProps = {
    text: string;
};

export default function FoodSelection() {
    return (
        <Screen>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text>
                        Teste
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text>
                        Teste
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text>
                        Teste
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text>
                        Teste
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text>
                        Teste
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text>
                        Teste
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.customButton}
                    onPress={() => alert('oi')}
                >
                    <Text style={styles.buttonText}>
                        Próxima Pergunta
                    </Text>
                </TouchableOpacity>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },

    card: {
        backgroundColor: 'white',
        height: 80,
        maxWidth: '50%',
        marginBottom: 12,
        flexBasis: '50%'
    },

    customButton: {
        backgroundColor: 'orange',
        height: 48,
        marginTop: 16,
        marginHorizontal: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        paddingHorizontal: 20
    },

});