import { LinearGradient } from 'expo-linear-gradient';
import {ViewProps } from 'react-native';

type Props = ViewProps & {
    children: React.ReactNode;
};

export default function Screen({ children, style, ...props }: Props) {
    return (
        <LinearGradient
            colors={['#ffffff', '#e6f7fb']}
            style={[{ flex: 1 }, style]}
        >
            {children}
        </LinearGradient>
    );
}