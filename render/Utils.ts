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