import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from "@/app/components/Screen";

type HintCardProps = {
    text: string;
};


type Food = {
    id: number;
    nome: string;
    isHealthy: boolean;
    imageUrl: string;
};

export const foodsMock: Food[] = [
    {
        id: 1,
        nome: 'Maçã',
        isHealthy: true,
        imageUrl: 'https://example.com/maca.png',
    },
    {
        id: 2,
        nome: 'Refrigerante',
        isHealthy: false,
        imageUrl: 'https://example.com/refrigerante.png',
    },
    {
        id: 3,
        nome: 'Banana',
        isHealthy: false,
        imageUrl: 'https://example.com/refrigerante.png',
    },

    {
        id: 4,
        nome: 'Suco natural',
        isHealthy: false,
        imageUrl: 'https://example.com/refrigerante.png',
    },
    {
        id: 5,
        nome: 'Brigadeiro',
        isHealthy: false,
        imageUrl: 'https://example.com/refrigerante.png',
    },
    {
        id: 6,
        nome: 'Pão',
        isHealthy: false,
        imageUrl: 'https://example.com/refrigerante.png',
    }
];



export default function FoodSelection() {
    return (
        <Screen>
            <View style={styles.container}>
                {foodsMock.map(food => (
                    <TouchableOpacity
                        key={food.id}
                        style={styles.card}
                        activeOpacity={0.8}
                        onPress={() => {
                            !food.isHealthy
                                ? alert('❌ Alimento não saudável')
                                : alert('✅ Alimento saudável');
                        }}
                    >
                        <Text style={styles.emoji}>🍎</Text>
                        <Text style={styles.cardText}>{food.nome}</Text>
                    </TouchableOpacity>
                ))}
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        style={styles.customButton}
                        onPress={() => console.log('teste')}
                    >
                        <Text style={styles.buttonText}>
                            Próxima Pergunta
                        </Text>
                    </TouchableOpacity>
                </View>
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'white',
        marginBottom: 16,
        marginHorizontal: '1.5%',
        flexBasis: '30%',
        borderRadius: 16,
        aspectRatio: 1,


        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },

    emoji: {
        fontSize: 36,
        marginBottom: 8,
    },

    cardText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0a2a5e',
        textAlign: 'center',
    },

    buttonWrapper: {
        width: '100%',
        alignItems: 'center',
        marginTop: 16,
    },

    customButton: {
        backgroundColor: 'orange',
        height: 48,
        width: '90%',        // fica bonito no mobile
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