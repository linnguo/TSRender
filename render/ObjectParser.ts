/**
 * ObjectParser
 */

/// <reference path="../render/Render.ts" />

class ObjectParser 
{
    //Cache
    vertexCache: Vector3[] = [];
    uvCache: Vector2[] = [];
    normalCache: Vector3[] = [];
    
    //Mesh Element
    vertices: Vector3[] = [];
    uvs: Vector2[] = [];
    normals: Vector3[] = [];
    triangles: number[] = [];
    
    //Ignore First Word
    ParseVector3(words: string[]): Vector3
    {
        if (words.length == 4){
            var x = parseFloat(words[1]);
            var y = parseFloat(words[2]);
            var z = parseFloat(words[3]);
            return new Vector3(x, y, z);
        }
        return null;
    }
    
    //Ignore First Word
    ParseVector2(words: string[]): Vector2
    {
        if (words.length == 3){
            var x = parseFloat(words[1]);
            var y = parseFloat(words[2]);
            return new Vector2(x, y);
        }
        return null;
    }
    
    //解析Face的一个元素
    ParseElement(word: string)
    {
        var words: string[] = word.split("/");
        var posIndex = parseInt(words[0]);
        if (posIndex < 1 || posIndex > this.vertexCache.length){
            console.log("Error!");
        }
        this.vertices.push(this.vertexCache[posIndex-1]);
        
        //uv
        if (words.length >= 2 && words[1].length > 0){
            var uvIndex = parseInt(words[1]);
            this.uvs.push(this.uvCache[uvIndex-1]);
        }
        
        //normal
        if (words.length >= 3 && words[2].length > 0){
            var normalIndex = parseInt(words[2]);
            this.normals.push(this.normalCache[normalIndex-1]);
        }
    }
    
    //Ignore First Word
    ParseFace(words: string[])
    {
        var vertexCount = this.vertices.length;
        if (words.length == 4){
            for (var i=1; i<words.length; ++i){
                this.ParseElement(words[i]);
            }
            this.triangles.push(vertexCount, vertexCount+1, vertexCount+2);
        }
        else if (words.length == 5){
            for (var i=1; i<words.length; ++i){
                this.ParseElement(words[i]);
            }
            this.triangles.push(vertexCount, vertexCount+1, vertexCount+2, vertexCount, vertexCount+2, vertexCount+3);
        }
    }
    
    ParseLines(fileContent: string)
    {
        var lines = fileContent.split("\n");
        for (var i = 0; i < lines.length; i++) {
            var element = lines[i];
            if (element.charAt(0) == "#"){
                continue;
            }
            
            var words = element.split(" ");
            switch(words[0])
            {
                case 'v':
                    this.vertexCache.push(this.ParseVector3(words));
                    break;
                case 'vt':
                    this.uvCache.push(this.ParseVector2(words));
                    break;
                case "vn":
                    this.normalCache.push(this.ParseVector3(words));
                    break;
                case 'f':
                    this.ParseFace(words);
                    break;
                default:break;
            }
        }
    }
    
    Parse(fileContent: string): Mesh
    {
        this.ParseLines(fileContent);
        var mesh = new Mesh();
        mesh.vertices = this.vertices;
        mesh.uv = this.uvs;
        mesh.triangles = this.triangles;
        mesh.normals = this.normals;
        
        return mesh;
    }
}