import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Index() {
    const [checking, setChecking] = useState(true);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setIsLogged(!!data.session);
            setChecking(false);
        });
    }, []);

    if (checking) return null;

    if (isLogged) {
        return <Redirect href="/(tabs)/DesafioMerenda" />;
    }

    return <Redirect href="/(auth)/Login" />;
}