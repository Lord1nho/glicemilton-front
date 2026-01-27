import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView, Button, TouchableOpacity,
} from "react-native";
import HintCard from "@/app/components/DesafioMerenda/hint";
import Screen from "@/app/components/Screen";
import {supabase} from "@/lib/supabase";
import Toast from "react-native-toast-message";

type Activity = {
    id_atividade: number;
    name: string,
    subtitle: string,
    emoji: string,
    points: number
}

type ActivityToday = {
    id_realizada: number;
    id_usuario: number;
    data_hora: string;
    id_atividade: number;
    name: string;
    points: number;
    emoji: string;
};


export default function EnergiaScreen() {
    const [usuarioId, setUsuarioId] = useState<number | null>(null);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [activitiesToday, setActivitiesToday] = useState<ActivityToday[]>([]);
    const [totalpointsToday, setTotalPointsToday] = useState<number>(0);


    function getTodayRangeUTC() {
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date(start);
        end.setDate(end.getDate() + 1);

        return {
            startUTC: start.toISOString(),
            endUTC: end.toISOString(),
        };
    }

    async function carregarActivitiesToday() {
        if (!usuarioId) return;

        const { startUTC, endUTC } = getTodayRangeUTC();

        const { data, error } = await supabase
            .from("atividade_realizada_detalhada")
            .select("*")
            .eq("id_usuario", usuarioId)
            .gte("data_hora", startUTC)
            .lt("data_hora", endUTC);

        if (error) {
            console.error("❌ Erro ao buscar atividades:", error);
            return;
        }

        setActivitiesToday(data ?? []);
        console.log("📊 Data recebida:", data);
    }

    async function getActivities() {
        try {
            const { data, error } = await supabase
                .from("atividade_fisica")
                .select("id_atividade ,name, subtitle, emoji, points");

            if (error) {
                throw error;
            }

            setActivities(data as Activity[]);
        } catch (err) {
            console.error("Erro ao buscar atividades:", err);
        }
    }

    async function markActivity(item: Activity) {
        const { error } = await supabase
            .from("atividade_realizada")
            .insert({
                id_usuario: usuarioId,
                id_atividade: item.id_atividade,
                data_hora: new Date().toISOString(),
            });

        if (error) {
            Toast.show({
                type: "error",
                text1: "Erro ao enviar",
            });
            return;
        }

        Toast.show({
            type: "success",
            text1: "Atividade Salva! Continue assim!",
        });

        setTotalPointsToday(prev => prev + item.points);
        carregarActivitiesToday();
    }

    function isActivityDoneToday(activityId: number) {
        return activitiesToday.some(
            activity => activity.atividade_id === activityId
        );
    }

    useEffect(() => {
        async function init() {
            // 1️⃣ carrega sessão
            const { data: sessionData } = await supabase.auth.getSession();

            if (!sessionData.session) return;

            const authId = sessionData.session.user.id;

            // 2️⃣ busca id_usuario
            const { data: usuario, error: usuarioError } = await supabase
                .from('usuarios')
                .select('id_usuario')
                .eq('auth_id', authId)
                .single();

            if (usuarioError || !usuario) {
                console.log('Erro ao buscar usuarioId:', usuarioError);
                return;
            }

            setUsuarioId(usuario.id_usuario);

        }
        init();
    }, []);

    useEffect(() => {
        if (!usuarioId) return;
        getActivities();
        carregarActivitiesToday();
    }, [usuarioId]);

    useEffect(() => {
        const total = activitiesToday.reduce(
            (sum, activity) => sum + activity.points,
            0
        );
        setTotalPointsToday(total);
    }, [activitiesToday]);



   return (
        <Screen>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <HintCard text={"Registre suas atividades físicas"} />
                </View>

                {/* Card Energia */}
                <View style={styles.energyCard}>
                    <Text style={styles.energyIcon}>⚡</Text>
                    <Text style={styles.energyTitle}>Energia do Glicemilton</Text>
                    <Text style={styles.energySubtitle}>
                        💪 Bom progresso! Continue assim!
                    </Text>

                    <View style={styles.progressHeader}>
                        <Text style={styles.progressLabel}>Progresso diário</Text>
                        <Text style={styles.progressValue}>{totalpointsToday}/100</Text>
                    </View>

                    {/* Barra de progresso (estática) */}
                    <View style={styles.progressBarBackground}>
                        <View style={[
                            styles.progressBarFill,
                            { width: `${totalpointsToday}%` },
                        ]}></View>
                    </View>

                    <View style={styles.progressFooter}>
                        <Text style={styles.progressScale}>0</Text>
                        <Text style={styles.progressScale}>50</Text>
                        <Text style={styles.progressScale}>100</Text>
                    </View>
                </View>

                {/* Cards pequenos */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statIcon}>🎯</Text>
                        <Text style={styles.statValue}>{activitiesToday.length}</Text>
                        <Text style={styles.statLabel}>Atividades hoje</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statIcon}>🟢</Text>
                        <Text style={styles.statValue}>{totalpointsToday}</Text>
                        <Text style={styles.statLabel}>Pontos de energia</Text>
                    </View>
                </View>

                {/* Registrar atividade */}
                <View style={styles.registerHeader}>
                    <Text style={styles.registerIcon}>＋</Text>
                    <Text style={styles.registerText}>Registrar Atividade</Text>
                </View>

                {/* Cards de atividades */}
                <View style={styles.activityGrid}>
                    {activities.map((item) => {
                        const doneToday = isActivityDoneToday(item.id_atividade);

                        return (
                            <View key={item.id_atividade} style={[styles.activityCard, doneToday && styles.activityCardDone]}>
                                <Text style={styles.activityIcon}>{item.emoji}</Text>
                                <Text style={styles.activityLabel}>{item.name}</Text>
                                <Text>{item.subtitle}</Text>

                                <TouchableOpacity
                                    style={[
                                        styles.energyButton,
                                        doneToday && styles.energyButtonDisabled
                                    ]}
                                    disabled={doneToday}
                                    onPress={() => markActivity(item)}
                                >
                                    <Text style={styles.energyButtonText}>
                                        {doneToday ? "✔ Concluído" : `+${item.points} ⚡`}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EAF7FF",
    },
    content: {
        padding: 16,
        paddingBottom: 120,
    },

    /* Header */
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        gap: 8,
    },
    headerEmoji: {
        fontSize: 32,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#0B4DA2",
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#4A7FC7",
    },

    /* Energia card */
    energyCard: {
        backgroundColor: "#FFF6E5",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    energyIcon: {
        fontSize: 28,
        textAlign: "center",
    },
    energyTitle: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
        marginTop: 4,
    },
    energySubtitle: {
        textAlign: "center",
        fontSize: 12,
        marginVertical: 8,
    },

    energyButton: {
        marginTop: 10,
        width: "80%",
        backgroundColor: "#FF8C1A",
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: "center",
    },

    energyButtonDisabled: {
        backgroundColor: "#6EDC8C",
        opacity: 0.7,
    },
    energyButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
    },
    progressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    progressLabel: {
        fontSize: 12,
    },
    progressValue: {
        fontSize: 12,
        fontWeight: "600",
    },
    progressBarBackground: {
        height: 10,
        borderRadius: 10,
        backgroundColor: "#E0E0E0",
        overflow: "hidden",
    },
    progressBarFill: {
        height: "100%",
        backgroundColor: "#FF8C1A",
    },
    progressFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 4,
    },
    progressScale: {
        fontSize: 10,
        color: "#555",
    },

    /* Stats */
    statsRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 16,
    },
    statCard: {
        flex: 1,
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 16,
        alignItems: "center",
    },
    statIcon: {
        fontSize: 20,
        marginBottom: 4,
    },
    statValue: {
        fontSize: 18,
        fontWeight: "600",
    },
    statLabel: {
        fontSize: 12,
        color: "#666",
    },

    /* Registrar */
    registerHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        gap: 6,
    },
    registerIcon: {
        fontSize: 18,
        color: "#0B4DA2",
    },
    registerText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#0B4DA2",
    },

    /* Activities */
    activityGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
    },

    activityCard: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingVertical: 20,
        alignItems: "center",
    },

    activityCardDone: {
        backgroundColor: "#D6F5EE",
        borderWidth: 1.5,
        borderColor: "#34C759",
    },

    activityIcon: {
        fontSize: 28,
        marginBottom: 6,
    },
    activityLabel: {
        fontSize: 14,
    },

    /* Tab bar */
    tabBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: "#FFF",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#EEE",
    },
    tabItem: {
        fontSize: 20,
        opacity: 0.5,
    },
    tabActive: {
        opacity: 1,
    },
});
