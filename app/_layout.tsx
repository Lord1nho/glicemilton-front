import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
  )
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

