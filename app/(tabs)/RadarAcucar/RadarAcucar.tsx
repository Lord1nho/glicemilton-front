import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import Screen from "@/app/components/Screen";
import {supabase} from "@/lib/supabase";
import Toast from "react-native-toast-message";

type message = {
    id: number;
    title: string;
    message: string;
    value: number;
}



const messagesGlicemia: message[] = [
    {
        id: 1,
        title: 'Glicemia Baixa!',
        message: 'Glicemilton precisa de atenção! Coma algo doce',
        value: 54
    },

    {
        id: 2,
        title: 'Glicemia Normal!',
        message: 'Glicemilton está tranquilo! Continue assim!',
        value: 72
    },

    {
        id: 3,
        title: 'Glicemia Alta!',
        message: 'Glicemilton está preocupado. Consulte seu médico!',
        value: 54
    },
]

type Periodo = 1 | 2 | 3;

const PERIODOS: Record<Periodo, string> = {
    1: 'Jejum',
    2: 'Após refeição',
    3: 'Antes de dormir',
};

type GlicemiaRegistro = {
    valor_mgdl: number;
    data_hora: string;
};

export default function RadarAcucar() {

    const [usuarioId, setUsuarioId] = useState<number | null>(null);
    const [valueGlicemy, setValueGlicemy] = useState('');
    const [periodo, setPeriodo] = useState<Periodo>(1);
    const [nivelGlicemy, setNivelGlicemy ] = useState<number | null>(null);
    const [lastRegistry,  setLastRegistry] = useState<GlicemiaRegistro[]>([]);

    const registrarGlicemia = async () => {
        // 1️⃣ validações
        if (!valueGlicemy) {
            alert('Informe o valor da glicemia');
            return;
        }

        if (!periodo) {
            alert('Selecione o período');
            return;
        }

        if (!usuarioId) {
            alert('Usuário não identificado');
            return;
        }

        const valor = Number(valueGlicemy);

        if (isNaN(valor)) {
            alert('Valor inválido');
            return;
        }

        // 2️⃣ salvar no Supabase
        const { error } = await supabase
            .from('glicemia')
            .insert({
                id_usuario: usuarioId,
                valor_mgdl: valor,
                periodo: periodo,
                descricao_periodo: PERIODOS[periodo],
            });

        // 3️⃣ feedback
        if (error) {
            console.error(error);
            alert('Erro ao registrar glicemia');
        } else {
            Toast.show({
                type: "success",
                text1: `Glicemia registrada com sucesso!`,
            });
            setValueGlicemy('');
        }
    };

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

            // 3️⃣ busca últimas 3 glicemias
            const { data: glicemias, error: glicemiasError } = await supabase
                .from('glicemia')
                .select('valor_mgdl, data_hora')
                .eq('id_usuario', usuario.id_usuario)
                .order('data_hora', { ascending: false })
                .limit(3);

            if (glicemiasError) {
                console.log('Erro ao buscar glicemias:', glicemiasError);
            } else {
                console.log(glicemias)
                setLastRegistry(glicemias ?? []);
            }
        }

        init();
    }, []);

    return (
        <Screen>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>

                {/* Card Mensagem*/}
                <View style={styles.messageCard}>
                    <Ionicons name="alert-circle" size={42} color="#FF3B30" />

                    <Text style={styles.messageTitle}>Glicemia Alta!</Text>

                    <Text style={styles.messageSubtitle}>
                        Glicemilton está preocupado. Consulte seu médico!
                    </Text>

                    <Text style={styles.messageValue}>234 mg/dL</Text>
                </View>

                {/* Card destaque */}
                <View style={styles.highlightCard}>
                    <Ionicons name="bar-chart-outline" size={40} color="#2F80ED" />
                    <Text style={styles.highlightTitle}>Registre sua glicemia</Text>
                    <Text style={styles.highlightSubtitle}>
                        Ajude o Glicemilton a monitorar sua saúde!
                    </Text>
                </View>

                {/* Card formulário */}
                <View style={styles.card}>
                    <View style={styles.cardTitleRow}>
                        <Ionicons name="pulse-outline" size={18} color="#000" />
                        <Text style={styles.cardTitle}>Registrar Glicemia</Text>
                    </View>

                    <Text style={styles.label}>Valor (mg/dL)</Text>
                    <TextInput
                        placeholder="Ex: 95"
                        placeholderTextColor="#999"
                        style={styles.input}
                        value={valueGlicemy}
                        onChangeText={setValueGlicemy}
                        keyboardType="numeric"
                        inputMode="numeric"
                        maxLength={3}
                    />

                    <Text style={styles.label}>Período</Text>

                    <View style={styles.select}>
                        <Picker
                            selectedValue={periodo}
                            onValueChange={(value) => setPeriodo(value)}
                            style={styles.picker}
                            dropdownIconColor="#666"
                        >
                            <Picker.Item label="Em jejum" value={1} />
                            <Picker.Item label="Após refeição" value={2} />
                            <Picker.Item label="Antes de dormir" value={3} />
                        </Picker>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={registrarGlicemia}>
                        <Ionicons name="bar-chart" size={18} color="#FFF" />
                        <Text style={styles.buttonText}>Registrar Glicemia</Text>
                    </TouchableOpacity>
                </View>

                {/* Card faixas */}
                <View style={styles.card}>
                    <View style={styles.cardTitleRow}>
                        <Ionicons name="clipboard-outline" size={18} color="#000" />
                        <Text style={styles.cardTitle}>Faixas de Referência</Text>
                    </View>

                    <View style={styles.rangeRow}>
                        <Text style={styles.rangeLabel}>Jejum:</Text>
                        <Text style={styles.rangeValue}>70-99 mg/dL</Text>
                    </View>

                    <View style={styles.rangeRow}>
                        <Text style={styles.rangeLabel}>Após refeição:</Text>
                        <Text style={styles.rangeValue}>80-140 mg/dL</Text>
                    </View>

                    <View style={styles.rangeRow}>
                        <Text style={styles.rangeLabel}>Antes de dormir:</Text>
                        <Text style={styles.rangeValue}>100-140 mg/dL</Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.cardTitleRow}>
                        <Ionicons name="time-outline" size={18} color="#000" />
                        <Text style={styles.cardTitle}>Últimos Registros</Text>
                    </View>


                    {
                        lastRegistry.map((item,index) => (
                            <View key={index} style={styles.lastRecordRow}>
                                <View style={styles.lastRecordLeft}>
                                    <Ionicons name="warning-outline" size={18} color="#F2A900" />
                                    <Text style={styles.lastRecordValue}>{`${item.valor_mgdl} mg/dl`}</Text>
                                </View>

                                <Text style={styles.lastRecordTime}>{new Date(item.data_hora).toLocaleTimeString('pt-BR', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}</Text>
                            </View>
                        ))
                    }

                </View>
            </ScrollView>
        </Screen>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DFF4FF",
    },
    content: {
        padding: 16,
        paddingBottom: 40,
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
        color: "#0A2A43",
    },
    headerSubtitle: {
        fontSize: 14,
        color: "#2F80ED",
    },

    highlightCard: {
        backgroundColor: "#EEF8FF",
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        marginBottom: 20,
    },
    highlightTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#2F80ED",
        marginTop: 8,
    },
    highlightSubtitle: {
        fontSize: 14,
        color: "#555",
        textAlign: "center",
        marginTop: 4,
    },

    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
    },
    cardTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "700",
    },


    label: {
        fontSize: 14,
        marginBottom: 4,
        marginTop: 12,
        fontWeight: "600",
    },

    input: {
        backgroundColor: "#F1FAFF",
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
    },

    select: {
        backgroundColor: "#F1FAFF",
        borderRadius: 12,
    },

    picker: {
       width: "100%",
    },
    selectText: {
        fontSize: 14,
        color: "#333",
    },

    button: {
        backgroundColor: "#FF8A00",
        borderRadius: 14,
        paddingVertical: 14,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
    },

    rangeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    rangeLabel: {
        fontSize: 14,
    },
    rangeValue: {
        fontSize: 14,
        fontWeight: "700",
        color: "#27AE60",
    },

    lastRecordRow: {
        backgroundColor: "#F8FCFF",
        borderRadius: 12,
        padding: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    lastRecordLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    lastRecordValue: {
        fontSize: 14,
        fontWeight: "700",
        color: "#000",
    },

    lastRecordTime: {
        fontSize: 12,
        color: "#2F80ED",
    },

    messageCard: {
        backgroundColor: "#F2ECEC",
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 16,
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "#FF3B30",
        marginBottom: 20,
    },

    messageTitle: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: "700",
        color: "#FF3B30",
    },

    messageSubtitle: {
        marginTop: 6,
        fontSize: 13,
        color: "#FF3B30",
        textAlign: "center",
    },

    messageValue: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: "800",
        color: "#FF3B30",
    },

});
