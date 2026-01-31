import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e6f7fb",
        paddingHorizontal: 16,
    },

    header: {
        alignItems: "center",
        marginVertical: 20,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0f172a",
    },

    subtitle: {
        fontSize: 14,
        color: "#64748b",
        marginTop: 4,
    },

    centerCard: {
        backgroundColor: "#fff4d6",
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        marginBottom: 24,
    },

    centerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0f172a",
        marginTop: 8,
    },

    centerSubtitle: {
        fontSize: 13,
        color: "#475569",
        textAlign: "center",
        marginVertical: 6,
    },

    stats: {
        flexDirection: "row",
        marginTop: 12,
    },

    statItem: {
        alignItems: "center",
        marginHorizontal: 20,
    },

    statValue: {
        fontSize: 18,
        fontWeight: "800",
        color: "#ea580c",
    },

    statLabel: {
        fontSize: 12,
        color: "#475569",
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 12,
    },

    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
    },

    cardIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#fff7ed",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    cardTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#0f172a",
    },

    cardDescription: {
        fontSize: 12,
        color: "#475569",
        marginVertical: 6,
    },

    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 6,
    },

    points: {
        fontSize: 12,
        fontWeight: "600",
        color: "#ea580c",
    },

    startButton: {
        backgroundColor: "#fb923c",
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 999,
    },

    startButtonDisabled: {
        backgroundColor: "#d1d5db",
    },

    startButtonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
    },
})