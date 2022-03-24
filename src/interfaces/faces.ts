export interface FaceCompareResponse {
    SourceImageFace: SourceImageFace;
    FaceMatches:     FaceMatch[];
    UnmatchedFaces:  FaceMatch[];
}

export interface FaceMatch {
    Similarity: number;
    Face:       Face;
}

export interface Face {
    BoundingBox: BoundingBox;
    Confidence:  number;
    Landmarks:   Landmark[];
    Pose:        Pose;
    Quality:     Quality;
}

export interface BoundingBox {
    Width:  number;
    Height: number;
    Left:   number;
    Top:    number;
}

export interface Landmark {
    Type: Type;
    X:    number;
    Y:    number;
}

export enum Type {
    EyeLeft = "eyeLeft",
    EyeRight = "eyeRight",
    MouthLeft = "mouthLeft",
    MouthRight = "mouthRight",
    Nose = "nose",
}

export interface Pose {
    Roll:  number;
    Yaw:   number;
    Pitch: number;
}

export interface Quality {
    Brightness: number;
    Sharpness:  number;
}

export interface SourceImageFace {
    BoundingBox: BoundingBox;
    Confidence:  number;
}
