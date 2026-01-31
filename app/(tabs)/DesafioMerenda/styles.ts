import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },

    loadingWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },

    scoreBox : {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#0f172a', // 👈 obrigatóri
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

    scoreText: {
        fontSize: 16,
        fontWeight: "600",
    },

    questionText: {
        fontSize: 14,
        color: "#2F6FED",
        fontWeight: "500",
    },

    card: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'white',
        marginBottom: 16,
        marginHorizontal: '1.5%',
        flexBasis: '30%',
        borderRadius: 16,
        aspectRatio: 1,


        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },

    emoji: {
        fontSize: 36,
        marginBottom: 8,
    },

    cardText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0a2a5e',
        textAlign: 'center',
    },

    buttonWrapper: {
        width: '100%',
        alignItems: 'center',
        marginTop: 16,
    },

    customButton: {
        backgroundColor: 'orange',
        height: 48,
        width: '90%',        // fica bonito no mobile
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonDisabled: {
        backgroundColor: "#ccc",
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        paddingHorizontal: 20
    },

    foodSelected: {
        borderColor: "#FFD600", // 🟡 borda amarela
        borderWidth: 2,         // destaque
    },
});

export default styles;