import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { BookOpen, Backpack, PartyPopper, AlertCircle } from "lucide-react-native";

export default function MissoesScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.title}>Missão SOS Glicemilton</Text>
                <Text style={styles.subtitle}>Histórias interativas para aprender</Text>
            </View>

            {/* CENTRO DE MISSÕES */}
            <View style={styles.centerCard}>
                <BookOpen color="#2563eb" size={32} />

                <Text style={styles.centerTitle}>Centro de Missões</Text>
                <Text style={styles.centerSubtitle}>
                    Ajude Glicemilton a resolver situações do dia a dia!
                </Text>

                <View style={styles.stats}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>0</Text>
                        <Text style={styles.statLabel}>Pontos</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text style={[styles.statValue, { color: "#16a34a" }]}>0</Text>
                        <Text style={styles.statLabel}>Missões</Text>
                    </View>
                </View>
            </View>

            {/* MISSÕES */}
            <Text style={styles.sectionTitle}>Missões Disponíveis</Text>

            <MissionCard
                icon={<Backpack color="#ea580c" />}
                title="O Lanche da Escola"
                description="Glicemilton está na escola e precisa escolher o lanche. Sua mãe deu dinheiro para comprar algo na cantina. O que ele deve escolher?"
                points="+50 pontos"
            />

            <MissionCard
                icon={<PartyPopper color="#ea580c" />}
                title="A Festa de Aniversário"
                description="Glicemilton foi convidado para a festa do amigo. Tem muitos doces e bolos. Como ele deve se comportar?"
                points="+50 pontos"
            />

            <MissionCard
                icon={<AlertCircle color="#ea580c" />}
                title="O Sintoma Estranho"
                description="Glicemilton está sentindo tontura e fraqueza. Ele mediu a glicemia e estava baixa. O que deve fazer?"
                points="+50 pontos"
            />
        </ScrollView>
    );
}

/* ================= COMPONENTE ================= */

function MissionCard({
                         icon,
                         title,
                         description,
                         points,
                     }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    points: string;
}) {
    return (
        <View style={styles.card}>
            <View style={styles.cardIcon}>{icon}</View>

            <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDescription}>{description}</Text>

                <View style={styles.cardFooter}>
                    <Text style={styles.points}>{points}</Text>

                    <TouchableOpacity style={styles.startButton}>
                        <Text style={styles.startButtonText}>Iniciar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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

    centerCard: {
        backgroundColor: "#fff4d6",
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        marginBottom: 24,
    },

    centerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0f172a",
        marginTop: 8,
    },

    centerSubtitle: {
        fontSize: 13,
        color: "#475569",
        textAlign: "center",
        marginVertical: 6,
    },

    stats: {
        flexDirection: "row",
        marginTop: 12,
    },

    statItem: {
        alignItems: "center",
        marginHorizontal: 20,
    },

    statValue: {
        fontSize: 18,
        fontWeight: "800",
        color: "#ea580c",
    },

    statLabel: {
        fontSize: 12,
        color: "#475569",
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 12,
    },

    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
    },

    cardIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#fff7ed",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    cardTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#0f172a",
    },

    cardDescription: {
        fontSize: 12,
        color: "#475569",
        marginVertical: 6,
    },

    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 6,
    },

    points: {
        fontSize: 12,
        fontWeight: "600",
        color: "#ea580c",
    },

    startButton: {
        backgroundColor: "#fb923c",
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 999,
    },

    startButtonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
    },
});
