import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { User, Lock } from "lucide-react-native";

export default function LoginScreen() {
    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.title}>Bem-vindo 👋</Text>
                <Text style={styles.subtitle}>
                    Entre para continuar cuidando do Glicemilton
                </Text>
            </View>

            {/* CARD LOGIN */}
            <View style={styles.card}>

                {/* EMAIL */}
                <View style={styles.inputWrapper}>
                    <User color="#64748b" size={20} />
                    <TextInput
                        placeholder="E-mail"
                        placeholderTextColor="#94a3b8"
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* SENHA */}
                <View style={styles.inputWrapper}>
                    <Lock color="#64748b" size={20} />
                    <TextInput
                        placeholder="Senha"
                        placeholderTextColor="#94a3b8"
                        style={styles.input}
                        secureTextEntry
                    />
                </View>

                {/* ESQUECI A SENHA */}
                <TouchableOpacity>
                    <Text style={styles.forgotText}>Esqueci minha senha</Text>
                </TouchableOpacity>

                {/* BOTÃO LOGIN */}
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Entrar</Text>
                </TouchableOpacity>

                {/* DIVISOR */}
                <Text style={styles.orText}>ou</Text>

                {/* CADASTRO */}
                <TouchableOpacity style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>
                        Criar uma conta
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e6f7fb",
        justifyContent: "center",
        paddingHorizontal: 20,
    },

    header: {
        alignItems: "center",
        marginBottom: 24,
    },

    title: {
        fontSize: 22,
        fontWeight: "800",
        color: "#0f172a",
    },

    subtitle: {
        fontSize: 14,
        color: "#64748b",
        marginTop: 6,
        textAlign: "center",
    },

    card: {
        backgroundColor: "#ffffff",
        borderRadius: 18,
        padding: 20,
    },

    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f8fafc",
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },

    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: "#0f172a",
    },

    forgotText: {
        textAlign: "right",
        fontSize: 13,
        color: "#2563eb",
        marginBottom: 16,
        fontWeight: "600",
    },

    loginButton: {
        backgroundColor: "#3b82f6",
        paddingVertical: 16,
        borderRadius: 999,
        alignItems: "center",
        marginBottom: 12,
    },

    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },

    orText: {
        textAlign: "center",
        fontSize: 13,
        color: "#64748b",
        marginVertical: 8,
    },

    registerButton: {
        backgroundColor: "#dbeafe",
        paddingVertical: 14,
        borderRadius: 999,
        alignItems: "center",
    },

    registerButtonText: {
        color: "#2563eb",
        fontSize: 14,
        fontWeight: "700",
    },
});
