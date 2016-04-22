/**
 * Joint
 */
class Joint {
    invBindPos : Matrix4x4;
    parentIdx : number;
}

/**
 * JointPos
 */
class JointPos {
    rotation: Quaternion;
    translation: Vector3;
    scale: number; 
}

/**
 * Skeleton
 */
class Skeleton {
    joints : Joint[];
    
}

/**
 * BoneWeight
 */
class BoneWeight {
    boneIndex0 : number;
    weight0 : number;
    
    boneIndex1 : number;
    weight1 : number;
}

/**
 * Mesh
 */
class Mesh
{
    vertices : Vector3[];
    uv : Vector2[];
    normals : Vector3[];
    colors : Color[];
    tangents : Vector3[];
    
    triangles : number[];
    
    //骨骼动画
    invBindPoses : Matrix4x4[];
    boneWeights : BoneWeight[];
    
    Bind(skeleton: Skeleton) : Vector3[]{
        return null;
    }
    
    static CreateBox(): Mesh
    {
        var mesh = new Mesh();
        mesh.vertices = [
            new Vector3(-1, -1, 1),
            new Vector3(-1, -1, -1),
            new Vector3(1, -1, -1),
            new Vector3(1, -1, 1),
            new Vector3(-1, 1, 1),
            new Vector3(-1, 1, -1),
            new Vector3(1, 1, -1),
            new Vector3(1, 1, 1),
        ];
        mesh.triangles = [
            1, 2, 3,
            7, 6, 5,
            0, 4, 5,
            1, 5, 6,
            6, 7, 3,
            0, 3, 7,
            0, 1, 3,
            4, 7, 5,
            1, 0, 5,
            2, 1, 6,
            2, 6, 3,
            4, 0, 7,
        ];
        return mesh;
    }
}