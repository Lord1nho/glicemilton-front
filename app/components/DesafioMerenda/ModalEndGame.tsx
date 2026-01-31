import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
    visible: boolean;
    score: number;
    onRestart: () => void;
};

function getMessage (score: number) {
    if (score === 300) {
        return "Acertou todas as perguntas! Glicemilton está orgulhoso 🥰🐜"
    }

    if (score >= 200) {
        return "Glicemilton está MUITO orgulhoso de você! Boas escolhas 🌟🐜";
    }

    if (score >=100 && score < 200) {
        return "Glicemilton está orgulhoso de você! Continue assim 😊🐜";
    }

    if (score >= 50 && score < 100 ) {
        return "Bom trabalho! Dá pra melhorar! 💪🐜";
    }

    return "Vamos tentar de novo? Glicemilton acredita em você! 🍎🐜";
}

export default function FinalResultModal({ visible, score, onRestart }: Props) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.trophy}>🏆</Text>

                    <Text style={styles.title}>Parabéns!</Text>
                    <Text style={styles.subtitle}>
                        Você terminou o Desafio da Merenda!
                    </Text>

                    <View style={styles.scoreBox}>
                        <Text style={styles.scoreLabel}>
                            Pontuação Final:
                        </Text>
                        <Text style={styles.scoreValue}>
                            {score}
                        </Text>
                        <Text style={styles.message}>
                            {getMessage(score)}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={onRestart}
                    >
                        <Text style={styles.buttonText}>
                            Jogar novamente
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },

    modal: {
        width: "85%",
        backgroundColor: "#EAF7FF",
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
    },

    trophy: {
        fontSize: 64,
        marginBottom: 8,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#0f172a",
    },

    subtitle: {
        fontSize: 14,
        color: "#2563eb",
        textAlign: "center",
        marginBottom: 16,
    },

    scoreBox: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 12,
        alignItems: "center",
        marginBottom: 20,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },

    scoreLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FB923C",
    },

    scoreValue: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#FB923C",
        marginVertical: 4,
    },

    message: {
        fontSize: 13,
        color: "#475569",
        marginTop: 4,
    },

    button: {
        backgroundColor: "#FB923C",
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 12,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});