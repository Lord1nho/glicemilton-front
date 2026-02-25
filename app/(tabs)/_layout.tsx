import {router, Tabs} from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {Text,TouchableOpacity} from "react-native";
import {supabase} from "@/lib/supabase";
import { LinearGradient } from "expo-linear-gradient";

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
        <LinearGradient
            colors={["#2563eb", "#e6f7fb"]}
            style={{ flex: 1 }}
        >
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
                        tabBarLabel: 'Snack', // 👈 nome da aba
                        headerTitle: 'Snack Challenge', // 👈 nome do header
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
                                    Logout
                                </Text>
                            </TouchableOpacity>

                        ),
                    }}
                />

                <Tabs.Screen
                    name="CorridaEnergia"
                    options={{
                        tabBarLabel: 'Energy', // 👈 nome da aba
                        headerTitle: 'Energy Run', // 👈 nome do header
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
                                    Logout
                                </Text>
                            </TouchableOpacity>

                        ),
                    }}
                />

                <Tabs.Screen
                    name="RadarAcucar"
                    options={{
                        tabBarLabel: 'Radar', // 👈 nome da aba
                        headerTitle: 'Sugar Radar', // 👈 nome do header
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
                                    Logout
                                </Text>
                            </TouchableOpacity>

                        ),
                    }}
                />

                <Tabs.Screen
                    name="SuperPo"
                    options={{
                        tabBarLabel: 'Medication', // 👈 nome da aba
                        headerTitle: 'Health Ritual', // 👈 nome do header
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
                                    Logout
                                </Text>
                            </TouchableOpacity>

                        ),
                    }}
                />

                <Tabs.Screen
                    name="EscudoProtetor"
                    options={{
                        tabBarLabel: 'Shield', // 👈 nome da aba
                        headerTitle: 'Protective Shield', // 👈 nome do header
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
                                    Logout
                                </Text>
                            </TouchableOpacity>

                        ),
                    }}
                />

                <Tabs.Screen
                    name="MissaoGlicemilton"
                    options={{
                        tabBarLabel: 'Missions', // 👈 nome da aba
                        headerTitle: 'SOS Glicemilton Mission', // 👈 nome do header
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
                                    Logout
                                </Text>
                            </TouchableOpacity>

                        ),
                    }}
                />

                <Tabs.Screen
                    name="DiarioFormiga"
                    options={{
                        tabBarLabel: 'Diary', // 👈 nome da aba
                        headerTitle: 'Wise Ant Diary', // 👈 nome do header
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
                                    Logout
                                </Text>
                            </TouchableOpacity>

                        ),
                    }}
                />
            </Tabs>
        </LinearGradient>

    );
}