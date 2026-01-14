import {FoodDTO} from "@/lib/services/foodDTO";
import {Food} from "@/app/components/DesafioMerenda/FoodSelection";

export function mapFoodDTO(dto: FoodDTO): Food {
    return {
        id_alimento: dto.id_alimento,
        nome: dto.nome,
        isHealthy: dto.is_healthy,
        imageUrl: dto.image_url,
    };
}