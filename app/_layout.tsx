import { Stack, Slot } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from "react-native-toast-message";

export default function RootLayout() {
    return (
        <>
        <LinearGradient colors={['blue', 'red']} style={{ flex: 1 }}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </LinearGradient>
            <Toast />
        </>
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

