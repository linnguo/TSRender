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