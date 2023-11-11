export function getRelativeDate(date: any) {
    const currentDate = new Date();
    const eventDate = new Date(date * 1000); // Convert Unix timestamp to JavaScript Date
    const timeDifference = eventDate.getTime() - currentDate.getTime();
    const minutesDifference = Math.round(Math.abs(timeDifference) / (1000 * 60));
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const monthsDifference = Math.floor(daysDifference / 30); // Approximation
    const yearsDifference = Math.floor(daysDifference / 365); // Approximation

    if (timeDifference >= 0) {
        // For future dates
        if (minutesDifference < 1) {
            return 'in a few seconds';
        } else if (minutesDifference < 60) {
            return `in ${minutesDifference} minutes`;
        } else if (hoursDifference < 24) {
            return `in ${hoursDifference} hours`;
        } else if (daysDifference < 30) {
            return `in ${daysDifference} days`;
        } else if (monthsDifference < 12) {
            return `in ${monthsDifference} months`;
        } else {
            return `in ${yearsDifference} years`;
        }
    } else {
        // For past dates
        if (minutesDifference < 1) {
            return 'just now';
        } else if (minutesDifference < 60) {
            return `${minutesDifference} minutes ago`;
        } else if (hoursDifference < 24) {
            return `${hoursDifference} hours ago`;
        } else if (daysDifference < 30) {
            return `${daysDifference} days ago`;
        } else if (monthsDifference < 12) {
            return `${monthsDifference} months ago`;
        } else {
            return `${yearsDifference} years ago`;
        }
    }
}
