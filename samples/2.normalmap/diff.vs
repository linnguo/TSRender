attribute vec3 atbPosition;
attribute vec3 atbColor;
attribute vec3 atbNormal;
attribute vec2 atbUV;

uniform vec4 uLight;
uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectMatrix;
uniform mat4 uNormalMatrix;

varying vec4 vColor;
varying vec2 vUV0;
varying vec3 vNormal;

void main(void) {
    gl_Position = uProjectMatrix * uViewMatrix * uModelMatrix * vec4(atbPosition, 1.0);
    vNormal = normalize((uNormalMatrix * vec4(atbNormal, 1.0)).xyz);
    vUV0 = atbUV;
    vColor = vec4(1,0,0,1);
}