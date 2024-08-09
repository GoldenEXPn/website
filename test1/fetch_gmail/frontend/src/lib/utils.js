import {twMerge} from 'tailwind-merge'
import clsx from 'clsx'
// import clsx, {ClassValue} from 'clsx'
export function cn(...inputs
    // : ClassValue[]
) {
    return twMerge(clsx(...inputs))
}