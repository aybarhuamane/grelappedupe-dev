'use server'

import {cookies} from 'next/headers'

async function createCookie(name: string, data: any) {
    cookies().set({
        name: name,
        value: data,
        httpOnly: true,
        // maxAge: 60 * 60 * 24 * 30,
        path: '/',
    })
}

async function createCookieClient(
    name: string,
    data: string,
    days: number = 7,
) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = '; expires=' + date.toUTCString()

    if (typeof window !== 'undefined'){
        document.cookie = name + '=' + data + expires + '; path=/'
    }
}

async function deleteCookie(name: string) {
    cookies().set({
        name: name,
        value: '',
        httpOnly: true,
        maxAge: 0,
        path: '/',
    })
}

async function getCookie(name: string) {
    return cookies().get(name)
}

export { createCookie, createCookieClient, getCookie, deleteCookie}
