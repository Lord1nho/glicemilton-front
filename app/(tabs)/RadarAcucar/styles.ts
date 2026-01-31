import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DFF4FF",
    },
    content: {
        padding: 16,
        paddingBottom: 40,
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
        color: "#0A2A43",
    },
    headerSubtitle: {
        fontSize: 14,
        color: "#2F80ED",
    },

    highlightCard: {
        backgroundColor: "#EEF8FF",
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        marginBottom: 20,
    },
    highlightTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#2F80ED",
        marginTop: 8,
    },
    highlightSubtitle: {
        fontSize: 14,
        color: "#555",
        textAlign: "center",
        marginTop: 4,
    },

    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
    },
    cardTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "700",
    },


    label: {
        fontSize: 14,
        marginBottom: 4,
        marginTop: 12,
        fontWeight: "600",
    },

    input: {
        backgroundColor: "#F1FAFF",
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
    },

    select: {
        backgroundColor: "#F1FAFF",
        borderRadius: 12,
    },

    picker: {
        width: "100%",
    },
    selectText: {
        fontSize: 14,
        color: "#333",
    },

    button: {
        backgroundColor: "#FF8A00",
        borderRadius: 14,
        paddingVertical: 14,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
    },

    rangeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    rangeLabel: {
        fontSize: 14,
    },
    rangeValue: {
        fontSize: 14,
        fontWeight: "700",
        color: "#27AE60",
    },

    lastRecordRow: {
        backgroundColor: "#F8FCFF",
        borderRadius: 12,
        padding: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    lastRecordLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    lastRecordValue: {
        fontSize: 14,
        fontWeight: "700",
        color: "#000",
    },

    lastRecordTime: {
        fontSize: 12,
        color: "#2F80ED",
    },

    messageCard: {
        backgroundColor: "#F2ECEC",
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 16,
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "#FF3B30",
        marginBottom: 20,
    },

    messageTitle: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: "700",
    },

    messageSubtitle: {
        marginTop: 6,
        fontSize: 13,
        textAlign: "center",
    },

    messageValue: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: "800",
    },
})