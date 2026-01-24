export const MOOD_MESSAGES = {
    FELIZ: "Que ótimo! Continue aproveitando esse momento 💛",
    TRANQUILO: "Que bom estar em equilíbrio. Siga nesse ritmo 🌿",
    NEUTRO: "Dias neutros também fazem parte. Vá com calma 🙂",
    CANSADO: "Talvez seja um bom momento para descansar um pouco 😴",
    ANSIOSO: "Respire fundo. Tudo acontece no seu tempo 🌬️",
    TRISTE: "Você não está sozinho. Seja gentil com você hoje 💙",
    ESTRESSADO: "Pausas ajudam mais do que parecem. Cuide-se ⚠️",
    DOENTE: "Vamos cuidar de você! 🩺",
} as const;

export const MOOD_STATES = {
    FELIZ: { label: "Feliz", emoji: "😊", positivo: true },
    TRANQUILO: { label: "Tranquilo", emoji: "😌", positivo: true },
    NEUTRO: { label: "Neutro", emoji: "😐", positivo: true },
    CANSADO: { label: "Cansado", emoji: "🥱", positivo: false },
    ANSIOSO: { label: "Ansioso", emoji: "😰", positivo: false },
    TRISTE: { label: "Triste", emoji: "😢", positivo: false },
    ESTRESSADO: { label: "Estressado", emoji: "😣", positivo: false },
    DOENTE: { label: "Doente", emoji: "🤒", positivo: false },
} as const;

export type MoodState = keyof typeof MOOD_STATES;