/**
 * Material
 */
class Material {
    private _gl : WebGLRenderingContext;
    private _program : WebGLProgram;
    private _textures = {}
    
    constructor(gl: WebGLRenderingContext)
    {
        this._gl = gl;
    }
    
	textures : Texture[];
    Register(name: string, texture: Texture){
        this._textures[name] = texture;
    }
    UseTextures(){
        var gl : WebGLRenderingContext = this._gl;
        var index = 0;
        for (var textureName in this._textures) {
            if (this._textures.hasOwnProperty(textureName)) {
                var texture: Texture = this._textures[textureName];
                gl.activeTexture(gl.TEXTURE0 + index);
                gl.bindTexture(gl.TEXTURE_2D, texture.texture);
                gl.uniform1i(this.GetUniformLocation(textureName), index);
            }
        }
    }
    
    Load(vs: string, fs: string)
    {
        this._program = this.CreateProgram(vs, fs);
    }
    
    Unload()
    {
        
    }
    
    Use()
    {
        this._gl.useProgram(this._program);
    }
    
    GetAttribLocation(name: string): number
    {
        var re = this._gl.getAttribLocation(this._program, name);
        this._gl.enableVertexAttribArray(re);
        return re;
    }
    
    GetUniformLocation(name: string): WebGLUniformLocation
    {
        var re = this._gl.getUniformLocation(this._program, name);
        return re;
    }
    
    SetUniformMatrix4fv(name: string, mtx: Matrix4x4)
    {
        var uniformLocation = this.GetUniformLocation(name);
        this._gl.uniformMatrix4fv(uniformLocation, false, mtx.ToFloat32Array());
    }
    
    SetUniform4f(name: string, x: number, y: number, z: number, w: number)
    {
        var uniformLocation = this.GetUniformLocation(name);
        this._gl.uniform4f(uniformLocation, x, y, z, w);
    }
    
    private CreateVertexShader(str: string) : WebGLShader
	{
		var shader = this._gl.createShader(this._gl.VERTEX_SHADER);
		if (this.CompileShader(shader, str)){
			return shader;
		}
		else{
			return null;
		}
	}

	private CreateFragmentShader(str: string) : WebGLShader
	{
		var shader = this._gl.createShader(this._gl.FRAGMENT_SHADER);
		if (this.CompileShader(shader, str)) {
			return shader;
		}
		else{
			return null;
		}
	}

	private CompileShader(shader: WebGLShader, str: string) : boolean
	{
		this._gl.shaderSource(shader, str);
	    this._gl.compileShader(shader);

		if (!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {
			alert(this._gl.getShaderInfoLog(shader));
		    return false;
		}

        return true;
	}

	private CreateProgram(vs: string, fs: string) : WebGLProgram
	{
		var vertexShader = this.CreateVertexShader(vs);
		var fragmentShader = this.CreateFragmentShader(fs);

        var shaderProgram = this._gl.createProgram();
        this._gl.attachShader(shaderProgram, vertexShader);
        this._gl.attachShader(shaderProgram, fragmentShader);
        this._gl.linkProgram(shaderProgram);

        if (!this._gl.getProgramParameter(shaderProgram, this._gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
            return null;
        }

        return shaderProgram;
	}
}