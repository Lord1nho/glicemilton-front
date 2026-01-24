import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Screen from "@/app/components/Screen";
import {useCallback, useEffect, useState} from "react";
import {useFocusEffect} from "expo-router";
import Toast from "react-native-toast-message";
import {getFoods, salvarResultadoPergunta, salvarSelecoes} from "@/lib/services/desafioMerendaService";
import {supabase} from "@/lib/supabase";
import Loading from "@/app/components/Loading";

export type Food = {
    id_alimento: number;
    nome: string;
    isHealthy: boolean;
    imageUrl: string;
};

export const foodsMock: Food[] = [
    {
        id_alimento: 1,
        nome: 'Maçã',
        isHealthy: true,
        imageUrl: 'https://example.com/maca.png',
    },
    {
        id_alimento: 2,
        nome: 'Refrigerante',
        isHealthy: false,
        imageUrl: 'https://example.com/refrigerante.png',
    },
    {
        id_alimento: 3,
        nome: 'Banana',
        isHealthy: true,
        imageUrl: 'https://example.com/refrigerante.png',
    },

    {
        id_alimento: 4,
        nome: 'Suco natural',
        isHealthy: true,
        imageUrl: 'https://example.com/refrigerante.png',
    },
    {
        id_alimento: 5,
        nome: 'Brigadeiro',
        isHealthy: false,
        imageUrl: 'https://example.com/refrigerante.png',
    },
    {
        id_alimento: 6,
        nome: 'Pão',
        isHealthy: false,
        imageUrl: 'https://example.com/refrigerante.png',
    }
];



export default function FoodSelection() {
    const [foods, setFoods] = useState<Food[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<Food[]>([])
    const [confirmed, setConfirmed] = useState(false);
    const [pontos, setPontos] = useState(0);
    const [usuarioId, setUsuarioId] = useState<number | null>(null);




    useFocusEffect(
        useCallback(() => {
            return () => {
                console.log("Saiu da tela, limpando seleção");
                setSelected([]);
                setConfirmed(false);
            };
        }, [])
    );

    async function loadFoods() {
        try {
            const data:Food[] = await getFoods();
            setFoods(data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        async function init() {
            // 1️⃣ carrega usuário
            const { data: sessionData } = await supabase.auth.getSession();

            if (sessionData.session) {
                const authId = sessionData.session.user.id;

                const { data, error } = await supabase
                    .from('usuarios')
                    .select('id_usuario')
                    .eq('auth_id', authId)
                    .single();

                if (error) {
                    console.log('Erro ao buscar usuarioId:', error);
                } else {
                    setUsuarioId(data.id_usuario); // 👈 aqui nasce o usuarioId
                }
            }

            // 2️⃣ carrega alimentos
            await loadFoods();
        }

        init();
    }, []);

    console.log(foods);

    useEffect(() => {
        console.log("Selecionados:", selected);
    }, [selected]);

    //Função para seleção dos itens + suporte no css
    function handleSelect(food: Food) {
        setSelected((prev) => {
            const alreadySelected = prev.some(item => item.id_alimento === food.id_alimento);

            if (alreadySelected) {
                // remove
                return prev.filter(item => item.id_alimento !== food.id_alimento);
            }

            // adiciona
            return [...prev, food];
        });
    }

    async function submitChoice(){
        if (!usuarioId) {
            console.log('usuarioId ainda não carregado');
            return;
        }
        const total = selected.length
        const corretos = selected.filter(foods => foods.isHealthy).length;
        const ptsCorretos = corretos * 15;
        const ptsErrados = ((total - corretos) * 5);

        const ptsTotalPergunta = ptsCorretos - ptsErrados;
        setPontos(prev => Math.max(0, prev + ptsTotalPergunta));

        const idResultado = await salvarResultadoPergunta(
            usuarioId,
            ptsTotalPergunta,
            total,
            corretos
        );

        if (!idResultado) return;


        await salvarSelecoes(usuarioId, idResultado, selected);

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
            <View style={styles.scoreBox}>
                <Text style={{ color: 'red', fontSize: 16 }}>
                    TESTE
                </Text>
                <Text style={styles.questionText}>Pergunta 1 de 5</Text>
            </View>
            <View style={styles.container}>
                {loading ? (
                    <Loading/>
                ) : (
                    foods.map(food => {
                        const isSelected = selected.some(
                            item => item.id_alimento === food.id_alimento
                        );

                        return (
                            <TouchableOpacity
                                key={food.id_alimento}
                                style={[
                                    styles.card,
                                    isSelected && styles.foodSelected
                                ]}
                                activeOpacity={0.8}
                                disabled={confirmed}
                                onPress={() => handleSelect(food)}
                            >
                                <Text style={styles.emoji}>🍎</Text>
                                <Text style={styles.cardText}>{food.nome}</Text>
                            </TouchableOpacity>
                        );
                    })
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
                                setFoods([])
                                setSelected([]);
                                setConfirmed(false);
                                loadFoods(); // 👈 AQUI
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

    scoreBox : {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#0f172a', // 👈 obrigatóri
        backgroundColor: '#ffffff',
        borderRadius: 16,

        paddingVertical: 14,
        paddingHorizontal: 16,

        // sombra suave
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,

        // borda clara (dá esse efeito "card flutuando")
        borderWidth: 1,
        borderColor: '#e0f2fe',
    },

    scoreText: {
        fontSize: 16,
        fontWeight: "600",
    },

    questionText: {
        fontSize: 14,
        color: "#2F6FED",
        fontWeight: "500",
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