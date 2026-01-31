import React, {useCallback, useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {supabase} from "@/lib/supabase";
import {useFocusEffect} from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";

type Medicamento = {
    id_remedio: number;
    nome: string;
    horario: string; // HH:MM ou HH:MM:SS
};


type usoHoje = {
    id_remedio: number;
    data_hora: string;
}

export default function HoraDoSuperpo() {
    const [usuarioId, setUsuarioId] = useState<number | null>(null);
    const [showAdd, setShowAdd] = useState(false);
    const [medicamento, setMedicamento] = useState('')
    const [horario, setHorario] = useState<Date>(new Date());
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
    const [showPicker, setShowPicker] = useState(false);

    const [usosHoje, setUsosHoje] = useState<usoHoje[]>([]);

    async function carregarUsosHoje() {
        if (!usuarioId) return;

        const hoje = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD

        console.log("📅 Buscando usos do dia:", hoje);

        const { data, error } = await supabase
            .from("remedio_uso")
            .select("id_remedio, data_hora")
            .eq("id_usuario", usuarioId)
            .eq("data_br", hoje);

        if (error) {
            console.error("❌ Erro ao buscar usos:", error);
            return;
        }

        const usos: usoHoje[] = data?.map(item => ({
            id_remedio: item.id_remedio,
            data_hora: item.data_hora,
        })) ?? [];

        console.log("✅ Remédios tomados hoje:", usos);

        setUsosHoje(usos);
        console.log(usos)
    }

    async function carregarMedicamentos() {
        const { data, error } = await supabase
            .from('remedio')
            .select('*')
            .eq('id_usuario', usuarioId)
            .order('horario', { ascending: true });

        if (error) {
            console.error(error);
            return;
        }

        setMedicamentos(data ?? []);
        console.log(medicamentos);
    }

    async function inserirMedicamento() {
        if (!medicamento.trim()) {
            Toast.show({
                type: "info",
                text1: "É necessário digitar o medicamento",
            });
            return;
        }

        const horarioFormatado = horario.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
        });

        const { error } = await supabase
            .from('remedio')
            .insert({
                nome: medicamento,
                horario: horarioFormatado,
                ativo: true,
                criado_em: new Date().toISOString(),
                id_usuario: usuarioId,
            });

        if (error) {
            Toast.show({
                type: "error",
                text1: "Erro ao inserir medicação",
            });
        } else {
            Toast.show({
                type: "success",
                text1: "Medicação adicionada!",
            });
            carregarMedicamentos(); // recarrega lista
        }
    }

    async function marcarUsoMedicamento(idRemedio: number) {
        if (!usuarioId) return;

        const { error } = await supabase
            .from("remedio_uso")
            .insert({
                id_usuario: usuarioId,
                id_remedio: idRemedio,
                data_hora: new Date().toISOString(),
                confirmado: true,
            });

        if (error) {
            if (error.code === "23505") {
                Toast.show({
                    type: "error",
                    text1: "Erro ao marcar medicação",
                });
                return;
            }
            Toast.show({
                type: "error",
                text1: "Tomei a Medicação!",
            });
            console.error("❌ Erro ao marcar uso:", error);
            return;
        }

        Toast.show({
            type: "success",
            text1: "Tomei a Medicação!",
        });

        await carregarUsosHoje(); // 👈 ATUALIZA BOTÃO
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
               carregarMedicamentos();
                carregarUsosHoje();
            }
        }, [usuarioId])
    );

    function getporcentagem() {
        const total = medicamentos.length;
        const tomados = usosHoje.length;
        const porcentagem = total === 0 ? 0 : (tomados / total) * 100;
        return porcentagem;
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
            {/* Header */}
            <View style={styles.header}>
                <Ionicons name="bug-outline" size={28} color="#FF8A00" />
                <View>
                    <Text style={styles.headerTitle}>Hora do Superpó</Text>
                    <Text style={styles.headerSubtitle}>
                        Gerencie seus medicamentos
                    </Text>
                </View>
            </View>

            {/* Card progresso */}
            <View style={styles.progressCard}>
                <Ionicons name="medkit" size={40} color="#FF5FA2" />
                <Text style={styles.progressTitle}>Continue seu tratamento</Text>
                <Text style={styles.progressSubtitle}>
                    {usosHoje.length} de {medicamentos.length} medicamentos tomados hoje
                </Text>
                <View style={styles.progressBar}>

                    <View
                        style={[
                            styles.progressBarFill,
                            { width: `${getporcentagem()}%` },
                        ]}
                    />
                </View>
            </View>

            {/* Título + botão + */}
            <View style={styles.sectionHeader}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Ionicons name="bandage-outline" size={18} color="#000" />
                    <Text style={styles.sectionTitle}>Medicamentos de Hoje</Text>
                </View>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setShowAdd(true)}
                >
                    <Ionicons name="add" size={20} color="#2F80ED" />
                </TouchableOpacity>
            </View>

            {showAdd && (
                <View style={styles.addCard}>
                    <Text style={styles.addTitle}>Adicionar Medicamento</Text>

                    <Text style={styles.label}>Nome do medicamento</Text>
                    <TextInput
                        value={medicamento}
                        placeholder="Ex: Metformina"
                        style={styles.input}
                        onChangeText={setMedicamento}
                    />

                    <Text style={styles.label}>Horário</Text>
                    <View style={styles.timeInput}>
                        <TouchableOpacity
                            style={styles.timeInput}
                            onPress={() => setShowPicker(true)}
                        >
                            <Text>
                                {horario.toLocaleTimeString("pt-BR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </Text>
                            <Ionicons name="time-outline" size={18} color="#666" />
                        </TouchableOpacity>

                        {showPicker && (
                            <DateTimePicker
                                value={horario}
                                mode="time"
                                is24Hour
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setShowPicker(false);
                                    if (selectedDate) {
                                        setHorario(selectedDate);
                                    }
                                }}
                            />
                        )}
                    </View>

                    <TouchableOpacity style={styles.addConfirmButton} onPress={inserirMedicamento}>
                        <Text style={styles.addConfirmText}>Adicionar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => setShowAdd(false)}
                    >
                        <Text style={styles.cancelText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            )}
            {/* Lista de medicamentos */}
            {medicamentos.map((med) => {
                const uso = usosHoje.find(u => u.id_remedio === med.id_remedio);

                return (
                    <MedicationCard
                        key={med.id_remedio}
                        idRemedio={med.id_remedio}
                        name={med.nome}
                        time={med.horario.slice(0, 5)}
                        taken={!!uso}
                        onTomei={marcarUsoMedicamento}
                    />
                );
            })}

            {/* Novo dia */}
            <TouchableOpacity style={styles.newDayButton}>
                <Ionicons name="sunny-outline" size={16} color="#000" />
                <Text style={styles.newDayText}>Novo Dia</Text>
            </TouchableOpacity>

            {/* Modal fake – Adicionar Medicamento */}
        </ScrollView>
    );
}

