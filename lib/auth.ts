import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import bcrypt from "bcrypt";
import User from "@/app/models/user";
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || credentials?.password) {
                    throw new Error("Missing Email or Password")
                }
                try {
                    await connectToDatabase()
                    const user = await User.findOne({ email: credentials.email });
                    if (!user) {
                        throw new Error("No User Exists")
                    }
                    const isValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    )
                    if (!isValid) {
                        throw new Error("Invalid Password")
                    }
                    return {
                        id: user._id.toString(),
                        email:user.email
                    }
                } catch (error) {
                    console.error("Auth Error :" ,error)
                    throw error
                }

            }

        })
    ],
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id=user.id;
            }
            return token
        }
    }



}