import {View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator} from "react-native";
import { User, Lock } from "lucide-react-native";
import {useRouter} from "expo-router";
import {supabase} from "@/lib/supabase";
import {useState} from "react";
import {ImageBackground} from "expo-image";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const  [loading, setLoading] = useState<boolean>(false);

    async function handleLogin(email: string, password: string) {
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert(error.message);
            setLoading(false);
            return;
        }

        // Login deu certo
        router.push('/(tabs)/DesafioMerenda');
    }

    return (
        <ImageBackground
            source={require("../../../assets/glicemiltonfoto.png")}
            style={styles.container}
            contentFit="fill"
        >
            {loading ? (
                // 🔵 LOADING
                <ActivityIndicator size="large" color="#2563eb" />
            ) : (
                // 🟢 CARD NORMAL
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Bem-vindo 👋</Text>
                        <Text style={styles.subtitle}>
                            Entre para continuar cuidando do Glicemilton
                        </Text>
                    </View>

                    <View style={styles.inputWrapper}>
                        <User color="#64748b" size={20} />
                        <TextInput
                            placeholder="E-mail"
                            placeholderTextColor="#94a3b8"
                            onChangeText={setEmail}
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            editable={!loading}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Lock color="#64748b" size={20} />
                        <TextInput
                            placeholder="Senha"
                            onChangeText={setPassword}
                            placeholderTextColor="#94a3b8"
                            style={styles.input}
                            secureTextEntry
                            editable={!loading}
                        />
                    </View>

                    <TouchableOpacity>
                        <Text style={styles.forgotText}>Esqueci minha senha</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => handleLogin(email, password)}
                        disabled={loading}
                    >
                        <Text style={styles.loginButtonText}>Entrar</Text>
                    </TouchableOpacity>

                    <Text style={styles.orText}>ou</Text>

                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={() => router.push('/(auth)/Register')}
                        disabled={loading}
                    >
                        <Text style={styles.registerButtonText}>
                            Criar uma conta
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
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
