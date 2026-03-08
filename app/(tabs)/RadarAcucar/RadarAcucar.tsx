import React, {useCallback, useEffect, useState} from "react";
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
import {useFocusEffect} from "expo-router";
import {getUsuarioId} from "@/utils/utils";
import {styles} from "./styles";

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
        message: 'Glicemilton needs attention! Eat something sweet',
        value: 54
    },

    {
        id: 2,
        title: 'Glicemia Normal!',
        message: 'Glicemilton is calm! Keep it up!',
        value: 72
    },

    {
        id: 3,
        title: 'Glicemia Alta!',
        message: 'Glicemilton is worried. Consult your doctor!',
        value: 54
    },
]

type Periodo = 1 | 2 | 3;

const PERIODOS: Record<Periodo, string> = {
    1: 'Jejum',
    2: 'After meal',
    3: 'Antes de dormir',
};

type GlicemiaRegistro = {
    valor_mgdl: number;
    data_hora: string;
};


type Classificacao = 'baixa' | 'normal' | 'alta';



const classificarGlicemia = (
    valor: number,
    periodo: Periodo
): Classificacao => {
    if (periodo === 1) { // Jejum
        if (valor < 70) return 'baixa';
        if (valor > 99) return 'alta';
        return 'normal';
    }

    if (periodo === 2) { // After meal
        if (valor < 80) return 'baixa';
        if (valor > 140) return 'alta';
        return 'normal';
    }

    if (periodo === 3) { // Antes de dormir
        if (valor < 100) return 'baixa';
        if (valor > 140) return 'alta';
        return 'normal';
    }

    return 'normal';
};

export default function RadarAcucar() {

    const [usuarioId, setUsuarioId] = useState<number | null>(null);
    const [valueGlicemy, setValueGlicemy] = useState('');
    const [glicemiaRegistrada, setGlicemiaRegistrada] = useState<number | null>(null);
    const [periodoRegistrado, setPeriodoRegistrado] = useState<Periodo | null>(null);
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
            alert('Select the period');
            return;
        }

        if (!usuarioId) {
            alert('User not identified');
            return;
        }

        const valor = parseFloat(valueGlicemy.replace(",", "."));

        if (isNaN(valor)) {
            alert('Invalid value');
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
            setGlicemiaRegistrada(valor);
            setPeriodoRegistrado(periodo);

            await carregarUltimasGlicemias(usuarioId);
        }
    };

    const carregarUltimasGlicemias = async (id_usuario:number) => {
        const { data: glicemias, error: glicemiasError } = await supabase
            .from('glicemia')
            .select('valor_mgdl, data_hora')
            .eq('id_usuario', id_usuario)
            .order('data_hora', { ascending: false })
            .limit(3);

        if (glicemiasError) {
            console.log('Erro ao buscar glicemias:', glicemiasError);
        } else {
            console.log(glicemias)
            setLastRegistry(glicemias ?? []);
        }
    };

    useEffect(() => {
        async function init() {
            const id = await getUsuarioId();

            if (id) {
                setUsuarioId(id); // 👈 continua sendo state da tela
            }
        }

        init();
    }, []);

    const limparFormulario = () => {
        setGlicemiaRegistrada(null);
        setPeriodoRegistrado(null);
    };

    useEffect(() => {
        if (glicemiaRegistrada !== null) {
            const timer = setTimeout(limparFormulario, 5000);
            return () => clearTimeout(timer);

        }
    }, [glicemiaRegistrada]);


    useFocusEffect(
        useCallback(() => {
            if (usuarioId) {
                carregarUltimasGlicemias(usuarioId);
            }
        }, [usuarioId])
    );

    return (
        <Screen>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>

                {/* Card Mensagem*/}
                {glicemiaRegistrada !== null && periodoRegistrado !== null && (() => {
                    const classificacao = classificarGlicemia(
                        glicemiaRegistrada,
                        periodoRegistrado
                    );

                    const config = {

                        baixa: {
                            title: 'Low Glicemy',
                            subtitle: 'Your blood glucose is below the ideal range. Consume a quick sugar source, such as juice or glucose, and avoid physical effort until you feel better.',
                            color: '#FF9500',
                        },
                        normal: {
                            title: 'Normal Glicemy',
                            subtitle: 'Your blood glucose is within the ideal range. Keep a balanced diet and continue your care routine.',
                            color: '#34C759',
                        },
                        alta: {
                            title: 'High Glicemy',
                            subtitle: 'Your blood glucose is above the recommended range. Stay hydrated, follow your medication correctly, and seek professional guidance if needed.',
                            color: '#FF3B30',
                        },
                    }[classificacao];

                    return (
                        <View style={[styles.messageCard, { borderColor: config.color }]}>
                            <Ionicons name="alert-circle" size={42} color={config.color} />

                            <Text style={[styles.messageTitle, { color: config.color }]}>
                                {config.title}
                            </Text>

                            <Text style={[styles.messageSubtitle, { color: config.color }]}>
                                {config.subtitle}
                            </Text>

                            <Text style={[styles.messageValue, { color: config.color }]}>
                                {glicemiaRegistrada} mg/dL
                            </Text>
                        </View>
                    );
                })()}




                {/* Card destaque */}
                <View style={styles.highlightCard}>
                    <Ionicons name="bar-chart-outline" size={40} color="#2F80ED" />
                    <Text style={styles.highlightTitle}>Registre sua glicemia</Text>
                    <Text style={styles.highlightSubtitle}>
                        Help Glicemilton monitor his health!
                    </Text>
                </View>

                {/* Card formulário */}
                <View style={styles.card}>
                    <View style={styles.cardTitleRow}>
                        <Ionicons name="pulse-outline" size={18} color="#000" />
                        <Text style={styles.cardTitle}>Blood Glucose Recorder</Text>
                    </View>

                    <Text style={styles.label}>Value (mg/dL)</Text>
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

                    <Text style={styles.label}>Period</Text>

                    <View style={styles.select}>
                        <Picker
                            selectedValue={periodo}
                            onValueChange={(value) => setPeriodo(Number(value) as Periodo)}
                            style={styles.picker}
                            dropdownIconColor="#666"
                        >
                            <Picker.Item label="Fasting" value={1} />
                            <Picker.Item label="After meal" value={2} />
                            <Picker.Item label="Before bed" value={3} />
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
                        <Text style={styles.cardTitle}>Reference Ranges</Text>
                    </View>

                    <View style={styles.rangeRow}>
                        <Text style={styles.rangeLabel}>Fasting:</Text>
                        <Text style={styles.rangeValue}>70-99 mg/dL</Text>
                    </View>

                    <View style={styles.rangeRow}>
                        <Text style={styles.rangeLabel}>After meal:</Text>
                        <Text style={styles.rangeValue}>80-140 mg/dL</Text>
                    </View>

                    <View style={styles.rangeRow}>
                        <Text style={styles.rangeLabel}>Before bed:</Text>
                        <Text style={styles.rangeValue}>100-140 mg/dL</Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.cardTitleRow}>
                        <Ionicons name="time-outline" size={18} color="#000" />
                        <Text style={styles.cardTitle}>Latest Records</Text>
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

