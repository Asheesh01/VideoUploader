import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "../models/video";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { error } from "console";

export async function GET() {
    try {
        await connectToDatabase()
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean()

        if (!videos || videos.length == 0) {
            return NextResponse.json([], { status: 200 })
        }

        return NextResponse.json(videos)
    } catch (error) {
        return NextResponse.json({
            error: "Failed to Fetch Videos",
            status: 500
        })
    }

}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {

            return NextResponse.json({
                error: "Unauthorize",
                status: 401
            })
        }

        await connectToDatabase()
        const body: IVideo = await request.json()

        if (!body.title || !body.description || !body.videoUrl || !body.thumbnail) {
            return NextResponse.json({
                error: "Missing Required fields",
                status: 400
            })
        }
        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            trnansformation: {
                height: 1920,
                width: 1080,
                quality: body.trnansformation?.quality ?? 100,
            }
        }
        const newVideo = await Video.create(videoData)
        return NextResponse.json(newVideo)

    } catch (error) {
        return NextResponse.json({
            error: "Failed to Create the video",
            status: 401
        })
    }

}