import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function RootLayout() {
    return (
        <LinearGradient colors={['blue', 'red']} style={{ flex: 1 }}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </LinearGradient>
    );
}

/*
      <Stack>
        <Stack.Screen
            name="(main)/desafiomerenda"
            options={{
              title: 'Desafio da Merenda',
              headerTintColor: '#00264d',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
        />
        <Stack.Screen
            name="index"
            options={{
              title: 'Tela inicial',
              headerTintColor: '#00264d',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
        />
        </Stack>
    */

