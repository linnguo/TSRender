/**
 * Mesh
 */
class Mesh
{
    vertices : Vector3[];
    uv : Vector2[];
    normals : Vector3[];
    colors : Color[];
    triangles : number[];
    
    constructor()
    {
        
    }
    
    static CreateBox(): Mesh
    {
        var mesh = new Mesh();
        mesh.vertices = [
            new Vector3(-1, -1, 1),
            new Vector3(-1, -1, -1),
            new Vector3(1, -1, -1),
            new Vector3(1, -1, 1),
            new Vector3(-1, 1, 1),
            new Vector3(-1, 1, -1),
            new Vector3(1, 1, -1),
            new Vector3(1, 1, 1),
        ];
        mesh.triangles = [
            1, 2, 3,
            7, 6, 5,
            0, 4, 5,
            1, 5, 6,
            6, 7, 3,
            0, 3, 7,
            0, 1, 3,
            4, 7, 5,
            1, 0, 5,
            2, 1, 6,
            2, 6, 3,
            4, 0, 7,
        ];
        return mesh;
    }
}