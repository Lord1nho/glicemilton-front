import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useCallback, useEffect, useState} from "react";
import {useFocusEffect} from "expo-router";
import Toast from "react-native-toast-message";
import {getFoods, salvarResultadoPergunta, salvarSelecoes} from "@/lib/services/desafioMerendaService";
import {supabase} from "@/lib/supabase";
import Loading from "@/app/components/Loading";
import FinalResultModal from "@/app/components/DesafioMerenda/ModalEndGame";
import {getEmoji, getUsuarioId} from "@/utils/utils";
import { styles } from "@/app/(tabs)/DesafioMerenda/styles";

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
    const [nrPergunta, setNrPergunta] = useState<number>(1);
    const [showModal, setShowModal] = useState(false);


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
            const id = await getUsuarioId();

            if (id) {
                setUsuarioId(id); // 👈 continua sendo state da tela
            }

            await loadFoods();
        }

        init();
    }, []);


    /*
    console.log(foods);
    useEffect(() => {
        console.log("Selecionados:", selected);
    }, [selected]);
    */
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
        const ptsCorretos = corretos * 20;
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

        if(nrPergunta === 5) setShowModal(true);
        setConfirmed(true);

    }

    return (
        <>
            <View style={styles.scoreBox}>
                <FinalResultModal visible={showModal} score={pontos} onRestart={() => {
                    setNrPergunta(1);
                    setFoods([])
                    setSelected([]);
                    setConfirmed(false);
                    loadFoods(); // 👈 AQUI
                    setShowModal(false)
                    setPontos(0);
                }}/>
                <Text style={{ fontSize: 16 }}>
                   🏆 Pontos: {pontos}
                </Text>
                <Text style={styles.questionText}>Pergunta {nrPergunta} de 5</Text>
            </View>
            <View style={styles.container}>
                {loading ? (
                    <View style={styles.loadingWrapper}>
                        <Loading />
                    </View>
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
                                <Text style={styles.emoji}>{getEmoji(food.id_alimento)}</Text>
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
                                setNrPergunta(prevState => prevState + 1);
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
        </>
    );
}
