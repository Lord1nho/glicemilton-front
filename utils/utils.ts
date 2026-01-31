export function formatDateBR(date: string): string {
    if (!date) return "";

    // Espera formato YYYY-MM-DD
    const [year, month, day] = date.split("-").map(Number);

    const safeDate = new Date(year, month - 1, day);

    return safeDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

const emojiPorAlimento: Record<number, string> = {
    2: "🍎",
    3: "🍌",
    4: "🥕",
    5: "🥦",
    6: "🥛",
    7: "🍞",
    8: "🍊",
    9: "🥣",
    10: "🍭",
    11: "🥤",
    12: "🍟",
    13: "🍩",
    14: "🍪",
    15: "🍦",
    16: "🍔",
    17: "🍕",
};


export function getEmoji(id_alimento: number): string {
    return emojiPorAlimento[id_alimento] ?? "🍽️";
}

import { supabase } from "@/lib/supabase";

export async function getUsuarioId(): Promise<number | null> {
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session) return null;

    const authId = sessionData.session.user.id;

    const { data, error } = await supabase
        .from("usuarios")
        .select("id_usuario")
        .eq("auth_id", authId)
        .single();

    if (error || !data) {
        console.log("Erro ao buscar usuarioId:", error);
        return null;
    }

    return data.id_usuario;
}
