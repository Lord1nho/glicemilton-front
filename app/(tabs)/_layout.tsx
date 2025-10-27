import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
            <Tabs.Screen
                name="desafiomerenda"
                options={{
                    title: 'Desafio',
                    tabBarIcon: ({ color }) => <FontAwesome size={20} name="trophy" color={color} />,
                }}
            />
            <Tabs.Screen
                name="corridaenergia"
                options={{
                    title: 'Energia',
                    tabBarIcon: ({ color }) => <FontAwesome size={20} name="battery-half" color={color} />,
                }}
            />
            <Tabs.Screen
                name="radaracucar"
                options={{
                    title: 'Radar',
                    tabBarIcon: ({ color }) => <FontAwesome size={20} name="heart-o" color={color} />,
                }}
            />
            <Tabs.Screen
                name="superpo"
                options={{
                    title: 'SuperPó',
                    tabBarIcon: ({ color }) => <FontAwesome size={20} name="medkit" color={color} />,
                }}
            />
            <Tabs.Screen
                name="escudo"
                options={{
                    title: 'Escudo',
                    tabBarIcon: ({ color }) => <FontAwesome size={20} name="shield" color={color} />,
                }}
            />
            <Tabs.Screen
                name="missao"
                options={{
                    title: 'Missão',
                    tabBarIcon: ({ color }) => <FontAwesome size={20} name="cog" color={color} />,
                }}
            />
            <Tabs.Screen
                name="diario"
                options={{
                    title: 'Diário',
                    tabBarIcon: ({ color }) => <FontAwesome size={20} name="calendar-check-o" color={color} />,
                }}
            />
        </Tabs>
    );
}