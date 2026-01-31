import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type HintCardProps = {
    text: string;
};

export default function HintCard({ text }: HintCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.icon} > 🐜 </Text>
            <Text style={styles.text}>
                {text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: '#ffffff',
        borderRadius: 16,

        paddingVertical: 14,
        paddingHorizontal: 16,

        // sombra suave
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,

        // borda clara (dá esse efeito "card flutuando")
        borderWidth: 1,
        borderColor: '#e0f2fe',
    },

    icon: {
        color: '#2563eb',
        marginRight: 12,
        fontSize: 24,
    },

    text: {
        flex: 1,
        fontSize: 16,
        color: '#0f172a',
        lineHeight: 26,
    },
});