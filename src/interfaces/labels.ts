export module Labels {

    export interface BoundingBox {
        Width: number;
        Top: number;
        Left: number;
        Height: number;
    }

    export interface Pose {
        Yaw: number;
        Roll: number;
        Pitch: number;
    }

    export interface Quality {
        Sharpness: number;
        Brightness: number;
    }

    export interface Landmark {
        Y: number;
        X: number;
        Type: string;
    }

    export interface Face {
        BoundingBox: BoundingBox;
        Confidence: number;
        Pose: Pose;
        Quality: Quality;
        Landmarks: Landmark[];
    }

    export interface FaceMatch {
        Face: Face;
        Similarity: number;
    }

    export interface BoundingBox2 {
        Width: number;
        Top: number;
        Left: number;
        Height: number;
    }

    export interface Pose2 {
        Yaw: number;
        Roll: number;
        Pitch: number;
    }

    export interface Quality2 {
        Sharpness: number;
        Brightness: number;
    }

    export interface Landmark2 {
        Y: number;
        X: number;
        Type: string;
    }

    export interface UnmatchedFace {
        BoundingBox: BoundingBox2;
        Confidence: number;
        Pose: Pose2;
        Quality: Quality2;
        Landmarks: Landmark2[];
    }

    export interface BoundingBox3 {
        Width: number;
        Top: number;
        Left: number;
        Height: number;
    }

    export interface SourceImageFace {
        BoundingBox: BoundingBox3;
        Confidence: number;
    }

    export interface RootObject {
        FaceMatches: FaceMatch[];
        SourceImageOrientationCorrection: string;
        TargetImageOrientationCorrection: string;
        UnmatchedFaces: UnmatchedFace[];
        SourceImageFace: SourceImageFace;
    }

}
