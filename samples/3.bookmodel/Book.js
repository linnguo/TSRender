/// <reference path="../../render/Math.ts" />
/// <reference path="../../render/Mesh.ts" />
/// <reference path="../../render/Material.ts" />
/// <reference path="../../render/MeshRender.ts" />
/// <reference path="../../render/WireFrameMeshRender.ts" />
/// <reference path="../../render/Render.ts" />
/**
 * Book.ts
 */
var Book = (function () {
    function Book(gl, width, height, row, col) {
        this._gl = gl;
        this.width = width;
        this.height = height;
        this.row = row;
        this.col = col;
    }
    Book.prototype.CreatePlane = function () {
        var mesh = new Mesh();
        mesh.vertices = [];
        var segX = this.width / this.col;
        var segY = this.height / this.row;
        for (var rowIdx = 0; rowIdx < this.row + 1; rowIdx++) {
            for (var colIdx = 0; colIdx < this.col + 1; colIdx++) {
                var posX = segX * colIdx;
                var posY = segY * rowIdx;
                mesh.vertices.push(new Vector3(posX, posY));
            }
        }
        //index
        mesh.triangles = [];
        for (var rowIdx = 0; rowIdx < this.row; rowIdx++) {
            for (var colIdx = 0; colIdx < this.col; colIdx++) {
                var leftTop = rowIdx * (this.col + 1) + colIdx;
                var leftBottom = leftTop + (this.col + 1);
                var rightTop = leftTop + 1;
                var rightBottom = leftBottom + 1;
                mesh.triangles.push(leftTop, rightTop, rightBottom);
                mesh.triangles.push(leftTop, rightBottom, leftBottom);
            }
        }
        return mesh;
    };
    Book.prototype.CreateCamera = function () {
        var camera = new Camera();
        camera.mode = ProjectMode.Ortho;
        camera.near = -1000;
        camera.far = 1000;
        camera.aspect = this.width / this.height;
        camera.eye = new Vector3(this.width / 2, this.height / 2);
        camera.target = Vector3.Add(camera.eye, new Vector3(0, 0, 1));
        camera.top = new Vector3(0, 1, 0);
        camera.orthoSize = this.height;
        return camera;
    };
    Book.prototype.Load = function () {
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
        render.transform = new Transform();
        ;
        render.LoadMesh();
        this.render = render;
    };
    Book.prototype.Draw = function () {
        this.material.Use();
        this.material.SetUniform4f("book", this.width, this.height, this.cornerX, this.cornerY);
        this.render.Draw();
    };
    return Book;
})();
