import { supabase } from "@/lib/supabase";
import {Food} from "@/app/components/DesafioMerenda/FoodSelection";
import {mapFoodDTO} from "@/lib/services/foodMapper";

export async function getFoods(): Promise<Food[]> {
    // busca saudáveis
    const { data: healthy, error: errorHealthy } = await supabase
        .from("alimentos")
        .select("*")
        .eq("is_healthy", true);

    if (errorHealthy || !healthy) throw errorHealthy;

    // busca não saudáveis
    const { data: unhealthy, error: errorUnhealthy } = await supabase
        .from("alimentos")
        .select("*")
        .eq("is_healthy", false);

    if (errorUnhealthy || !unhealthy) throw errorUnhealthy;

    // embaralha cada grupo
    const healthyShuffled = shuffleArray(healthy);
    const unhealthyShuffled = shuffleArray(unhealthy);

    // pega 3 de cada
    const selectedHealthy = healthyShuffled.slice(0, 3);
    const selectedUnhealthy = unhealthyShuffled.slice(0, 3);

    // mapeia DTO → UI model
    const combined = [
        ...selectedHealthy.map(mapFoodDTO),
        ...selectedUnhealthy.map(mapFoodDTO),
    ];

    // embaralha final (mistura healthy com unhealthy)
    return shuffleArray(combined);
}

export function shuffleArray<T>(array: T[]): T[] {
    return array
        .map(item => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);
}


export async function salvarSelecoes(
    usuarioId: number,
    idResultado: number,
    selected: Food[]
) {
    const selecoes = selected.map(food => ({
        id_usuario: usuarioId,
        id_resultado: idResultado,
        id_alimento: food.id_alimento,
        acertou: food.isHealthy,
    }));

    const { error } = await supabase
        .from('selecao_alimento')
        .insert(selecoes);

    if (error) {
        console.log('Erro ao salvar seleções:', error);
    }
}


export async function salvarResultadoPergunta(
    usuarioId: number,
    pontos: number,
    total: number,
    corretos: number
) {
    const { data, error } = await supabase
        .from('resultado_pergunta')
        .insert({
            id_usuario: usuarioId,
            pontos,
            total_selecionados: total,
            total_corretos: corretos,
        })
        .select()
        .single();

    if (error) {
        console.log('Erro ao salvar resultado:', error);
        return null;
    }

    return data.id_resultado;
}