export interface Faces {
    FaceMatches:                      FaceMatch[];
    SourceImageOrientationCorrection: string;
    TargetImageOrientationCorrection: string;
    UnmatchedFaces:                   Face[];
    SourceImageFace:                  SourceImageFace;
}

export interface FaceMatch {
    Face:       Face;
    Similarity: number;
}

export interface Face {
    BoundingBox: BoundingBox;
    Confidence:  number;
    Pose:        Pose;
    Quality:     Quality;
    Landmarks:   Landmark[];
}

export interface BoundingBox {
    Width:  number;
    Top:    number;
    Left:   number;
    Height: number;
}

export interface Landmark {
    Y:    number;
    X:    number;
    Type: string;
}

export interface Pose {
    Yaw:   number;
    Roll:  number;
    Pitch: number;
}

export interface Quality {
    Sharpness:  number;
    Brightness: number;
}

export interface SourceImageFace {
    BoundingBox: BoundingBox;
    Confidence:  number;
}
