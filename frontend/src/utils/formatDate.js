import { format, parseISO } from 'date-fns';

export function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
        const d = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
        return format(d, 'MMM d, yyyy');
    } catch (e) {
        return dateStr;
    }
}

export function formatInputDate(dateStr) {
    if (!dateStr) return '';
    try {
        const d = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
        return format(d, 'yyyy-MM-dd');
    } catch (e) {
        return dateStr;
    }
}

export function formatDateTime(dateStr) {
    if (!dateStr) return '';
    try {
        const d = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
        return format(d, 'MMM d, yyyy h:mm a');
    } catch (e) {
        return dateStr;
    }
}
