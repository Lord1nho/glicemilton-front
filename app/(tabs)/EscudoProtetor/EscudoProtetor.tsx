import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Shield, Droplet, Footprints, Heart, Sun, Eye, Lock, CircleCheckBig  } from "lucide-react-native";
import Screen from "@/app/components/Screen";
import {useCallback, useEffect, useState} from "react";
import {supabase} from "@/lib/supabase";
import {useFocusEffect} from "expo-router";
import Toast from "react-native-toast-message";

type Cuidados = {
    id: number;
    titulo: string;
    descricao: string;
    icone: string;
    ordem: number;
    concluido: boolean;
    data: string | null;
};

export default function EscudoProtetor() {
    const [usuarioId, setUsuarioId] = useState<number | null>(null);
    const [cuidados, setCuidados] = useState<Cuidados[]>([]);

    const hoje = new Date().toISOString().slice(0, 10);

    async function handleCuidados(item: Cuidados) {
        const { error } = await supabase
            .from("usuario_cuidados")
            .upsert({
                id_usuario: usuarioId,
                cuidado_id: item.id,
                data: hoje, // 🔥 DATE
                concluido: true,
                concluido_em: new Date().toISOString(),
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
           text1: "Cuidado diário concluído! Continue assim!",
       });

        carregarCuidados();
    }

    async function carregarCuidados() {
        const { data, error } = await supabase
            .from('v_cuidados_usuario')
            .select('*');

        if (error) {
            console.error(error);
            return;
        }

        setCuidados(data ?? []);
        console.log(data);
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

    useFocusEffect(
        useCallback(() => {
            if (usuarioId) {
                carregarCuidados();
            }
        }, [usuarioId])
    );

    function getCuidadosFeitos(cuidados: Cuidados[]) {
        return cuidados.filter(cuidado => cuidado.concluido).length;
    }


    const cuidadosFeitos = getCuidadosFeitos(cuidados);
    const cuidadosTotais = cuidados.length
    const progresso =
        cuidadosTotais > 0
            ? Math.round((cuidadosFeitos / cuidadosTotais) * 100)
            : 0;

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

                    <Text style={styles.progressTitle}>Nível de Proteção: {progresso}%</Text>
                    <Text style={styles.progressSubtitle}>
                        {progresso === 0
                            ? "Sem escudo! Comece a se proteger!"
                            : progresso < 50
                                ? "Proteção inicial!"
                                : progresso < 100
                                    ? "Quase lá! Continue!"
                                    : "Escudo máximo ativado!"}
                    </Text>

                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${progresso}%` }]} />
                    </View>

                    <Text style={styles.progressFooter}>{getCuidadosFeitos(cuidados)} de {cuidados.length} cuidados completos</Text>
                </LinearGradient>

                {/* CUIDADOS */}
                <Text style={styles.sectionTitle}>Cuidados de Hoje</Text>
                {
                    cuidados.map((cuidado: Cuidados) => (
                        <CareCard
                            key={cuidado.id}
                            icon={
                                cuidado.concluido
                                    ? <CircleCheckBig color="#22c55e" size={24} />
                                    : <Droplet color="#3b82f6" />
                            }
                            title={cuidado.titulo}
                            description={cuidado.descricao}
                            onPress={()=> handleCuidados(cuidado)}
                            concluido={cuidado.concluido}
                        />
                    ))
                }

            </ScrollView>
        </Screen>

    );
}

/* ================== COMPONENTE DE CARD ================== */

function CareCard({
                      icon,
                      title,
                      description,
                      concluido,
                      onPress,
                  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    concluido: boolean;
    onPress: () => void;
}) {
    return (
        <View style={styles.card}>
            <View style={styles.cardIcon}>{icon}</View>

            <View style={{ flex: 1 }}>
                <Text style={[styles.cardTitle, concluido && styles.cardTitleDisabled]}>{title}</Text>
                <Text style={styles.cardDescription}>{description}</Text>
                {concluido ? (<Text style={styles.textProtetcionAtivacted}>✅ Proteção ativada!</Text>) : (
                    <TouchableOpacity
                        style={[
                            styles.cardButton,
                            concluido && styles.cardButtonDisabled,
                        ]}
                        onPress={onPress}
                        disabled={concluido}
                    >
                        <Shield color="#fff" size={14} />
                        <Text style={styles.cardButtonText}>
                            {concluido ? "Concluído" : "Concluir"}
                        </Text>
                    </TouchableOpacity>
                )}
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

    cardTitleDisabled : {
     color: "#3b82f6",
    },

    cardDescription: {
        fontSize: 12,
        color: "#475569",
        marginVertical: 6,
    },

    textProtetcionAtivacted: {
        color: "#3b82f6",
        fontWeight: "600"
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

    cardButtonDisabled: {
        backgroundColor: "#9ca3af", // cinza
        opacity: 0.6,
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
