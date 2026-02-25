import Yandex from "next-auth/providers/yandex"
import Google from "next-auth/providers/google"
import VK from "next-auth/providers/vk"
import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
 
export default { 
    providers: [Yandex, Google, VK, GitHub]
} satisfies NextAuthConfig