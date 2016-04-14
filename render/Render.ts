

/**
 * Color
 */
class Color
{
    r : number;
    g : number;
    b : number;
    a : number;
    
    constructor(r : number = 0,
                g : number = 0,
                b : number = 0,
                a : number = 0){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}
/**
 * Utils 
 */
class Utils
{
    static ConvertVector3Array2Float32Array(vertices: Vector3[]) : Float32Array
    {
        var re = new Float32Array(vertices.length * 3);
        for (var i=0; i<vertices.length; ++i)
        {
            re[i*3 + 0] = vertices[i].x;
            re[i*3 + 1] = vertices[i].y;
            re[i*3 + 2] = vertices[i].z;
        }
        return re;
    }
    
    static ConvertVector2Array2Float32Array(vertices: Vector2[]) : Float32Array
    {
        var re = new Float32Array(vertices.length * 2);
        for (var i=0; i<vertices.length; ++i)
        {
            re[i*2 + 0] = vertices[i].x;
            re[i*2 + 1] = vertices[i].y;
        }
        return re;
    }
    
    static ConvertNumberArray2Uint16Array(nums: number[]): Uint16Array
    {
        var re = new Uint16Array(nums.length);
        for (var i=0; i<nums.length; ++i)
        {
            re[i] = nums[i];
        }
        return re;
    }
}

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

/**
 * Texture
 */
class Texture 
{
	private _gl: WebGLRenderingContext;
    private _texture: WebGLTexture;
    
    constructor(gl: WebGLRenderingContext)
    {
        this._gl = gl;
    }
    
    get texture(): WebGLTexture
    {
        return this._texture;
    }
    
    Load(image: HTMLImageElement)
    {
        var gl = this._gl;
        this._texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
}





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




             
/*            
 * Context
 */
class Context
{
	static canvas;
	static gl : WebGLRenderingContext;
    
	static InitGL(canvas)
	{
        Context.canvas = canvas;
	    try 
		{
            var gl: WebGLRenderingContext;
	        gl = canvas.getContext("experimental-webgl");
			gl.viewport(0, 0, canvas.width, canvas.height);
            
            //TestClear
			gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.enable(gl.DEPTH_TEST);
            
            Context.gl = gl;
	    }
		catch (e) 
		{}
	    
		if (!gl)
		{
	        alert("Could not initialise WebGL, sorry :-(");
	    }
	}	
}

/**
 * FileLoader
 */
class FileLoader
{
	Load(url: string, callback:{(textContent: string): void;})
	{
		var request = new XMLHttpRequest();
		request.responseType = "text";
		request.onload = function() { 
			callback(request.responseText);
		};
		request.open("GET", url, true);
		request.send(null);
	}
}