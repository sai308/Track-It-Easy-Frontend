export const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric",
    };
    return date.toLocaleDateString("uk-UA", options);
};

export const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };
    return date.toLocaleTimeString("uk-UA", options);
};
