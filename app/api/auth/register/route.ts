import User from "@/app/models/user";
import { connectToDatabase } from "@/lib/db";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json({
                error: "Email and are required",
                status: 400
            })
        }
        await connectToDatabase()

        const exisitingUser = await User.findOne({ email });
        if (exisitingUser) {
            return NextResponse.json({
                error: "Email already registered ",
                status: 400
            })
        }

        await User.create({
            email,
            password
        })
        return NextResponse.json({
            message: "User registered Successfully",
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            error: "Failed to registered user",
            status: 400
        })

    }

}