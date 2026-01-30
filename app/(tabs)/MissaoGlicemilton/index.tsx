import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { BookOpen, Backpack, PartyPopper, AlertCircle } from "lucide-react-native";
import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabase";
import {router} from "expo-router";

type Mission = {
    id_missao: number;
    titulo: string;
    descricao: string;
    pontos: number;
    respondida_hoje: boolean;
    acertou_hoje: boolean;
};

export default function Index() {
    const [usuarioId, setUsuarioId] = useState<number | null>(null);
    const [missao,  setmisao] = useState<Mission[]>([]);

    async function getMissions() {
        if (!usuarioId) return;


        const { data, error } = await supabase
            .from("vw_missao_respondida_hoje")
            .select("*")
            .eq("id_usuario", usuarioId);

        if (error) {
            console.error("❌ Erro ao buscar atividades:", error);
            return;
        }

        setmisao(data)
        console.log("📊 Data recebida:", data);
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
        getMissions()
    }, [usuarioId]);

    const missoesRespondidasHoje =
        missao.filter(m => m.respondida_hoje).length;

    const pontuacaoMissoes =
        missao.filter(m => m.respondida_hoje && m.acertou_hoje).reduce((acc, m) => acc+m.pontos, 0);
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
                        <Text style={styles.statValue}>{pontuacaoMissoes}</Text>
                        <Text style={styles.statLabel}>Pontos</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text style={[styles.statValue, { color: "#16a34a" }]}>{missoesRespondidasHoje}</Text>
                        <Text style={styles.statLabel}>Missões</Text>
                    </View>
                </View>
            </View>

            {/* MISSÕES */}
            <Text style={styles.sectionTitle}>Missões Disponíveis</Text>
            {
                missao.map(m => (
                    <MissionCard
                        key={m.id_missao}
                        icon={<Backpack color="#ea580c" />}
                        title={m.titulo}
                        description={m.descricao}
                        points={m.pontos}
                        respondida_hoje={m.respondida_hoje}
                        onPress={() =>
                            router.push({
                                pathname: "/MissaoGlicemilton/[id]",
                                params: { id: (m.id_missao) },
                            })
                        }
                    />
                ))
            }
        </ScrollView>
    );
}

/* ================= COMPONENTE ================= */

function MissionCard({
                         icon,
                         title,
                         description,
                         points,
                        respondida_hoje,
                        onPress
                     }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    points: number;
    respondida_hoje: boolean,
    onPress: () => void;
}) {
    return (
        <View style={styles.card}>
            <View style={styles.cardIcon}>{icon}</View>

            <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDescription}>{description}</Text>

                <View style={styles.cardFooter}>
                    <Text style={styles.points}>+{points} pontos</Text>


                    <TouchableOpacity
                        style={[
                            styles.startButton,
                            respondida_hoje && styles.startButtonDisabled,
                        ]}
                        onPress={onPress}
                        disabled={respondida_hoje}
                    >
                        <Text style={styles.startButtonText}>
                            {respondida_hoje ? "Respondida" : "Iniciar"}
                        </Text>
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

    startButtonDisabled: {
        backgroundColor: "#d1d5db",
    },

    startButtonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
    },
});
