import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from "react-native";
import HintCard from "@/app/components/DesafioMerenda/hint";
import Screen from "@/app/components/Screen";

export default function EnergiaScreen() {
    return (
        <Screen>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <HintCard text={"Energia"} />
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
                        <Text style={styles.progressValue}>40/100</Text>
                    </View>

                    {/* Barra de progresso (estática) */}
                    <View style={styles.progressBarBackground}>
                        <View style={styles.progressBarFill} />
                    </View>

                    <View style={styles.progressFooter}>
                        <Text style={styles.progressScale}>0</Text>
                        <Text style={styles.progressScale}>40%</Text>
                        <Text style={styles.progressScale}>100</Text>
                    </View>
                </View>

                {/* Cards pequenos */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statIcon}>🎯</Text>
                        <Text style={styles.statValue}>0</Text>
                        <Text style={styles.statLabel}>Atividades hoje</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statIcon}>🟢</Text>
                        <Text style={styles.statValue}>40</Text>
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
                    <View style={styles.activityCard}>
                        <Text style={styles.activityIcon}>🚶</Text>
                        <Text style={styles.activityLabel}>Caminhada</Text>
                    </View>

                    <View style={styles.activityCard}>
                        <Text style={styles.activityIcon}>🏃</Text>
                        <Text style={styles.activityLabel}>Corrida</Text>
                    </View>
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
        width: "40%",
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
        gap: 12,
    },
    activityCard: {
        flex: 1,
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
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
