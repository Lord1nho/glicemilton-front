import { useEffect, useMemo, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import Toast from "react-native-toast-message";
import { Alert } from "react-native";
import { MoodState, MOOD_STATES } from "../DiarioFormiga/mood"
import {useFocusEffect} from "expo-router";

export default function useDiarioFormigaService() {
    const [usuarioId, setUsuarioId] = useState<number | null>(null);
    const [estadoSelecionado, setEstadoSelecionado] =
        useState<MoodState | null>(null);
    const [jaRegistradoHoje, setJaRegistradoHoje] = useState(false);
    const [loading, setLoading] = useState(true);
    const [historico, setHistorico] = useState<
        { data: string; estado: MoodState }[]
    >([]);

    useEffect(() => {
        async function init() {
            // 1️⃣ carrega sessão
            const {data: sessionData} = await supabase.auth.getSession();

            if (!sessionData.session) return;

            const authId = sessionData.session.user.id;

            // 2️⃣ busca id_usuario
            const {data: usuario, error: usuarioError} = await supabase
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

    async function carregarHistorico() {
        const {data: humor, error: humorError} = await supabase
            .from('humor_diario')
            .select('data, estado')
            .eq('id_usuario', usuarioId)
            .order('data', {ascending: false})
            .limit(3);

        if (humorError) {
            console.error(humorError);
        } else {
            console.log(humor)
            setHistorico(humor);
        }
    }

    async function salvarNoDiario() {
        if (!estadoSelecionado) {
            Alert.alert("Atenção", "Selecione como você está se sentindo primeiro.");
            return;
        }

        setLoading(true);
        const {error} = await supabase.from("humor_diario").insert({
            id_usuario: usuarioId,
            estado: estadoSelecionado,
            data: new Date().toISOString().split("T")[0],
        });

        if (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível salvar no diário.");
        } else {
            Toast.show({
                type: "success",
                text1: "Humor salvo no diário 💚",
            });

            setEstadoSelecionado(null);
            setLoading(false);
            setJaRegistradoHoje(true)
        }
    }

    const stats = useMemo(() => {
        const diasRegistrados = historico.length;

        const diasPositivos = historico.filter(
            (item) => MOOD_STATES[item.estado].positivo
        ).length;

        const positividade =
            diasRegistrados > 0
                ? Math.round((diasPositivos / diasRegistrados) * 100)
                : 0;

        return {
            diasRegistrados,
            diasPositivos,
            positividade,
        };
    }, [historico]);

    useEffect(() => {
        if (usuarioId) {
            verificarRegistroHoje();
            carregarHistorico();
        }
    }, [usuarioId]);


    useFocusEffect(
        useCallback(() => {
            if (usuarioId) {
                carregarHistorico()
                verificarRegistroHoje();
            }
        }, [usuarioId])
    );

    async function verificarRegistroHoje() {
        if (!usuarioId) {
            console.log("usuarioId ainda não carregado");
            return;
        }
        setLoading(true);
        const hoje = new Date().toISOString().split("T")[0];

        console.log("Verificando:", {usuarioId, hoje});

        const {data, error} = await supabase
            .from("humor_diario")
            .select("id_usuario")
            .eq("id_usuario", usuarioId)
            .eq("data", hoje)
            .maybeSingle();


        setJaRegistradoHoje(!!data);
        setLoading(false);
    }
}