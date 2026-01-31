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
import {getUsuarioId} from "@/utils/utils";
import {styles} from "./styles"

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

        const agora = new Date();

        const inicioLocal = new Date(
            agora.getFullYear(),
            agora.getMonth(),
            agora.getDate(),
            0, 0, 0
        );

        const fimLocal = new Date(
            agora.getFullYear(),
            agora.getMonth(),
            agora.getDate(),
            23, 59, 59
        );

        const { data, error } = await supabase
            .from("remedio_uso")
            .select("id_remedio, data_hora")
            .eq("id_usuario", usuarioId)
            .gte("data_hora", inicioLocal.toISOString())
            .lte("data_hora", fimLocal.toISOString());

        if (error) {
            console.error(error);
            return;
        }

        setUsosHoje(data ?? []);
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
