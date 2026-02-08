import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { User, Lock } from "lucide-react-native";
import { useRouter } from "expo-router";
import { ImageBackground } from "expo-image";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterScreen() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegister() {
        if (!email || !password || !name) {
            Alert.alert("Erro", "Preencha todos os campos");
            return;
        }

        try {
            setLoading(true);

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name, // vai para user_metadata
                    },
                },
            });

            if (error) {
                Alert.alert("Erro ao cadastrar", error.message);
                return;
            }

            Alert.alert(
                "Conta criada 🎉"
            );

            router.replace("/Login"); // ou a rota que você quiser
        } catch (err) {
            Alert.alert("Erro inesperado", "Tente novamente");
        } finally {
            setLoading(false);
        }
    }

    return (
        <ImageBackground
            source={require("../../../assets/glicemiltonfoto.png")}
            style={styles.container}
            contentFit="fill"
        >
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.title}>Bem-vindo 👋</Text>
                    <Text style={styles.subtitle}>
                        Cadastre para cuidar do Glicemilton!
                    </Text>
                </View>

                {/* NOME */}
                <View style={styles.inputWrapper}>
                    <User color="#64748b" size={20} />
                    <TextInput
                        placeholder="Nome"
                        placeholderTextColor="#94a3b8"
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                {/* EMAIL */}
                <View style={styles.inputWrapper}>
                    <User color="#64748b" size={20} />
                    <TextInput
                        placeholder="E-mail"
                        placeholderTextColor="#94a3b8"
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
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
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                {/* BOTÃO CADASTRAR */}
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleRegister}
                    disabled={loading}
                >
                    <Text style={styles.loginButtonText}>
                        {loading ? "Cadastrando..." : "Cadastrar"}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.orText}>ou</Text>

                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.registerButtonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        backgroundColor: "rgba(255, 255, 255, 0.75)",
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
