/// <reference path="../../render/Math.ts" />
/// <reference path="../../render/Mesh.ts" />
/// <reference path="../../render/Material.ts" />
/// <reference path="../../render/MeshRender.ts" />
/// <reference path="../../render/WireFrameMeshRender.ts" />
/// <reference path="../../render/Render.ts" />

/**
 * Book.ts
 */

class Book
{
    private _gl: WebGLRenderingContext;
    //private render: MeshRender;
    private render: WireFrameMeshRender;
    private mesh: Mesh;
    private camera: Camera;
    private material: Material; 
    
    private width: number;
    private height: number;
    private row: number;
    private col: number;
    
    vs: string;
    fs: string;
    
    //右下角位置, 相对于左下角
    cornerX: number;
    cornerY: number;
    
    constructor(gl: WebGLRenderingContext, width: number, height: number, row: number, col: number){
        this._gl = gl;
        this.width = width;
        this.height = height;
        this.row = row;
        this.col = col;
    }
    
    private CreatePlane(): Mesh
    {
        var mesh = new Mesh();
        mesh.vertices = [];
        
        var segX = this.width/this.col;
        var segY = this.height/this.row;
        
        for (var rowIdx=0; rowIdx< this.row+1; rowIdx++){
            for (var colIdx = 0; colIdx < this.col+1; colIdx++) {
                var posX = segX * colIdx;
                var posY = segY * rowIdx;
                mesh.vertices.push(new Vector3(posX, posY));
            }
        }
        
        //index
        mesh.triangles = [];
        for (var rowIdx=0; rowIdx<this.row; rowIdx++){
            for (var colIdx=0; colIdx<this.col; colIdx++){
                var leftTop = rowIdx * (this.col + 1) + colIdx;
                var leftBottom = leftTop + (this.col + 1);
                var rightTop = leftTop + 1;
                var rightBottom = leftBottom + 1;
                mesh.triangles.push(leftTop, rightTop, rightBottom);
                mesh.triangles.push(leftTop, rightBottom, leftBottom);
            }
        }
        return mesh;
    }
    
    private CreateCamera(): Camera
    {
        var camera = new Camera();
        camera.mode = ProjectMode.Ortho;
        camera.near = -1000;
        camera.far = 1000;
        camera.aspect = this.width/this.height;
        
        camera.eye = new Vector3(this.width/2, this.height/2);
        camera.target = Vector3.Add(camera.eye, new Vector3(0, 0, 1));
        camera.top = new Vector3(0, 1, 0);
        
        camera.orthoSize = this.height;
        return camera;
    }
    
    Load()
    {
        var material = new Material(this._gl);
        material.Load(this.vs, this.fs);
        this.material = material;
        this.mesh = this.CreatePlane();
        this.camera = this.CreateCamera();
        
        //var render = new MeshRender(this._gl);
        var render = new WireFrameMeshRender(this._gl);
        render.material = material;
        render.mesh = this.mesh;
        render.camera = this.camera;
        
        render.transform = new Transform();;
        render.LoadMesh();
        
        this.render = render;
    }
    
    Draw()
    {
        this.material.Use();
        this.material.SetUniform4f("book", this.width, this.height, this.cornerX, this.cornerY);
        this.render.Draw();
    }
}