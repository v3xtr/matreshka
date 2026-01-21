import { randomInt } from 'crypto'

export function generateId(): string {
    const LETTERS: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const DIGITS: string = "0123456789"

    const lettersPart: string = LETTERS[randomInt(0, LETTERS.length)] + LETTERS[randomInt(0, LETTERS.length)]

    let digitsPart = ""

    for(let i = 0; i <9; i++){
        digitsPart += DIGITS[randomInt(0, DIGITS.length)]
    }

    return lettersPart + digitsPart
}
