import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
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
                }}
            />

            <Tabs.Screen
                name="CorridaEnergia"
                options={{
                    title: 'Corrida da Energia',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="water" size={size} color={color} />
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
                }}
            />

            <Tabs.Screen
                name="SuperPo"
                options={{
                    title: 'Hora do SuperPó',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="trophy" size={size} color={color} />
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
                }}
            />

            <Tabs.Screen
                name="MissaoGlicemilton"
                options={{
                    title: 'Missão SOS Glicemilton',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
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
                }}
            />
        </Tabs>
    );
}