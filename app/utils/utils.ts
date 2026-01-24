export function formatDateBR(date: string): string {
    if (!date) return "";

    // Espera formato YYYY-MM-DD
    const [year, month, day] = date.split("-").map(Number);

    const safeDate = new Date(year, month - 1, day);

    return safeDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}