type MedicationCardProps = {
    idRemedio: number;
    name: string;
    time: string;
    taken: boolean;
    onTomei: (idRemedio: number) => void;
};

/* Card de medicamento */
function MedicationCard({ idRemedio, name, time, taken, onTomei }: MedicationCardProps) {
    return (
        <View
            style={[
                styles.medCard,
                taken && styles.medCardTaken // 👈 AQUI
            ]}
        >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View style={styles.iconCircle}>{
                    taken ? (<Ionicons name="checkmark-circle" size={36} color="green" />)
                        : (<Ionicons name="bandage-outline" size={18} color="#2F80ED" />)
                }
                </View>

                <View>
                    <Text style={styles.medName}>{name}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                        <Ionicons name="time-outline" size={14} color="#2F80ED" />
                        <Text style={styles.medTime}>{time}</Text>
                    </View>
                </View>
            </View>

            {!taken && (
                <TouchableOpacity
                    style={styles.tomeiButton}
                    onPress={() => onTomei(idRemedio)}
                >
                    <Text style={styles.tomeiText}>Tomei!</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DFF4FF",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
    },
    headerSubtitle: {
        fontSize: 14,
        color: "#2F80ED",
    },

    progressCard: {
        backgroundColor: "#F6EFFF",
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        marginBottom: 20,
    },
    progressTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginTop: 8,
    },
    progressSubtitle: {
        fontSize: 14,
        color: "#555",
        marginTop: 4,
    },
    progressBar: {
        height: 6,
        width: "100%",
        backgroundColor: "#E0D7F5",
        borderRadius: 6,
        marginTop: 12,
    },

    progressBarFill: {
        height: "100%",
        backgroundColor: "#FF5FA2",
        borderRadius: 8,
    },


    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
    },
    addButton: {
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: 6,
    },

    medCard: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    medName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0F172A",
    },

    medTime: {
        fontSize: 14,
        fontWeight: "500",
        color: "#2F80ED",
    },

    medCardTaken: {
        backgroundColor: "#D1FAE5", // verde claro
        borderColor: "#22C55E",
    },

    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#E0F2FE",
        alignItems: "center",
        justifyContent: "center",
    },

    iconCircleTaken: {
        backgroundColor: "#22C55E",
    },

    takenText: {
        color: "#15803D",
        fontWeight: "700",
        fontSize: 14,
    },

    tomeiButton: {
        backgroundColor: "#A855F7",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },

    tomeiText: {
        color: "#FFFFFF",
        fontWeight: "700",
    },

    newDayButton: {
        alignSelf: "center",
        marginTop: 12,
        flexDirection: "row",
        gap: 6,
        backgroundColor: "#EEF6FF",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 16,
    },
    newDayText: {
        fontSize: 13,
        fontWeight: "600",
    },

    /* Adicionar medicamento */
    addCard: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 16,
        marginTop: 20,
        marginBottom: 20,
    },
    addTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 12,
    },
    label: {
        fontSize: 13,
        fontWeight: "600",
        marginTop: 8,
        marginBottom: 4,
    },
    input: {
        backgroundColor: "#F1FAFF",
        borderRadius: 12,
        padding: 12,
    },
    timeInput: {
        backgroundColor: "#F1FAFF",
        borderRadius: 12,
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    addConfirmButton: {
        backgroundColor: "#FF8A00",
        borderRadius: 14,
        paddingVertical: 12,
        alignItems: "center",
        marginTop: 16,
    },
    addConfirmText: {
        color: "#FFF",
        fontWeight: "700",
    },
    cancelButton: {
        alignItems: "center",
        marginTop: 10,
    },
    cancelText: {
        color: "#2F80ED",
        fontWeight: "600",
    },
});
