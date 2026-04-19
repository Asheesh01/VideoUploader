import mongoose, { Schema, model, models } from "mongoose";

export const VIDEO_DIMENSION = {
    width: 1080,
    height: 1920
}


export interface IVideo {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    thumbnail: string;
    controls?: boolean;
    trnansformation?: {
        height: number;
        width: number;
        quality?: number
    };
}

const videoSchema = new Schema<IVideo>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        videoUrl: { type: String, required: true },
        thumbnail: { type: String, required: true },
        controls: { type: Boolean, default: true },
        trnansformation: {
            height: { type: Number, default: VIDEO_DIMENSION.height },
            width: { type: Number, default: VIDEO_DIMENSION.width },
            quality: { type: Number, min: 1, max: 100 },
        }
    },
    { timestamps: true }
)

const Video = models?.Video || model<IVideo>("video", videoSchema)

export default Video;