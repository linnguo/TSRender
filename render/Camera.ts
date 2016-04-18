enum ProjectMode{
    Perspective,
    Ortho,
}

/**
 * Camera
 */
class Camera
{
    mode: ProjectMode;
    
    eye: Vector3;
    target: Vector3;
    top: Vector3;
    
    far: number;
    near: number;
    
    aspect: number;
    
    orthoSize: number;
    fov: number;
    
    GetViewMatrix(): Matrix4x4
    {
        return Matrix4x4.LookAt(this.eye, this.target, this.top);
    }
    
    GetProjectMatrix(): Matrix4x4
    {
        if (this.mode == ProjectMode.Perspective){
            return Matrix4x4.Perspective(this.fov, this.aspect, this.near, this.far);
        }
        else{
            var halfHeight = this.orthoSize/2;
            var halfWidth = halfHeight * this.aspect;
            return Matrix4x4.Ortho(-halfWidth, halfWidth, -halfHeight, halfHeight, this.near, this.far);
        }
    }
}