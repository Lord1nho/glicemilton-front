export const MOOD_MESSAGES = {
    HAPPY: "Great! Keep enjoying this moment 💛",
    CALM: "It's great to be balanced. Keep this pace 🌿",
    NEUTRAL: "Neutral days are part of life too. Take it easy 🙂",
    TIRED: "Maybe it's a good moment to get some rest 😴",
    ANXIOUS: "Take a deep breath. Everything happens in its own time 🌬️",
    SAD: "You are not alone. Be kind to yourself today 💙",
    STRESSED: "Breaks help more than they seem. Take care ⚠️",
    SICK: "Let's take care of you! 🩺",
} as const;

export const MOOD_STATES = {
    HAPPY: { label: "Happy", emoji: "😊", positivo: true },
    CALM: { label: "Calm", emoji: "😌", positivo: true },
    NEUTRAL: { label: "Neutral", emoji: "😐", positivo: true },
    TIRED: { label: "Tired", emoji: "🥱", positivo: false },
    ANXIOUS: { label: "Anxious", emoji: "😰", positivo: false },
    SAD: { label: "Sad", emoji: "😢", positivo: false },
    STRESSED: { label: "Stressed", emoji: "😣", positivo: false },
    SICK: { label: "Sick", emoji: "🤒", positivo: false },
} as const;

export type MoodState = keyof typeof MOOD_STATES;