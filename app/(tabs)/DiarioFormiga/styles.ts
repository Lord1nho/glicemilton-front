import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#e6f7fb",
        paddingHorizontal: 16,
    },

    loadingContainer: {
        paddingVertical: 32,
        alignItems: "center",
        justifyContent: "center",
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
        fontSize: 18,
        color: "#64748b",
        marginTop: 4,
    },

    statsCard: {
        backgroundColor: "#fde7f3",
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        marginBottom: 20,
    },

    statsTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginVertical: 8,
        color: "#0f172a",
    },

    statsRow: {
        flexDirection: "row",
        marginTop: 8,
    },

    statItem: {
        alignItems: "center",
        marginHorizontal: 12,
    },

    statValue: {
        fontSize: 18,
        fontWeight: "800",
    },

    statLabel: {
        fontSize: 16,
        color: "#475569",
        textAlign: "center",
    },

    moodCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,

        // sombra Android
        elevation: 3,

        // sombra iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },

    moodButton: {
        width: "47%",
        backgroundColor: "#f8fafc",
        borderRadius: 14,
        paddingVertical: 18,
        alignItems: "center",
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    moodButtonSelected: {
        backgroundColor: "#E53935",
        transform: [{ scale: 1.05 }],
    },

    emoji: {
        fontSize: 28,
        marginBottom: 6,
    },

    label: {
        fontSize: 16,
        color: "#555",
        fontWeight: "500",
        textAlign: "center",
    },

    labelSelected: {
        color: "#fff",
        fontWeight: "700",
    },

    doneCard: {
        backgroundColor: "#DFF5EA",
        borderRadius: 18,
        paddingVertical: 20,
        paddingHorizontal: 16,
        alignItems: "center",
        marginHorizontal: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#4CAF50",
    },

    doneTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1B5E20",
        marginTop: 10,
    },

    doneSubtitle: {
        fontSize: 16,
        color: "#2E7D32",
        marginTop: 6,
        textAlign: "center",
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 12,
        color: "#0f172a",
    },

    moodGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    feedbackContainer: {
        backgroundColor: "#F7F9FC",
        borderRadius: 12,
        padding: 14,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E3E8F0",
    },

    feedbackText: {
        fontSize: 18,
        color: "#333",
        textAlign: "center",
        lineHeight: 20,
    },


    moodEmoji: {
        fontSize: 32,
    },

    moodLabel: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 6,
        color: "#0f172a",
    },

    saveButton: {
        flexDirection: "row",
        backgroundColor: "#f9a8d4",
        paddingVertical: 14,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },


    saveButtonDisabled: {
        backgroundColor: "rgba(255, 0, 0, 0.4)", // mais transparente
    },

    saveButtonActive: {
        backgroundColor: "#E53935", // sólido
    },

    saveButtonText: {
        color: "#fff",
        fontWeight: "700",
        marginLeft: 8,
    },

    historyTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 8,
        color: "#0f172a",
    },

    historyCard: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 14,
        marginBottom: 20,
    },

    historyMood: {
        fontSize: 16,
        fontWeight: "700",
    },

    historyDate: {
        fontSize: 14,
        color: "#64748b",
        marginBottom: 6,
    },

    historyText: {
        fontSize: 16,
        color: "#475569",
    },

    tipCard: {
        backgroundColor: "#f0f9ff",
        borderRadius: 16,
        padding: 18,
        alignItems: "center",
    },

    tipIcon: {
        fontSize: 46,
        marginBottom: 4,
    },

    tipTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 6,
        color: "#0f172a",
    },

    tipText: {
        fontSize: 16,
        color: "#475569",
        textAlign: "center",
    },

})