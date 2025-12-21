export function isEmail(login: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(login);
}

export function isPhone(login: string): boolean {
    const digitsOnly = login.replace(/\D/g, '');
    return digitsOnly.length >= 10 && digitsOnly.length <= 15;
}
