import { Stack, Slot } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from "react-native-toast-message";

export default function LoginLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }} />
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

