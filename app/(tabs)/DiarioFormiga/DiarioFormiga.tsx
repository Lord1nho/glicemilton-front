import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable, Alert, ActivityIndicator} from "react-native";
import {BarChart2, CheckCircle, Heart} from "lucide-react-native";
import {supabase} from "@/lib/supabase";
import {useCallback, useEffect, useMemo, useState} from "react";
import Toast from "react-native-toast-message";
import {useFocusEffect} from "expo-router";
import {formatDateBR, getUsuarioId} from "@/utils/utils";
import {MOOD_MESSAGES, MOOD_STATES, MoodState} from "@/app/components/DiarioFormiga/mood";
import {styles} from './styles';


export default function DiarioFormiga() {
    const [usuarioId, setUsuarioId] = useState<number | null>(null);
    const [estadoSelecionado, setEstadoSelecionado] = useState<MoodState | null>(null);
    const [jaRegistradoHoje, setJaRegistradoHoje] = useState(false);
    const [loading, setLoading] = useState(true);
    const [historico, setHistorico] = useState<{ data: string; estado: MoodState }[]>([]);
    const [historicoGeral, setHistoricoGeral] = useState<{ data: string; estado: MoodState }[]>([]);
    function selecionarHumor(estado: MoodState) {
        setEstadoSelecionado(estado);
    }

    async function carregarHistorico () {
        const { data: humor, error: humorError } = await supabase
            .from('humor_diario')
            .select('data, estado')
            .eq('id_usuario', usuarioId)
            .order('data', { ascending: false })
            .limit(3);

        if (humorError) {
            console.error(humorError);
        } else {
            console.log(humor)
            setHistorico(humor);
            }
    }

    async function carregarHistoricoGeral() {
        const { data: humor, error: humorError } = await supabase
            .from('humor_diario')
            .select('data, estado')
            .eq('id_usuario', usuarioId)
            .order('data', { ascending: false })

        if (humorError) {
            console.error(humorError);
            return;
        }
        setHistoricoGeral(humor);
    }

    async function salvarNoDiario() {
        if (!estadoSelecionado) {
            Alert.alert("Attention", "Select how you are feeling first.");
            return;
        }

        setLoading(true);
        const { error } = await supabase.from("humor_diario").insert({
            id_usuario: usuarioId,
            estado: estadoSelecionado,
            data: new Date().toISOString().split("T")[0],
        });

        if (error) {
            console.error(error);
            Alert.alert("Erro", "Could not save in the diary.");
        } else {
            Toast.show({
                type: "success",
                text1: "Mood saved in your diary 💚",
            });

            setEstadoSelecionado(null);
            setLoading(false);
            setJaRegistradoHoje(true)
        }
    }

    useEffect(() => {
        async function init() {
            const id = await getUsuarioId();

            if (id) {
                setUsuarioId(id); // 👈 continua sendo state da tela
            }
        }

        init();
    }, []);

    const stats = useMemo(() => {
        const diasRegistrados = historicoGeral.length;

        const diasPositivos = historicoGeral.filter(
            (item) => MOOD_STATES[item.estado].positivo
        ).length;

        const positividade =
            diasRegistrados > 0
                ? Math.round((diasPositivos / diasRegistrados) * 100)
                : 0;

        return {
            diasRegistrados,
            diasPositivos,
            positividade,
        };
    }, [historico]);

    useEffect(() => {
        if (usuarioId) {
            verificarRegistroHoje();
            carregarHistorico();;
        }
    }, [usuarioId]);



    useFocusEffect(
        useCallback(() => {
            if (usuarioId) {
                carregarHistorico()
                verificarRegistroHoje();
                carregarHistoricoGeral()
            }
        }, [usuarioId])
    );

    async function verificarRegistroHoje() {
        if (!usuarioId) {
            console.log("usuarioId ainda não carregado");
            return;
        }
        setLoading(true);
        const hoje = new Date().toISOString().split("T")[0];

        console.log("Verificando:", { usuarioId, hoje });

        const { data, error } = await supabase
            .from("humor_diario")
            .select("id_usuario")
            .eq("id_usuario", usuarioId)
            .eq("data", hoje)
            .maybeSingle();


        setJaRegistradoHoje(!!data);
        setLoading(false);
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.title}>Wise Ant Diary</Text>
                <Text style={styles.subtitle}>How are you feeling?</Text>
            </View>

            {/* ESTATÍSTICAS */}
            <View style={styles.statsCard}>
                <BarChart2 color="#7c3aed" size={32} />

                <Text style={styles.statsTitle}>Your Stats</Text>

                <View style={styles.statsRow}>
                    <Stat
                        value={String(stats.diasRegistrados)}
                        label="Days logged"
                        color="#f97316"
                    />
                    <Stat
                        value={String(stats.diasPositivos)}
                        label="Positive days"
                        color="#22c55e"
                    />
                    <Stat
                        value={`${stats.positividade}%`}
                        label="Positivity"
                        color="#eab308"
                    />
                </View>
            </View>

            {/* HUMOR */}
            <View style={styles.moodCard}>
                {loading ? (
                    // 👇 LOADING
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#E53935" />
                    </View>
                ) : jaRegistradoHoje ? (
                    // 👇 JÁ REGISTROU
                    <MoodDoneCard />
                ) : (
                    // 👇 CASO AINDA NÃO TENHA REGISTRADO
                    <>
                        <Text style={styles.sectionTitle}>💗 How are you today?</Text>

                        <View style={styles.moodGrid}>
                            <MoodButton
                                estado="FELIZ"
                                selecionado={estadoSelecionado === "FELIZ"}
                                onPress={selecionarHumor}
                            />
                            <MoodButton
                                estado="TRANQUILO"
                                selecionado={estadoSelecionado === "TRANQUILO"}
                                onPress={selecionarHumor}
                            />
                            <MoodButton
                                estado="NEUTRO"
                                selecionado={estadoSelecionado === "NEUTRO"}
                                onPress={selecionarHumor}
                            />
                            <MoodButton
                                estado="CANSADO"
                                selecionado={estadoSelecionado === "CANSADO"}
                                onPress={selecionarHumor}
                            />

                            <MoodButton
                                estado="ANSIOSO"
                                selecionado={estadoSelecionado === "ANSIOSO"}
                                onPress={selecionarHumor}
                            />
                            <MoodButton
                                estado="TRISTE"
                                selecionado={estadoSelecionado === "TRISTE"}
                                onPress={selecionarHumor}
                            />
                            <MoodButton
                                estado="ESTRESSADO"
                                selecionado={estadoSelecionado === "ESTRESSADO"}
                                onPress={selecionarHumor}
                            />
                            <MoodButton
                                estado="DOENTE"
                                selecionado={estadoSelecionado === "DOENTE"}
                                onPress={selecionarHumor}
                            />
                        </View>

                        <MoodFeedback estado={estadoSelecionado} />

                        <TouchableOpacity
                            onPress={salvarNoDiario}
                            disabled={!estadoSelecionado}
                            style={[
                                styles.saveButton,
                                estadoSelecionado
                                    ? styles.saveButtonActive
                                    : styles.saveButtonDisabled,
                            ]}
                        >
                            <Heart color="#fff" size={16} />
                            <Text style={styles.saveButtonText}>Save to Diary</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            {/* HISTÓRICO */}
            <Text style={styles.historyTitle}>📅 Mood History</Text>
            {
                historico.map((item) => {
                    const view = MOOD_MESSAGES[item.estado]
                    const moodState = MOOD_STATES[item.estado];
                    console.log(view);
                    return (
                        <View key={item.data} style={styles.historyCard}>
                            <Text style={styles.historyMood}>{moodState.emoji} {moodState.label}</Text>
                            <Text style={styles.historyDate}>{formatDateBR(item.data)}</Text>
                            <Text style={styles.historyText}>
                                {view}
                            </Text>
                        </View>
                    )
                })
            }


            {/* DICA */}
            <View style={styles.tipCard}>
                <Text style={styles.tipIcon}>✨</Text>
                <Text style={styles.tipTitle}>Wise Ant Tip</Text>
                <Text style={styles.tipText}>
                    &#34;Tracking your emotions helps you understand patterns and care better for your mental and physical health. Remember: your feelings are valid, and Glicemilton is always here to support you!&#34;
                </Text>
            </View>
        </ScrollView>
    );
}

/* ================= COMPONENTES ================= */

function Stat({ value, label, color }: any) {
    return (
        <View style={styles.statItem}>
            <Text style={[styles.statValue, { color }]}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );
}

type MoodButtonProps = {
    estado: MoodState;
    selecionado: boolean;
    onPress: (estado: MoodState) => void;
};

export function MoodButton({
                               estado,
                               selecionado,
                               onPress,
                           }: MoodButtonProps) {
    const { emoji, label } = MOOD_STATES[estado];

    return (
        <Pressable
            onPress={() => onPress(estado)}
            style={({ pressed }) => [
                styles.moodButton,
                selecionado && styles.moodButtonSelected,
                pressed && { opacity: 0.7 },
            ]}
        >
            <Text style={styles.emoji}>{emoji}</Text>
            <Text
                style={[
                    styles.label,
                    selecionado && styles.labelSelected,
                ]}
            >
                {label}
            </Text>
        </Pressable>
    );
}

type MoodFeedbackProps = {
    estado: MoodState | null;
};

export function MoodFeedback({ estado }: MoodFeedbackProps) {
    if (!estado) return null;

    return (
        <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackText}>
                {MOOD_MESSAGES[estado]}
            </Text>
        </View>
    );
}

export function MoodDoneCard() {
    return (
        <View style={styles.doneCard}>
            <CheckCircle size={36} color="#2E7D32" />
            <Text style={styles.doneTitle}>Today's registry complete!</Text>
            <Text style={styles.doneSubtitle}>
                Come back tomorrow to log how you are feeling!
            </Text>
        </View>
    );
}
