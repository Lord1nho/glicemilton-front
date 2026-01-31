import {StyleSheet} from 'react-native';

export  const styles = StyleSheet.create({

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

    progressCard: {
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
    },

    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "rgba(255,255,255,0.25)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },

    progressTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
    },

    progressSubtitle: {
        fontSize: 13,
        color: "#fff",
        opacity: 0.9,
        marginVertical: 6,
    },

    progressBarBackground: {
        height: 8,
        backgroundColor: "rgba(255,255,255,0.3)",
        borderRadius: 4,
        marginTop: 10,
    },

    progressBarFill: {
        width: "5%",
        height: "100%",
        backgroundColor: "#fff",
        borderRadius: 4,
    },

    progressFooter: {
        marginTop: 8,
        fontSize: 12,
        color: "#fff",
        opacity: 0.9,
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
        alignItems: "flex-start",
    },

    cardIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#eff6ff",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    cardTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#0f172a",
    },

    cardTitleDisabled : {
        color: "#3b82f6",
    },

    cardDescription: {
        fontSize: 12,
        color: "#475569",
        marginVertical: 6,
    },

    textProtetcionAtivacted: {
        color: "#3b82f6",
        fontWeight: "600"
    },

    cardButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#3b82f6",
        alignSelf: "flex-start",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        marginTop: 4,
    },

    cardButtonDisabled: {
        backgroundColor: "#9ca3af", // cinza
        opacity: 0.6,
    },

    cardButtonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
        marginLeft: 6,
    },

    renewButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#dbeafe",
        padding: 12,
        borderRadius: 999,
        marginTop: 12,
    },

    renewButtonText: {
        color: "#2563eb",
        fontWeight: "700",
        marginLeft: 8,
    },

})