export const MOOD_MESSAGES = {
    FELIZ: "Great! Keep enjoying this moment 💛",
    TRANQUILO: "It's great to be balanced. Keep this pace 🌿",
    NEUTRO: "Neutral days are part of life too. Take it easy 🙂",
    CANSADO: "Talvez seja um bom momento para descansar um pouco 😴",
    ANSIOSO: "Respire fundo. Tudo acontece no seu tempo 🌬️",
    TRISTE: "You are not alone. Be kind to yourself today 💙",
    ESTRESSADO: "Pausas ajudam mais do que parecem. Cuide-se ⚠️",
    DOENTE: "Let's take care of you! 🩺",
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