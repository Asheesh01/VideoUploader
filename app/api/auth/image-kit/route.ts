// File: app/api/upload-auth/route.ts
import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {


    try {
        const authenticationParameters = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, // Never expose this on client side
            publicKey: process.env.NEXT_PUBLI_PUBLIC_KEY as string,

        })

        return Response.json({
            authenticationParameters,
            publicKey: process.env.NEXT_PUBLI_PUBLIC_KEY
        })

    } catch (error) {
 return Response.json({
           error:"Authentication for imagekit Failed",
           status:500
        })
    }
}