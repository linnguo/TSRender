/**
 * WireFrameMeshRender
 */
class WireFrameMeshRender {
    private _gl: WebGLRenderingContext;
    private _verticesBuff: WebGLBuffer;
    private _normalsBuff: WebGLBuffer;
    private _uv0Buff: WebGLBuffer;
    private _trianglesBuff: WebGLBuffer;
    
    mesh : Mesh;
    material : Material;
    transform : Transform;
    camera : Camera;
    
    constructor(gl: WebGLRenderingContext)
    {
        this._gl = gl;
    }
    
    ConvertTriangles2Lines(triangles: number[]): number[]
    {
        var lines: number[] = [];
        var trianglesCount = Math.floor(triangles.length/3);
        for (var i=0; i<trianglesCount; ++i)
        {
            lines.push(triangles[i * 3]);
            lines.push(triangles[i * 3 + 1]);
            
            lines.push(triangles[i * 3 + 1]);
            lines.push(triangles[i * 3 + 2]);
            
            lines.push(triangles[i * 3 + 2]);
            lines.push(triangles[i * 3]);
        }
        return lines;
    }
    
    LoadMesh()
    {
        this._verticesBuff = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._verticesBuff);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, Utils.ConvertVector3Array2Float32Array(this.mesh.vertices), this._gl.STATIC_DRAW);
        
        if (this.mesh.normals)
        {
            this._normalsBuff = this._gl.createBuffer();
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._normalsBuff);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, Utils.ConvertVector3Array2Float32Array(this.mesh.normals), this._gl.STATIC_DRAW);
        }
        
        if (this.mesh.uv)
        {
            this._uv0Buff = this._gl.createBuffer();
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._uv0Buff);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, Utils.ConvertVector2Array2Float32Array(this.mesh.uv), this._gl.STATIC_DRAW);
        }
        
        this._trianglesBuff = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._trianglesBuff);
        this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, Utils.ConvertNumberArray2Uint16Array(this.ConvertTriangles2Lines(this.mesh.triangles)), this._gl.STATIC_DRAW);
    }
    
    Draw()
    {
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._verticesBuff);
        this._gl.vertexAttribPointer(this.material.GetAttribLocation("atbPosition"), 3, this._gl.FLOAT, false, 0, 0);
        
        if (this._normalsBuff)
        {
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._normalsBuff);
            this._gl.vertexAttribPointer(this.material.GetAttribLocation("atbNormal"), 3, this._gl.FLOAT, false, 0, 0);
        }
        
        if (this._uv0Buff)
        {
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._uv0Buff);
            this._gl.vertexAttribPointer(this.material.GetAttribLocation("atbUV"), 2, this._gl.FLOAT, false, 0, 0);
        }
        
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._trianglesBuff);
        
        this.material.SetUniformMatrix4fv("uModelMatrix", this.transform.GetModelMatrix());
        this.material.SetUniformMatrix4fv("uViewMatrix", this.camera.GetViewMatrix());
        this.material.SetUniformMatrix4fv("uProjectMatrix", this.camera.GetProjectMatrix());
        this.material.SetUniformMatrix4fv("uNormalMatrix", this.transform.GetNormalMatrix());
        
        this.material.UseTextures();
        
        this._gl.drawElements(this._gl.LINES, this.mesh.triangles.length * 2, this._gl.UNSIGNED_SHORT, 0);
    }
}