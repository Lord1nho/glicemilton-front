import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from "@/app/components/Screen";
import {useCallback, useEffect, useState} from "react";
import {useFocusEffect} from "expo-router";
import Toast from "react-native-toast-message";
import stylesPoints from "@/app/(tabs)/DesafioMerenda/styles";

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
        isHealthy: true,
        imageUrl: 'https://example.com/refrigerante.png',
    },

    {
        id: 4,
        nome: 'Suco natural',
        isHealthy: true,
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
    const [selected, setSelected] = useState<Food[]>([])
    const [confirmed, setConfirmed] = useState(false);
    const [pontos, setPontos] = useState(0);

    useFocusEffect(
        useCallback(() => {
            return () => {
                console.log("Saiu da tela, limpando seleção");
                setSelected([]);
                setConfirmed(false);
            };
        }, [])
    );

    useEffect(() => {
        console.log("Selecionados:", selected);
    }, [selected]);

    //Função para seleção dos itens + suporte no css
    function handleSelect(food: Food) {
        setSelected((prev) => {
            const alreadySelected = prev.some(item => item.id === food.id);

            if (alreadySelected) {
                // remove
                return prev.filter(item => item.id !== food.id);
            }

            // adiciona
            return [...prev, food];
        });
    }

    function submitChoice(){
        const total = selected.length

        const corretos = selected.filter(food => food.isHealthy).length;
        const ptsCorretos = corretos * 15;
        const ptsErrados = ((total - corretos) * 5);

        const ptsTotalPergunta = ptsCorretos - ptsErrados;
        setPontos(prev => Math.max(0, prev + ptsTotalPergunta));

        console.log(`Pontuação = ${ptsTotalPergunta}`)
        if (corretos === total) {
            Toast.show({
                type: "success",
                text1: `Glicemilton está muito feliz!`,
                text2: `+${ptsTotalPergunta} pontos!`,
            });
        } else if (ptsTotalPergunta >= 0) {
            Toast.show({
                type: "success",
                text1: `Boas escolhas, mas pode melhorar! +${ptsTotalPergunta}`,
                text2: `+${ptsTotalPergunta} pontos!`
            });
        } else {
            Toast.show({
                type: "error",
                text1: `Tente novamente!`,
                text2: `Glicemilton prefere alimentos saudáveis!`
            });
        }

        setConfirmed(true);
    }


    return (
        <Screen>
            <View style={stylesPoints.scoreBox}>
                <Text>Pontos: {pontos}</Text>
                <Text>Pergunta 1 de 5</Text>
            </View>
            <View style={styles.container}>
                {foodsMock.map(food => {
                    const isSelected = selected.some(item => item.id === food.id);
                 return (
                    <TouchableOpacity
                        key={food.id}
                        style={[styles.card,
                            isSelected && styles.foodSelected
                        ]}
                        activeOpacity={0.8}
                        disabled={confirmed}
                        onPress={() => {
                            handleSelect(food)
                        }}
                    >
                        <Text style={styles.emoji}>🍎</Text>
                        <Text style={styles.cardText}>{food.nome}</Text>
                    </TouchableOpacity>
                    )}
                )}
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        style={[
                            styles.customButton,
                            selected.length === 0 && !confirmed && styles.buttonDisabled
                        ]}
                        disabled={selected.length === 0 && !confirmed}
                        onPress={() => {
                            if (!confirmed) {
                                submitChoice();
                            } else {
                                console.log("Próxima pergunta");
                                setSelected([]);
                                setConfirmed(false);
                            }
                        }}
                    >
                        <Text style={styles.buttonText}>
                            {confirmed ? "Próxima pergunta" : "Confirmar escolha"}
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

    buttonDisabled: {
        backgroundColor: "#ccc",
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        paddingHorizontal: 20
    },

    foodSelected: {
        borderColor: "#FFD600", // 🟡 borda amarela
        borderWidth: 2,         // destaque
    },
});