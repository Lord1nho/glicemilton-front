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
                    title: "Desafio da Merenda",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
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
                    title: 'Corrida da Energia',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="water" size={size} color={color} />
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
                    title: 'Radar do Açúcar',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="medkit" size={size} color={color} />
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
                    title: 'Hora do SuperPó',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="trophy" size={size} color={color} />
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
                    title: 'Escudo Protetor',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
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
                    title: 'Missão SOS Glicemilton',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
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
                    title: 'Diário da Formiga Sábia',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
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