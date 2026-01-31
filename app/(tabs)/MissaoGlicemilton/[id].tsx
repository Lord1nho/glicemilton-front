import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from "react-native";
import { supabase } from "@/lib/supabase";
import {getUsuarioId} from "@/utils/utils";

/* ================= TYPES ================= */

type Alternativa = {
    id_alternativa: number;
    texto: string;
    correta: boolean;
};

type Questao = {
    id_questao: number;
    enunciado: string;
    alternativa_missao: Alternativa[];
};

type Missao = {
    id_missao: number;
    titulo: string;
    descricao: string;
    pontos: number;
    questao_missao: Questao[];
};

/* ================= COMPONENT ================= */

export default function Missao() {
    const [usuarioId, setUsuarioId] = useState<number | null>(null);
    const { id } = useLocalSearchParams<{ id: string }>();
    const idMissao = Number(id);

    const [missao, setMissao] = useState<Missao | null>(null);
    const [selecionada, setSelecionada] = useState<Alternativa | null>(null);
    const [confirmou, setConfirmou] = useState(false);

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
        if (!idMissao) return;
        buscarMissao();
    }, [idMissao]);

    async function buscarMissao() {
        const { data, error } = await supabase
            .from("missao")
            .select(`
        id_missao,
        titulo,
        descricao,
        pontos,
        questao_missao (
          id_questao,
          enunciado,
          alternativa_missao (
            id_alternativa,
            texto,
            correta
          )
        )
      `)
            .eq("id_missao", idMissao)
            .single();

        if (error) {
            console.error("Erro ao buscar missão:", error);
            return;
        }

        setMissao(data);
    }

    if (!missao) return null;

    // MVP: 1 pergunta por missão
    const questao = missao.questao_missao[0];

    async function confirmar() {
        console.log("🟡 confirmar() chamado");

        if (!selecionada) {
            console.log("🔴 Nenhuma alternativa selecionada");
            return;
        }

        console.log("🟢 Alternativa selecionada:", {
            id_alternativa: selecionada.id_alternativa,
            correta: selecionada.correta,
        });

        console.log("🟡 usuarioId antes do insert:", usuarioId);

        if (!usuarioId) {
            console.log("🔴 usuarioId é null ou undefined");
            return;
        }

        console.log("🟡 Inserindo no banco...");

        const { data, error } = await supabase
            .from("resposta_usuario_missao")
            .insert({
                id_usuario: usuarioId,
                id_missao: idMissao, // ⭐ FALTAVA ISSO
                id_alternativa: selecionada.id_alternativa,
                data_hora: new Date().toISOString(),
            })

        console.log("🟡 Resultado do insert:", { data, error });

        if (error) {
            console.error("❌ Erro ao salvar resposta:", error);
            return;
        }

        console.log("✅ Resposta salva com sucesso");

        setConfirmou(true);
    }

    function finalizar() {
        router.replace(`/MissaoGlicemilton`);
    }



    return (
        <ScrollView>
            <View style={{ flex: 1, backgroundColor: "#e0f2fe", padding: 20 }}>
                {/* HEADER */}
                <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
                    {missao.titulo}
                </Text>
                <Text style={{ textAlign: "center", marginBottom: 12 }}>
                    Pergunta 1 de 1
                </Text>

                {/* DESCRIÇÃO */}
                <View
                    style={{
                        backgroundColor: "#f1f5f9",
                        padding: 16,
                        borderRadius: 12,
                        marginBottom: 16,
                    }}
                >
                    <Text style={{ textAlign: "center" }}>{missao.descricao}</Text>
                </View>

                {/* PERGUNTA */}
                <View
                    style={{
                        backgroundColor: "#fff",
                        padding: 16,
                        borderRadius: 12,
                    }}
                >
                    <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                        {questao.enunciado}
                    </Text>

                    {questao.alternativa_missao.map((alt, index) => {
                        const ativa = selecionada?.id_alternativa === alt.id_alternativa;

                        return (
                            <TouchableOpacity
                                key={alt.id_alternativa}
                                disabled={confirmou}
                                onPress={() => setSelecionada(alt)}
                                style={{
                                    marginTop: 12,
                                    padding: 14,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: ativa ? "#fb923c" : "#cbd5f5",
                                    backgroundColor: ativa ? "#ffedd5" : "#fff",
                                }}
                            >
                                <Text>
                                    {String.fromCharCode(65 + index)} – {alt.texto}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* FEEDBACK */}
                {confirmou && selecionada && (
                    <View
                        style={{
                            marginTop: 20,
                            padding: 16,
                            borderRadius: 12,
                            backgroundColor: selecionada.correta
                                ? "#dcfce7"
                                : "#fef3c7",
                        }}
                    >
                        <Text style={{ textAlign: "center" }}>
                            {selecionada.correta
                                ? "✔️ Resposta correta!"
                                : "💡 Escolher alimentos mais equilibrados ajuda a manter a glicemia controlada."}
                        </Text>
                    </View>
                )}

                {/* BOTÕES */}
                <View style={styles.footerActions}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={()=>router.back()}
                    >
                        <Text style={styles.backText}>← Voltar</Text>
                    </TouchableOpacity>

                    {!confirmou ? (
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={confirmar}
                        >
                            <Text style={styles.confirmText}>Confirmar</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={finalizar}
                        >
                            <Text style={styles.confirmText}>Finalizar</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </ScrollView>

    );
}



const styles = StyleSheet.create({
    footerActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
        backgroundColor: "#DFF4FF",
    },

    backButton: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        paddingVertical: 14,
        alignItems: "center",

        // sombra leve
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },

    backText: {
        color: "#1E40AF",
        fontWeight: "700",
        fontSize: 15,
    },

    confirmButton: {
        flex: 1,
        backgroundColor: "#FB923C", // laranja
        borderRadius: 18,
        paddingVertical: 14,
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 3,
    },

    confirmText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 15,
    },
})