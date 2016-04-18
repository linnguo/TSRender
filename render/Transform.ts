/**
 * Transform
 */
class Transform
{
    parent : Transform;
    position : Vector3;
    scale : Vector3;
    rotation : Vector3;
    
    constructor()
    {
        this.parent = null;
        this.position = Vector3.zero;
        this.scale = Vector3.one;
        this.rotation = Vector3.zero;
    }
    
    GetModelMatrix(): Matrix4x4 
    {
        return Matrix4x4.TRS(this.position, this.rotation, this.scale);
    }
    
    GetNormalMatrix(): Matrix4x4
    {
        var reversScale = new Vector3(1/this.scale.x, 1/this.scale.y, 1/this.scale.z);
        reversScale.Normalize();
        return Matrix4x4.MultiplyMatrix4x4(Matrix4x4.RotationFromEuler(this.rotation), Matrix4x4.Scale(reversScale));
    }
}