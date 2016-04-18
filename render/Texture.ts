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