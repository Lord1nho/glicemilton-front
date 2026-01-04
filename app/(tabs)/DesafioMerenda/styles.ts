import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 42, // 👈 distância inicial
        paddingHorizontal: 42,
    },

    scoreBox : {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

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
    }
});

export default styles;