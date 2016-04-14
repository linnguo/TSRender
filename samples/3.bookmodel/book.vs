attribute vec3 atbPosition;
attribute vec3 atbColor;
attribute vec3 atbNormal;
attribute vec2 atbUV;

uniform vec4 book; 

uniform vec4 uLight;
uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectMatrix;
uniform mat4 uNormalMatrix;

varying vec4 vColor;

vec2 arcmove(float radius, float dis)
{
    float angle = dis/radius;
	return vec2(radius*sin(angle), radius - radius*cos(angle));
}

vec3 pagetrans(vec2 page, vec2 pos, vec2 curcorner)
{
    vec2 oricorner = vec2(page.x, 0);
    vec2 arc2corner = oricorner - curcorner;
    vec2 arc2pos = pos - curcorner;

    if (dot(arc2corner, arc2pos) <= 0.0)
    {
        return vec3(pos.x, pos.y, 0.0);
    }
    else
    {
        float arcradius = length(arc2corner) / 3.1415926;
        arc2corner = normalize(arc2corner);
        float dis = abs(dot(arc2corner, arc2pos));
        vec2 begin = pos - dis * arc2corner;
        vec2 move = arcmove(arcradius, dis);
        return vec3(begin+move.x*arc2corner, move.y);
    }
}
    
void main(void) {
    //Vertex的值从(0, 0)到(width, height)
    vec2 pos = vec2(atbPosition.x, atbPosition.y);
    vec3 tmp = pagetrans(vec2(book.x, book.y), pos, vec2(book.z, book.w)); 
    gl_Position = uProjectMatrix * uViewMatrix * uModelMatrix * vec4(tmp, 1.0);
    vColor = vec4(1,0,0,1);
}