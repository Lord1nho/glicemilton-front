import {Stack, Slot, router} from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from "react-native-toast-message";
import {useEffect} from "react";
import {supabase} from "@/lib/supabase";

export default function LoginLayout() {
    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) {
                router.replace('/(tabs)/DesafioMerenda');
            }
        });
    }, []);

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

