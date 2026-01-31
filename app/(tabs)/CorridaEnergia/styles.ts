import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EAF7FF",
    },
    content: {
        padding: 16,
        paddingBottom: 120,
    },

    /* Header */
    header: {
        alignItems: "center", // 👈 centraliza
        marginBottom: 16,
    },

    headerEmoji: {
        fontSize: 32,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#0B4DA2",
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#4A7FC7",
    },

    /* Energia card */
    energyCard: {
        backgroundColor: "#FFF6E5",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    energyIcon: {
        fontSize: 28,
        textAlign: "center",
    },
    energyTitle: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
        marginTop: 4,
    },
    energySubtitle: {
        textAlign: "center",
        fontSize: 12,
        marginVertical: 8,
    },

    energyButton: {
        marginTop: 10,
        width: "80%",
        backgroundColor: "#FF8C1A",
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: "center",
    },

    energyButtonDisabled: {
        backgroundColor: "#6EDC8C",
        opacity: 0.7,
    },
    energyButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
    },
    progressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    progressLabel: {
        fontSize: 12,
    },
    progressValue: {
        fontSize: 12,
        fontWeight: "600",
    },
    progressBarBackground: {
        height: 10,
        borderRadius: 10,
        backgroundColor: "#E0E0E0",
        overflow: "hidden",
    },
    progressBarFill: {
        height: "100%",
        backgroundColor: "#FF8C1A",
    },
    progressFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 4,
    },
    progressScale: {
        fontSize: 10,
        color: "#555",
    },

    /* Stats */
    statsRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 16,
    },
    statCard: {
        flex: 1,
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 16,
        alignItems: "center",
    },
    statIcon: {
        fontSize: 20,
        marginBottom: 4,
    },
    statValue: {
        fontSize: 18,
        fontWeight: "600",
    },
    statLabel: {
        fontSize: 12,
        color: "#666",
    },

    /* Registrar */
    registerHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        gap: 6,
    },
    registerIcon: {
        fontSize: 18,
        color: "#0B4DA2",
    },
    registerText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#0B4DA2",
    },

    /* Activities */
    activityGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
    },

    activityCard: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingVertical: 20,
        alignItems: "center",
    },

    activityCardDone: {
        backgroundColor: "#D6F5EE",
        borderWidth: 1.5,
        borderColor: "#34C759",
    },

    activityIcon: {
        fontSize: 28,
        marginBottom: 6,
    },
    activityLabel: {
        fontSize: 14,
    },

    /* Tab bar */
    tabBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: "#FFF",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#EEE",
    },
    tabItem: {
        fontSize: 20,
        opacity: 0.5,
    },
    tabActive: {
        opacity: 1,
    },
});

export default styles;