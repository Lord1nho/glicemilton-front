import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DFF4FF",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
    },
    headerSubtitle: {
        fontSize: 14,
        color: "#2F80ED",
    },

    progressCard: {
        backgroundColor: "#F6EFFF",
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        marginBottom: 20,
    },
    progressTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginTop: 8,
    },
    progressSubtitle: {
        fontSize: 14,
        color: "#555",
        marginTop: 4,
    },
    progressBar: {
        height: 6,
        width: "100%",
        backgroundColor: "#E0D7F5",
        borderRadius: 6,
        marginTop: 12,
    },

    progressBarFill: {
        height: "100%",
        backgroundColor: "#FF5FA2",
        borderRadius: 8,
    },


    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
    },
    addButton: {
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: 6,
    },

    medCard: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    medName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0F172A",
    },

    medTime: {
        fontSize: 14,
        fontWeight: "500",
        color: "#2F80ED",
    },

    medCardTaken: {
        backgroundColor: "#D1FAE5", // verde claro
        borderColor: "#22C55E",
    },

    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#E0F2FE",
        alignItems: "center",
        justifyContent: "center",
    },

    iconCircleTaken: {
        backgroundColor: "#22C55E",
    },

    takenText: {
        color: "#15803D",
        fontWeight: "700",
        fontSize: 14,
    },

    tomeiButton: {
        backgroundColor: "#A855F7",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },

    tomeiText: {
        color: "#FFFFFF",
        fontWeight: "700",
    },

    newDayButton: {
        alignSelf: "center",
        marginTop: 12,
        flexDirection: "row",
        gap: 6,
        backgroundColor: "#EEF6FF",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 16,
    },
    newDayText: {
        fontSize: 13,
        fontWeight: "600",
    },

    /* Adicionar medicamento */
    addCard: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 16,
        marginTop: 20,
        marginBottom: 20,
    },
    addTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 12,
    },
    label: {
        fontSize: 13,
        fontWeight: "600",
        marginTop: 8,
        marginBottom: 4,
    },
    input: {
        backgroundColor: "#F1FAFF",
        borderRadius: 12,
        padding: 12,
    },
    timeInput: {
        backgroundColor: "#F1FAFF",
        borderRadius: 12,
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    addConfirmButton: {
        backgroundColor: "#FF8A00",
        borderRadius: 14,
        paddingVertical: 12,
        alignItems: "center",
        marginTop: 16,
    },
    addConfirmText: {
        color: "#FFF",
        fontWeight: "700",
    },
    cancelButton: {
        alignItems: "center",
        marginTop: 10,
    },
    cancelText: {
        color: "#2F80ED",
        fontWeight: "600",
    },
})