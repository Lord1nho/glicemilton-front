import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Shield, Droplet, Footprints, Heart, Sun, Eye, Lock } from "lucide-react-native";
import Screen from "@/app/components/Screen";

export default function EscudoProtetor() {
    return (
        <Screen>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>

                {/* HEADER */}
                <View style={styles.header}>
                    <Text style={styles.title}>Complete as dicas de cuidados diários</Text>
                </View>

                {/* CARD DE PROGRESSO */}
                <LinearGradient
                    colors={["#ff4d4d", "#ff7a18"]}
                    style={styles.progressCard}
                >
                    <View style={styles.iconCircle}>
                        <Shield color="#fff" size={28} />
                    </View>

                    <Text style={styles.progressTitle}>Nível de Proteção: 0%</Text>
                    <Text style={styles.progressSubtitle}>
                        Sem escudo! Comece a se proteger!
                    </Text>

                    <View style={styles.progressBarBackground}>
                        <View style={styles.progressBarFill} />
                    </View>

                    <Text style={styles.progressFooter}>0 de 5 cuidados completos</Text>
                </LinearGradient>

                {/* CUIDADOS */}
                <Text style={styles.sectionTitle}>Cuidados de Hoje</Text>

                <CareCard
                    icon={<Droplet color="#3b82f6" />}
                    title="Beba 8 copos de água"
                    description="Mantenha-se hidratado para ajudar o Glicemilton a processar o açúcar"
                />

                <CareCard
                    icon={<Footprints color="#3b82f6" />}
                    title="Examine os pés"
                    description="Verifique se há feridas, calos ou machucados nos pés"
                />

                <CareCard
                    icon={<Heart color="#3b82f6" />}
                    title="Faça alongamento"
                    description="10 minutos de alongamento melhoram a circulação"
                />

                <CareCard
                    icon={<Sun color="#3b82f6" />}
                    title="Proteja-se do sol"
                    description="Use protetor solar e óculos ao sair de casa"
                />

                <CareCard
                    icon={<Eye color="#3b82f6" />}
                    title="Monitore a visão"
                    description="Faça pausas na tela e pisque com frequência"
                />

                {/* BOTÃO FINAL */}
                <TouchableOpacity style={styles.renewButton}>
                    <Lock color="#2563eb" size={18} />
                    <Text style={styles.renewButtonText}>Renovar Proteções</Text>
                </TouchableOpacity>
            </ScrollView>
        </Screen>

    );
}

/* ================== COMPONENTE DE CARD ================== */

function CareCard({
                      icon,
                      title,
                      description,
                  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <View style={styles.card}>
            <View style={styles.cardIcon}>{icon}</View>

            <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDescription}>{description}</Text>

                <TouchableOpacity style={styles.cardButton}>
                    <Shield color="#fff" size={14} />
                    <Text style={styles.cardButtonText}>Concluir</Text>
                </TouchableOpacity>
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

    progressCard: {
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
    },

    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "rgba(255,255,255,0.25)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },

    progressTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
    },

    progressSubtitle: {
        fontSize: 13,
        color: "#fff",
        opacity: 0.9,
        marginVertical: 6,
    },

    progressBarBackground: {
        height: 8,
        backgroundColor: "rgba(255,255,255,0.3)",
        borderRadius: 4,
        marginTop: 10,
    },

    progressBarFill: {
        width: "5%",
        height: "100%",
        backgroundColor: "#fff",
        borderRadius: 4,
    },

    progressFooter: {
        marginTop: 8,
        fontSize: 12,
        color: "#fff",
        opacity: 0.9,
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
        alignItems: "flex-start",
    },

    cardIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#eff6ff",
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

    cardButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#3b82f6",
        alignSelf: "flex-start",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        marginTop: 4,
    },

    cardButtonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
        marginLeft: 6,
    },

    renewButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#dbeafe",
        padding: 12,
        borderRadius: 999,
        marginTop: 12,
    },

    renewButtonText: {
        color: "#2563eb",
        fontWeight: "700",
        marginLeft: 8,
    },
});
