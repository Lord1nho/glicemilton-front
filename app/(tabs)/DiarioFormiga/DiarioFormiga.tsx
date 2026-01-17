import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { BarChart2, Heart } from "lucide-react-native";

export default function DiarioFormiga() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.title}>Diário da Formiga Sábia</Text>
                <Text style={styles.subtitle}>Como você está se sentindo?</Text>
            </View>

            {/* ESTATÍSTICAS */}
            <View style={styles.statsCard}>
                <BarChart2 color="#7c3aed" size={32} />

                <Text style={styles.statsTitle}>Suas Estatísticas</Text>

                <View style={styles.statsRow}>
                    <Stat value="1" label="Dias registrados" color="#f97316" />
                    <Stat value="1" label="Dias positivos" color="#22c55e" />
                    <Stat value="100%" label="Positividade" color="#eab308" />
                </View>
            </View>

            {/* HUMOR */}
            <View style={styles.moodCard}>
                <Text style={styles.sectionTitle}>💗 Como você está hoje?</Text>

                <View style={styles.moodGrid}>
                    <MoodButton emoji="😊" label="Feliz" />
                    <MoodButton emoji="😌" label="Tranquilo" />
                    <MoodButton emoji="😐" label="Neutro" />
                    <MoodButton emoji="🥱" label="Cansado" />

                    <MoodButton emoji="😰" label="Ansioso" />
                    <MoodButton emoji="😢" label="Triste" />
                    <MoodButton emoji="😣" label="Estressado" />
                    <MoodButton emoji="🤒" label="Doente" />
                </View>

                <TouchableOpacity style={styles.saveButton}>
                    <Heart color="#fff" size={16} />
                    <Text style={styles.saveButtonText}>Salvar no Diário</Text>
                </TouchableOpacity>
            </View>

            {/* HISTÓRICO */}
            <Text style={styles.historyTitle}>📅 Histórico de Humor</Text>

            <View style={styles.historyCard}>
                <Text style={styles.historyMood}>😊 Feliz</Text>
                <Text style={styles.historyDate}>14/01/2026</Text>
                <Text style={styles.historyText}>
                    Que alegria! Glicemilton está radiante como você!
                </Text>
            </View>

            {/* DICA */}
            <View style={styles.tipCard}>
                <Text style={styles.tipIcon}>✨</Text>
                <Text style={styles.tipTitle}>Dica da Formiga Sábia</Text>
                <Text style={styles.tipText}>
                    &#34;Registrar suas emoções ajuda a entender padrões e cuidar melhor da sua
                    saúde mental e física. Lembre-se: seus sentimentos são válidos e
                    Glicemilton está sempre aqui para apoiar você!&#34;
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

function MoodButton({ emoji, label }: { emoji: string; label: string }) {
    return (
        <TouchableOpacity style={styles.moodButton}>
            <Text style={styles.moodEmoji}>{emoji}</Text>
            <Text style={styles.moodLabel}>{label}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e6f7fb",
        paddingHorizontal: 16,
    },

    header: {
        alignItems: "center",
        marginVertical: 20,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0f172a",
    },

    subtitle: {
        fontSize: 14,
        color: "#64748b",
        marginTop: 4,
    },

    statsCard: {
        backgroundColor: "#fde7f3",
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        marginBottom: 20,
    },

    statsTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginVertical: 8,
        color: "#0f172a",
    },

    statsRow: {
        flexDirection: "row",
        marginTop: 8,
    },

    statItem: {
        alignItems: "center",
        marginHorizontal: 12,
    },

    statValue: {
        fontSize: 18,
        fontWeight: "800",
    },

    statLabel: {
        fontSize: 12,
        color: "#475569",
        textAlign: "center",
    },

    moodCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 12,
        color: "#0f172a",
    },

    moodGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    moodButton: {
        width: "47%",
        backgroundColor: "#f8fafc",
        borderRadius: 14,
        paddingVertical: 18,
        alignItems: "center",
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },

    moodEmoji: {
        fontSize: 32,
    },

    moodLabel: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 6,
        color: "#0f172a",
    },

    saveButton: {
        flexDirection: "row",
        backgroundColor: "#f9a8d4",
        paddingVertical: 14,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },

    saveButtonText: {
        color: "#fff",
        fontWeight: "700",
        marginLeft: 8,
    },

    historyTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 8,
        color: "#0f172a",
    },

    historyCard: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 14,
        marginBottom: 20,
    },

    historyMood: {
        fontSize: 14,
        fontWeight: "700",
    },

    historyDate: {
        fontSize: 12,
        color: "#64748b",
        marginBottom: 6,
    },

    historyText: {
        fontSize: 13,
        color: "#475569",
    },

    tipCard: {
        backgroundColor: "#f0f9ff",
        borderRadius: 16,
        padding: 18,
        alignItems: "center",
    },

    tipIcon: {
        fontSize: 26,
        marginBottom: 4,
    },

    tipTitle: {
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 6,
        color: "#0f172a",
    },

    tipText: {
        fontSize: 13,
        color: "#475569",
        textAlign: "center",
    },
});
