import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Shield, Droplet, Footprints, Heart, Sun, Eye, Lock, CircleCheckBig  } from "lucide-react-native";
import Screen from "@/app/components/Screen";
import {useCallback, useEffect, useState} from "react";
import {supabase} from "@/lib/supabase";
import {useFocusEffect} from "expo-router";
import Toast from "react-native-toast-message";
import {getUsuarioId} from "@/utils/utils";
import {styles} from "./styles";

type Cuidados = {
    id: number;
    titulo: string;
    descricao: string;
    icone: string;
    ordem: number;
    concluido: boolean;
    data: string | null;
};

export default function Index() {
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
            const id = await getUsuarioId();

            if (id) {
                setUsuarioId(id); // 👈 continua sendo state da tela
            }
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