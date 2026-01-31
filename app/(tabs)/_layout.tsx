import {router, Tabs} from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {Text,TouchableOpacity} from "react-native";
import {supabase} from "@/lib/supabase";

export default function TabsLayout() {

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Erro ao deslogar:", error.message);
            return;
        }

        // se estiver usando Expo Router
        router.replace("/(auth)/Login");

        // se for React Navigation puro:
        // navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    };
    return (

        <Tabs
            screenOptions={{
                headerShown: true,
                tabBarActiveTintColor: '#2563eb',
                headerTitleAlign: 'center',
            }}
        >
            <Tabs.Screen
                name="DesafioMerenda"
                options={{
                    tabBarLabel: 'Merenda', // 👈 nome da aba
                    headerTitle: 'Desafio da Merenda', // 👈 nome do header
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="nutrition-outline" size={size} color={color} />
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={handleLogout}
                            style={{ marginRight: 16,
                            alignItems:'center'
                        }}
                        >
                            <Ionicons name="log-out-outline" size={26} color="#C62828" />
                            <Text
                                style={{
                                    color: "#C62828",
                                    fontWeight: "600",
                                    fontSize: 16,
                                }}
                            >
                                Sair
                            </Text>
                        </TouchableOpacity>

                    ),
                }}
            />

            <Tabs.Screen
                name="CorridaEnergia"
                options={{
                    tabBarLabel: 'Energia', // 👈 nome da aba
                    headerTitle: 'Corrida da Energia', // 👈 nome do header
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="flash-outline" size={size} color={color} />
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={handleLogout}
                            style={{ marginRight: 16,
                                alignItems:'center'
                            }}
                        >
                            <Ionicons name="log-out-outline" size={26} color="#C62828" />
                            <Text
                                style={{
                                    color: "#C62828",
                                    fontWeight: "600",
                                    fontSize: 16,
                                }}
                            >
                                Sair
                            </Text>
                        </TouchableOpacity>

                    ),
                }}
            />

            <Tabs.Screen
                name="RadarAcucar"
                options={{
                    tabBarLabel: 'Radar', // 👈 nome da aba
                    headerTitle: 'Radar do Açúcar', // 👈 nome do header
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="pulse-outline" size={size} color={color} />
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={handleLogout}
                            style={{ marginRight: 16,
                                alignItems:'center'
                            }}
                        >
                            <Ionicons name="log-out-outline" size={26} color="#C62828" />
                            <Text
                                style={{
                                    color: "#C62828",
                                    fontWeight: "600",
                                    fontSize: 16,
                                }}
                            >
                                Sair
                            </Text>
                        </TouchableOpacity>

                    ),
                }}
            />

            <Tabs.Screen
                name="SuperPo"
                options={{
                    tabBarLabel: 'Medicação', // 👈 nome da aba
                    headerTitle: 'Ritual da Saúde', // 👈 nome do header
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="medical-outline" size={size} color={color} />
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={handleLogout}
                            style={{ marginRight: 16,
                                alignItems:'center'
                            }}
                        >
                            <Ionicons name="log-out-outline" size={26} color="#C62828" />
                            <Text
                                style={{
                                    color: "#C62828",
                                    fontWeight: "600",
                                    fontSize: 16,
                                }}
                            >
                                Sair
                            </Text>
                        </TouchableOpacity>

                    ),
                }}
            />

            <Tabs.Screen
                name="EscudoProtetor"
                options={{
                    tabBarLabel: 'Escudo', // 👈 nome da aba
                    headerTitle: 'Escudo Protetor', // 👈 nome do header
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="shield-outline" size={size} color={color} />
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={handleLogout}
                            style={{ marginRight: 16,
                                alignItems:'center'
                            }}
                        >
                            <Ionicons name="log-out-outline" size={26} color="#C62828" />
                            <Text
                                style={{
                                    color: "#C62828",
                                    fontWeight: "600",
                                    fontSize: 16,
                                }}
                            >
                                Sair
                            </Text>
                        </TouchableOpacity>

                    ),
                }}
            />

            <Tabs.Screen
                name="MissaoGlicemilton"
                options={{
                    tabBarLabel: 'Missões', // 👈 nome da aba
                    headerTitle: 'Missão SOS Glicemilton', // 👈 nome do header
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book-outline" size={size} color={color} />
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={handleLogout}
                            style={{ marginRight: 16,
                                alignItems:'center'
                            }}
                        >
                            <Ionicons name="log-out-outline" size={26} color="#C62828" />
                            <Text
                                style={{
                                    color: "#C62828",
                                    fontWeight: "600",
                                    fontSize: 16,
                                }}
                            >
                                Sair
                            </Text>
                        </TouchableOpacity>

                    ),
                }}
            />

            <Tabs.Screen
                name="DiarioFormiga"
                options={{
                    tabBarLabel: 'Diário', // 👈 nome da aba
                    headerTitle: 'Diário da Formiga Sábia', // 👈 nome do header
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="heart-outline" size={size} color={color} />
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={handleLogout}
                            style={{ marginRight: 16,
                                alignItems:'center'
                            }}
                        >
                            <Ionicons name="log-out-outline" size={26} color="#C62828" />
                            <Text
                                style={{
                                    color: "#C62828",
                                    fontWeight: "600",
                                    fontSize: 16,
                                }}
                            >
                                Sair
                            </Text>
                        </TouchableOpacity>

                    ),
                }}
            />
        </Tabs>
    );
}