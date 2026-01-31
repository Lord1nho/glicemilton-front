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
import {getUsuarioId} from "@/utils/utils";
import {styles} from "./styles"

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
        await carregarActivitiesToday();
    }

    function isActivityDoneToday(activityId: number) {
        console.log(activitiesToday);
        console.log(activityId);
        return activitiesToday.some(
            activity => activity.id_atividade === activityId
        );
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
                        💪 {
                        totalpointsToday === 0
                            ? "Registre suas atividades físicas"
                            : totalpointsToday >= 100
                                ? "🎉 Parabéns, meta diária alcançada!"
                                : "Bom progresso, continue assim!"
                    }
                    </Text>

                    <View style={styles.progressHeader}>
                        <Text style={styles.progressLabel}>Meta diária</Text>
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


