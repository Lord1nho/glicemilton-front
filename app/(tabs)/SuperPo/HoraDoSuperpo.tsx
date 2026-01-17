import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HoraDoSuperpo() {
    const [showAdd, setShowAdd] = useState(false);

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
                    0 de 3 medicamentos tomados hoje
                </Text>
                <View style={styles.progressBar} />
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

            {/* Lista de medicamentos */}
            <MedicationCard name="Metformina" time="08:00" />
            <MedicationCard name="Insulina" time="12:00" />
            <MedicationCard name="Vitaminas" time="20:00" />

            {/* Novo dia */}
            <TouchableOpacity style={styles.newDayButton}>
                <Ionicons name="sunny-outline" size={16} color="#000" />
                <Text style={styles.newDayText}>Novo Dia</Text>
            </TouchableOpacity>

            {/* Modal fake – Adicionar Medicamento */}
            {showAdd && (
                <View style={styles.addCard}>
                    <Text style={styles.addTitle}>Adicionar Medicamento</Text>

                    <Text style={styles.label}>Nome do medicamento</Text>
                    <TextInput
                        placeholder="Ex: Metformina"
                        style={styles.input}
                    />

                    <Text style={styles.label}>Horário</Text>
                    <View style={styles.timeInput}>
                        <Text style={{ color: "#999" }}>--:--</Text>
                        <Ionicons name="time-outline" size={18} color="#666" />
                    </View>

                    <TouchableOpacity style={styles.addConfirmButton}>
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
        </ScrollView>
    );
}

/* Card de medicamento */
function MedicationCard({ name, time }: { name: string; time: string }) {
    return (
        <View style={styles.medCard}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View style={styles.iconCircle}>
                    <Ionicons name="bandage-outline" size={18} color="#2F80ED" />
                </View>

                <View>
                    <Text style={styles.medName}>{name}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                        <Ionicons name="time-outline" size={14} color="#2F80ED" />
                        <Text style={styles.medTime}>{time}</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.tomeiButton}>
                <Ionicons name="sparkles" size={14} color="#FFF" />
                <Text style={styles.tomeiText}>Tomei!</Text>
            </TouchableOpacity>
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
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#EEF6FF",
        justifyContent: "center",
        alignItems: "center",
    },
    medName: {
        fontSize: 14,
        fontWeight: "700",
    },
    medTime: {
        fontSize: 12,
        color: "#2F80ED",
    },

    tomeiButton: {
        backgroundColor: "#B85CFF",
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    tomeiText: {
        color: "#FFF",
        fontWeight: "700",
        fontSize: 12,
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
