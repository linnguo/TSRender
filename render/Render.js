/**
 * Vector2
 */
var Vector2 = (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    return Vector2;
})();
/**
 * Vector3
 */
var Vector3 = (function () {
    function Vector3(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vector3.prototype.Length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
    Vector3.prototype.Normalize = function () {
        var length = this.Length();
        if (length > 0) {
            this.x /= length;
            this.y /= length;
            this.z /= length;
        }
        else {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }
    };
    Object.defineProperty(Vector3, "zero", {
        //
        // Static Properties
        //
        get: function () {
            return new Vector3(0, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "one", {
        get: function () {
            return new Vector3(1, 1, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "back", {
        get: function () {
            return new Vector3(0, 0, -1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "left", {
        get: function () {
            return new Vector3(-1, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "up", {
        get: function () {
            return new Vector3(0, 1, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "down", {
        get: function () {
            return new Vector3(0, -1, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "right", {
        get: function () {
            return new Vector3(1, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3, "front", {
        get: function () {
            return new Vector3(0, 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    //
    // Static Method
    //
    Vector3.Normalize = function (a) {
        var length = a.Length();
        if (length > 0) {
            return Vector3.ScaleS(a, 1 / length);
        }
        else {
            return Vector3.zero;
        }
    };
    Vector3.Add = function (a, b) {
        return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
    };
    Vector3.Subtract = function (a, b) {
        return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
    };
    Vector3.ScaleS = function (a, b) {
        return new Vector3(a.x * b, a.y * b, a.z * b);
    };
    Vector3.ScaleV = function (a, b) {
        return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z);
    };
    Vector3.Lerp = function (a, b, t) {
        return Vector3.Add(a, Vector3.ScaleS(Vector3.Subtract(b, a), t));
    };
    Vector3.Dot = function (a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    };
    Vector3.Cross = function (a, b) {
        return new Vector3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
    };
    return Vector3;
})();
/**
 * Quaternion
 */
var Quaternion = (function () {
    function Quaternion(x, y, z, w) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        if (w === void 0) { w = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    Object.defineProperty(Quaternion, "identity", {
        get: function () {
            return new Quaternion();
        },
        enumerable: true,
        configurable: true
    });
    return Quaternion;
})();
/**
 * Matrix
 */
var Matrix4x4 = (function () {
    function Matrix4x4() {
    }
    Matrix4x4.prototype.ToFloat32Array = function () {
        var re = new Float32Array(16);
        re[0] = this.m00;
        re[4] = this.m01;
        re[8] = this.m02;
        re[12] = this.m03;
        re[1] = this.m10;
        re[5] = this.m11;
        re[9] = this.m12;
        re[13] = this.m13;
        re[2] = this.m20;
        re[6] = this.m21;
        re[10] = this.m22;
        re[14] = this.m23;
        re[3] = this.m30;
        re[7] = this.m31;
        re[11] = this.m32;
        re[15] = this.m33;
        return re;
    };
    Matrix4x4.prototype.GetTranspose = function () {
        var re = new Matrix4x4();
        re.m00 = this.m00;
        re.m01 = this.m00;
        re.m02 = this.m20;
        re.m03 = this.m30;
        re.m10 = this.m01;
        re.m11 = this.m11;
        re.m12 = this.m21;
        re.m13 = this.m31;
        re.m20 = this.m02;
        re.m21 = this.m12;
        re.m22 = this.m22;
        re.m23 = this.m32;
        re.m30 = this.m03;
        re.m31 = this.m13;
        re.m32 = this.m23;
        re.m33 = this.m33;
        return re;
    };
    Object.defineProperty(Matrix4x4, "identity", {
        get: function () {
            var re = new Matrix4x4();
            re.m00 = 1;
            re.m01 = 0;
            re.m02 = 0;
            re.m03 = 0;
            re.m10 = 0;
            re.m11 = 1;
            re.m12 = 0;
            re.m13 = 0;
            re.m20 = 0;
            re.m21 = 0;
            re.m22 = 1;
            re.m23 = 0;
            re.m30 = 0;
            re.m31 = 0;
            re.m32 = 0;
            re.m33 = 1;
            return re;
        },
        enumerable: true,
        configurable: true
    });
    Matrix4x4.MultiplyMatrix4x4 = function (lhs, rhs) {
        var re = new Matrix4x4();
        re.m00 = lhs.m00 * rhs.m00 + lhs.m01 * rhs.m10 + lhs.m02 * rhs.m20 + lhs.m03 * rhs.m30,
            re.m01 = lhs.m00 * rhs.m01 + lhs.m01 * rhs.m11 + lhs.m02 * rhs.m21 + lhs.m03 * rhs.m31,
            re.m02 = lhs.m00 * rhs.m02 + lhs.m01 * rhs.m12 + lhs.m02 * rhs.m22 + lhs.m03 * rhs.m32,
            re.m03 = lhs.m00 * rhs.m03 + lhs.m01 * rhs.m13 + lhs.m02 * rhs.m23 + lhs.m03 * rhs.m33,
            re.m10 = lhs.m10 * rhs.m00 + lhs.m11 * rhs.m10 + lhs.m12 * rhs.m20 + lhs.m13 * rhs.m30,
            re.m11 = lhs.m10 * rhs.m01 + lhs.m11 * rhs.m11 + lhs.m12 * rhs.m21 + lhs.m13 * rhs.m31,
            re.m12 = lhs.m10 * rhs.m02 + lhs.m11 * rhs.m12 + lhs.m12 * rhs.m22 + lhs.m13 * rhs.m32,
            re.m13 = lhs.m10 * rhs.m03 + lhs.m11 * rhs.m13 + lhs.m12 * rhs.m23 + lhs.m13 * rhs.m33,
            re.m20 = lhs.m20 * rhs.m00 + lhs.m21 * rhs.m10 + lhs.m22 * rhs.m20 + lhs.m23 * rhs.m30,
            re.m21 = lhs.m20 * rhs.m01 + lhs.m21 * rhs.m11 + lhs.m22 * rhs.m21 + lhs.m23 * rhs.m31,
            re.m22 = lhs.m20 * rhs.m02 + lhs.m21 * rhs.m12 + lhs.m22 * rhs.m22 + lhs.m23 * rhs.m32,
            re.m23 = lhs.m20 * rhs.m03 + lhs.m21 * rhs.m13 + lhs.m22 * rhs.m23 + lhs.m23 * rhs.m33,
            re.m30 = lhs.m30 * rhs.m00 + lhs.m31 * rhs.m10 + lhs.m32 * rhs.m20 + lhs.m33 * rhs.m30,
            re.m31 = lhs.m30 * rhs.m01 + lhs.m31 * rhs.m11 + lhs.m32 * rhs.m21 + lhs.m33 * rhs.m31,
            re.m32 = lhs.m30 * rhs.m02 + lhs.m31 * rhs.m12 + lhs.m32 * rhs.m22 + lhs.m33 * rhs.m32,
            re.m33 = lhs.m30 * rhs.m03 + lhs.m31 * rhs.m13 + lhs.m32 * rhs.m23 + lhs.m33 * rhs.m33;
        return re;
    };
    Matrix4x4.prototype.MultiplyVector3 = function (v) {
        var result = new Vector3();
        result.x = this.m00 * v.x + this.m01 * v.y + this.m02 * v.z + this.m03;
        result.y = this.m10 * v.x + this.m11 * v.y + this.m12 * v.z + this.m13;
        result.z = this.m20 * v.x + this.m21 * v.y + this.m22 * v.z + this.m23;
        return result;
    };
    Matrix4x4.TRS = function (pos, r, s) {
        var mtxTranslation = Matrix4x4.Translation(pos);
        var mtxRotation = Matrix4x4.RotationFromEuler(r);
        var mtxScale = Matrix4x4.Scale(s);
        return Matrix4x4.MultiplyMatrix4x4(Matrix4x4.MultiplyMatrix4x4(mtxTranslation, mtxRotation), mtxScale);
    };
    Matrix4x4.Translation = function (tr) {
        var re = new Matrix4x4();
        re.m00 = 1;
        re.m01 = 0;
        re.m02 = 0;
        re.m03 = tr.x;
        re.m10 = 0;
        re.m11 = 1;
        re.m12 = 0;
        re.m13 = tr.y;
        re.m20 = 0;
        re.m21 = 0;
        re.m22 = 1;
        re.m23 = tr.z;
        re.m30 = 0;
        re.m31 = 0;
        re.m32 = 0;
        re.m33 = 1;
        return re;
    };
    Matrix4x4.RotationFromEulerX = function (r) {
        var re = new Matrix4x4();
        var cos = Math.cos(r);
        var sin = Math.sin(r);
        re.m00 = 1;
        re.m01 = 0;
        re.m02 = 0;
        re.m03 = 0;
        re.m10 = 0;
        re.m11 = cos;
        re.m12 = -sin;
        re.m13 = 0;
        re.m20 = 0;
        re.m21 = sin;
        re.m22 = cos;
        re.m23 = 0;
        re.m30 = 0;
        re.m31 = 0;
        re.m32 = 0;
        re.m33 = 1;
        return re;
    };
    Matrix4x4.RotationFromEulerY = function (r) {
        var re = new Matrix4x4();
        var cos = Math.cos(r);
        var sin = Math.sin(r);
        re.m00 = cos;
        re.m01 = 0;
        re.m02 = sin;
        re.m03 = 0;
        re.m10 = 0;
        re.m11 = 1;
        re.m12 = 0;
        re.m13 = 0;
        re.m20 = -sin;
        re.m21 = 0;
        re.m22 = cos;
        re.m23 = 0;
        re.m30 = 0;
        re.m31 = 0;
        re.m32 = 0;
        re.m33 = 1;
        return re;
    };
    Matrix4x4.RotationFromEulerZ = function (r) {
        var re = new Matrix4x4();
        var cos = Math.cos(r);
        var sin = Math.sin(r);
        re.m00 = cos;
        re.m01 = -sin;
        re.m02 = 0;
        re.m03 = 0;
        re.m10 = sin;
        re.m11 = cos;
        re.m12 = 0;
        re.m13 = 0;
        re.m20 = 0;
        re.m21 = 0;
        re.m22 = 1;
        re.m23 = 0;
        re.m30 = 0;
        re.m31 = 0;
        re.m32 = 0;
        re.m33 = 1;
        return re;
    };
    //需要优化
    Matrix4x4.RotationFromEuler = function (r) {
        var mtxRotateX = Matrix4x4.RotationFromEulerX(r.x);
        var mtxRotateY = Matrix4x4.RotationFromEulerY(r.y);
        var mtxRotateZ = Matrix4x4.RotationFromEulerZ(r.z);
        return Matrix4x4.MultiplyMatrix4x4(mtxRotateX, Matrix4x4.MultiplyMatrix4x4(mtxRotateZ, mtxRotateY));
    };
    //TODO
    Matrix4x4.RotationFromQuaternion = function (q) {
        return Matrix4x4.identity;
    };
    Matrix4x4.Scale = function (s) {
        var re = new Matrix4x4();
        re.m00 = s.x;
        re.m01 = 0;
        re.m02 = 0;
        re.m03 = 0;
        re.m10 = 0;
        re.m11 = s.y;
        re.m12 = 0;
        re.m13 = 0;
        re.m20 = 0;
        re.m21 = 0;
        re.m22 = s.z;
        re.m23 = 0;
        re.m30 = 0;
        re.m31 = 0;
        re.m32 = 0;
        re.m33 = 1;
        return re;
    };
    Matrix4x4.Perspective = function (fov, aspect, zNear, zFar) {
        var halfAngle = fov * Math.PI / 180 / 2;
        var cot = 1 / Math.tan(halfAngle);
        var re = new Matrix4x4();
        re.m00 = cot / aspect;
        re.m01 = 0;
        re.m02 = 0;
        re.m03 = 0;
        re.m10 = 0;
        re.m11 = cot;
        re.m12 = 0;
        re.m13 = 0;
        re.m20 = 0;
        re.m21 = 0;
        re.m22 = (zFar + zNear) / (zFar - zNear);
        re.m23 = -zFar * zNear / (zFar - zNear);
        re.m30 = 0;
        re.m31 = 0;
        re.m32 = 1;
        re.m33 = 1;
        return re;
    };
    Matrix4x4.Ortho = function (left, right, bottom, top, zNear, zFar) {
        var re = new Matrix4x4();
        re.m00 = 2 / (right - left);
        re.m01 = 0;
        re.m02 = 0;
        re.m03 = -(right + left) / (right - left);
        re.m10 = 0;
        re.m11 = 2 / (top - bottom);
        re.m12 = 0;
        re.m13 = -(top + bottom) / (top - bottom);
        re.m20 = 0;
        re.m21 = 0;
        re.m22 = 2 / (zFar - zNear);
        re.m23 = -(zFar + zNear) / (zFar - zNear);
        re.m30 = 0;
        re.m31 = 0;
        re.m32 = 0;
        re.m33 = 1;
        return re;
    };
    Matrix4x4.LookAt = function (eye, target, top) {
        var look = Vector3.Normalize(Vector3.Subtract(target, eye));
        var right = Vector3.Normalize(Vector3.Cross(top, look));
        var up = Vector3.Normalize(Vector3.Cross(look, right));
        var re = new Matrix4x4();
        re.m00 = right.x;
        re.m01 = right.y;
        re.m02 = right.z;
        re.m03 = -Vector3.Dot(right, eye);
        re.m10 = up.x;
        re.m11 = up.y;
        re.m12 = up.z;
        re.m13 = -Vector3.Dot(up, eye);
        re.m20 = look.x;
        re.m21 = look.y;
        re.m22 = look.z;
        re.m23 = -Vector3.Dot(look, eye);
        re.m30 = 0;
        re.m31 = 0;
        re.m32 = 0;
        re.m33 = 1;
        return re;
    };
    return Matrix4x4;
})();
/**
 * Mesh
 */
var Mesh = (function () {
    function Mesh() {
    }
    Mesh.CreateBox = function () {
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
    };
    return Mesh;
})();
/**
 * Material
 */
var Material = (function () {
    function Material(gl) {
        this._textures = {};
        this._gl = gl;
    }
    Material.prototype.Register = function (name, texture) {
        this._textures[name] = texture;
    };
    Material.prototype.UseTextures = function () {
        var gl = this._gl;
        var index = 0;
        for (var textureName in this._textures) {
            if (this._textures.hasOwnProperty(textureName)) {
                var texture = this._textures[textureName];
                gl.activeTexture(gl.TEXTURE0 + index);
                gl.bindTexture(gl.TEXTURE_2D, texture.texture);
                gl.uniform1i(this.GetUniformLocation(textureName), index);
            }
        }
    };
    Material.prototype.Load = function (vs, fs) {
        this._program = this.CreateProgram(vs, fs);
    };
    Material.prototype.Unload = function () {
    };
    Material.prototype.Use = function () {
        this._gl.useProgram(this._program);
    };
    Material.prototype.GetAttribLocation = function (name) {
        var re = this._gl.getAttribLocation(this._program, name);
        this._gl.enableVertexAttribArray(re);
        return re;
    };
    Material.prototype.GetUniformLocation = function (name) {
        var re = this._gl.getUniformLocation(this._program, name);
        return re;
    };
    Material.prototype.SetUniformMatrix4fv = function (name, mtx) {
        var uniformLocation = this.GetUniformLocation(name);
        this._gl.uniformMatrix4fv(uniformLocation, false, mtx.ToFloat32Array());
    };
    Material.prototype.SetUniform4f = function (name, x, y, z, w) {
        var uniformLocation = this.GetUniformLocation(name);
        this._gl.uniform4f(uniformLocation, x, y, z, w);
    };
    Material.prototype.CreateVertexShader = function (str) {
        var shader = this._gl.createShader(this._gl.VERTEX_SHADER);
        if (this.CompileShader(shader, str)) {
            return shader;
        }
        else {
            return null;
        }
    };
    Material.prototype.CreateFragmentShader = function (str) {
        var shader = this._gl.createShader(this._gl.FRAGMENT_SHADER);
        if (this.CompileShader(shader, str)) {
            return shader;
        }
        else {
            return null;
        }
    };
    Material.prototype.CompileShader = function (shader, str) {
        this._gl.shaderSource(shader, str);
        this._gl.compileShader(shader);
        if (!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {
            alert(this._gl.getShaderInfoLog(shader));
            return false;
        }
        return true;
    };
    Material.prototype.CreateProgram = function (vs, fs) {
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
    };
    return Material;
})();
/**
 * MeshRender
 */
var MeshRender = (function () {
    function MeshRender(gl) {
        this._gl = gl;
    }
    MeshRender.prototype.LoadMesh = function () {
        this._verticesBuff = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._verticesBuff);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, Utils.ConvertVector3Array2Float32Array(this.mesh.vertices), this._gl.STATIC_DRAW);
        if (this.mesh.normals) {
            this._normalsBuff = this._gl.createBuffer();
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._normalsBuff);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, Utils.ConvertVector3Array2Float32Array(this.mesh.normals), this._gl.STATIC_DRAW);
        }
        if (this.mesh.uv) {
            this._uv0Buff = this._gl.createBuffer();
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._uv0Buff);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, Utils.ConvertVector2Array2Float32Array(this.mesh.uv), this._gl.STATIC_DRAW);
        }
        this._trianglesBuff = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._trianglesBuff);
        this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, Utils.ConvertNumberArray2Uint16Array(this.mesh.triangles), this._gl.STATIC_DRAW);
    };
    MeshRender.prototype.Draw = function () {
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._verticesBuff);
        this._gl.vertexAttribPointer(this.material.GetAttribLocation("atbPosition"), 3, this._gl.FLOAT, false, 0, 0);
        if (this._normalsBuff) {
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._normalsBuff);
            this._gl.vertexAttribPointer(this.material.GetAttribLocation("atbNormal"), 3, this._gl.FLOAT, false, 0, 0);
        }
        if (this._uv0Buff) {
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._uv0Buff);
            this._gl.vertexAttribPointer(this.material.GetAttribLocation("atbUV"), 2, this._gl.FLOAT, false, 0, 0);
        }
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._trianglesBuff);
        this.material.SetUniformMatrix4fv("uModelMatrix", this.transform.GetModelMatrix());
        this.material.SetUniformMatrix4fv("uViewMatrix", this.camera.GetViewMatrix());
        this.material.SetUniformMatrix4fv("uProjectMatrix", this.camera.GetProjectMatrix());
        this.material.SetUniformMatrix4fv("uNormalMatrix", this.transform.GetNormalMatrix());
        this.material.UseTextures();
        this._gl.drawElements(this._gl.TRIANGLES, this.mesh.triangles.length, this._gl.UNSIGNED_SHORT, 0);
    };
    return MeshRender;
})();
/**
 * WireFrameMeshRender
 */
var WireFrameMeshRender = (function () {
    function WireFrameMeshRender(gl) {
        this._gl = gl;
    }
    WireFrameMeshRender.prototype.ConvertTriangles2Lines = function (triangles) {
        var lines = [];
        var trianglesCount = Math.floor(triangles.length / 3);
        for (var i = 0; i < trianglesCount; ++i) {
            lines.push(triangles[i * 3]);
            lines.push(triangles[i * 3 + 1]);
            lines.push(triangles[i * 3 + 1]);
            lines.push(triangles[i * 3 + 2]);
            lines.push(triangles[i * 3 + 2]);
            lines.push(triangles[i * 3]);
        }
        return lines;
    };
    WireFrameMeshRender.prototype.LoadMesh = function () {
        this._verticesBuff = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._verticesBuff);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, Utils.ConvertVector3Array2Float32Array(this.mesh.vertices), this._gl.STATIC_DRAW);
        if (this.mesh.normals) {
            this._normalsBuff = this._gl.createBuffer();
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._normalsBuff);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, Utils.ConvertVector3Array2Float32Array(this.mesh.normals), this._gl.STATIC_DRAW);
        }
        if (this.mesh.uv) {
            this._uv0Buff = this._gl.createBuffer();
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._uv0Buff);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, Utils.ConvertVector2Array2Float32Array(this.mesh.uv), this._gl.STATIC_DRAW);
        }
        this._trianglesBuff = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._trianglesBuff);
        this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, Utils.ConvertNumberArray2Uint16Array(this.ConvertTriangles2Lines(this.mesh.triangles)), this._gl.STATIC_DRAW);
    };
    WireFrameMeshRender.prototype.Draw = function () {
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._verticesBuff);
        this._gl.vertexAttribPointer(this.material.GetAttribLocation("atbPosition"), 3, this._gl.FLOAT, false, 0, 0);
        if (this._normalsBuff) {
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._normalsBuff);
            this._gl.vertexAttribPointer(this.material.GetAttribLocation("atbNormal"), 3, this._gl.FLOAT, false, 0, 0);
        }
        if (this._uv0Buff) {
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._uv0Buff);
            this._gl.vertexAttribPointer(this.material.GetAttribLocation("atbUV"), 2, this._gl.FLOAT, false, 0, 0);
        }
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._trianglesBuff);
        this.material.SetUniformMatrix4fv("uModelMatrix", this.transform.GetModelMatrix());
        this.material.SetUniformMatrix4fv("uViewMatrix", this.camera.GetViewMatrix());
        this.material.SetUniformMatrix4fv("uProjectMatrix", this.camera.GetProjectMatrix());
        this.material.SetUniformMatrix4fv("uNormalMatrix", this.transform.GetNormalMatrix());
        this.material.UseTextures();
        this._gl.drawElements(this._gl.LINES, this.mesh.triangles.length * 2, this._gl.UNSIGNED_SHORT, 0);
    };
    return WireFrameMeshRender;
})();
/**
 * Color
 */
var Color = (function () {
    function Color(r, g, b, a) {
        if (r === void 0) { r = 0; }
        if (g === void 0) { g = 0; }
        if (b === void 0) { b = 0; }
        if (a === void 0) { a = 0; }
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    return Color;
})();
/**
 * Utils
 */
var Utils = (function () {
    function Utils() {
    }
    Utils.ConvertVector3Array2Float32Array = function (vertices) {
        var re = new Float32Array(vertices.length * 3);
        for (var i = 0; i < vertices.length; ++i) {
            re[i * 3 + 0] = vertices[i].x;
            re[i * 3 + 1] = vertices[i].y;
            re[i * 3 + 2] = vertices[i].z;
        }
        return re;
    };
    Utils.ConvertVector2Array2Float32Array = function (vertices) {
        var re = new Float32Array(vertices.length * 2);
        for (var i = 0; i < vertices.length; ++i) {
            re[i * 2 + 0] = vertices[i].x;
            re[i * 2 + 1] = vertices[i].y;
        }
        return re;
    };
    Utils.ConvertNumberArray2Uint16Array = function (nums) {
        var re = new Uint16Array(nums.length);
        for (var i = 0; i < nums.length; ++i) {
            re[i] = nums[i];
        }
        return re;
    };
    return Utils;
})();
/**
 * Transform
 */
var Transform = (function () {
    function Transform() {
        this.parent = null;
        this.position = Vector3.zero;
        this.scale = Vector3.one;
        this.rotation = Vector3.zero;
    }
    Transform.prototype.GetModelMatrix = function () {
        return Matrix4x4.TRS(this.position, this.rotation, this.scale);
    };
    Transform.prototype.GetNormalMatrix = function () {
        var reversScale = new Vector3(1 / this.scale.x, 1 / this.scale.y, 1 / this.scale.z);
        reversScale.Normalize();
        return Matrix4x4.MultiplyMatrix4x4(Matrix4x4.RotationFromEuler(this.rotation), Matrix4x4.Scale(reversScale));
    };
    return Transform;
})();
/**
 * Texture
 */
var Texture = (function () {
    function Texture(gl) {
        this._gl = gl;
    }
    Object.defineProperty(Texture.prototype, "texture", {
        get: function () {
            return this._texture;
        },
        enumerable: true,
        configurable: true
    });
    Texture.prototype.Load = function (image) {
        var gl = this._gl;
        this._texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    return Texture;
})();
var ProjectMode;
(function (ProjectMode) {
    ProjectMode[ProjectMode["Perspective"] = 0] = "Perspective";
    ProjectMode[ProjectMode["Ortho"] = 1] = "Ortho";
})(ProjectMode || (ProjectMode = {}));
/**
 * Camera
 */
var Camera = (function () {
    function Camera() {
    }
    Camera.prototype.GetViewMatrix = function () {
        return Matrix4x4.LookAt(this.eye, this.target, this.top);
    };
    Camera.prototype.GetProjectMatrix = function () {
        if (this.mode == ProjectMode.Perspective) {
            return Matrix4x4.Perspective(this.fov, this.aspect, this.near, this.far);
        }
        else {
            var halfHeight = this.orthoSize / 2;
            var halfWidth = halfHeight * this.aspect;
            return Matrix4x4.Ortho(-halfWidth, halfWidth, -halfHeight, halfHeight, this.near, this.far);
        }
    };
    return Camera;
})();
/*
 * Context
 */
var Context = (function () {
    function Context() {
    }
    Context.InitGL = function (canvas) {
        Context.canvas = canvas;
        try {
            var gl;
            gl = canvas.getContext("experimental-webgl");
            gl.viewport(0, 0, canvas.width, canvas.height);
            //TestClear
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.enable(gl.DEPTH_TEST);
            Context.gl = gl;
        }
        catch (e) { }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    };
    return Context;
})();
/**
 * FileLoader
 */
var FileLoader = (function () {
    function FileLoader() {
    }
    FileLoader.prototype.Load = function (url, callback) {
        var request = new XMLHttpRequest();
        request.responseType = "text";
        request.onload = function () {
            callback(request.responseText);
        };
        request.open("GET", url, true);
        request.send(null);
    };
    return FileLoader;
})();
/**
 * ObjectParser
 */
/// <reference path="../render/Render.ts" />
var ObjectParser = (function () {
    function ObjectParser() {
        //Cache
        this.vertexCache = [];
        this.uvCache = [];
        this.normalCache = [];
        //Mesh Element
        this.vertices = [];
        this.uvs = [];
        this.normals = [];
        this.triangles = [];
    }
    //Ignore First Word
    ObjectParser.prototype.ParseVector3 = function (words) {
        if (words.length == 4) {
            var x = parseFloat(words[1]);
            var y = parseFloat(words[2]);
            var z = parseFloat(words[3]);
            return new Vector3(x, y, z);
        }
        return null;
    };
    //Ignore First Word
    ObjectParser.prototype.ParseVector2 = function (words) {
        if (words.length == 3) {
            var x = parseFloat(words[1]);
            var y = parseFloat(words[2]);
            return new Vector2(x, y);
        }
        return null;
    };
    //解析Face的一个元素
    ObjectParser.prototype.ParseElement = function (word) {
        var words = word.split("/");
        var posIndex = parseInt(words[0]);
        if (posIndex < 1 || posIndex > this.vertexCache.length) {
            console.log("Error!");
        }
        this.vertices.push(this.vertexCache[posIndex - 1]);
        //uv
        if (words.length >= 2 && words[1].length > 0) {
            var uvIndex = parseInt(words[1]);
            this.uvs.push(this.uvCache[uvIndex - 1]);
        }
        //normal
        if (words.length >= 3 && words[2].length > 0) {
            var normalIndex = parseInt(words[2]);
            this.normals.push(this.normalCache[normalIndex - 1]);
        }
    };
    //Ignore First Word
    ObjectParser.prototype.ParseFace = function (words) {
        var vertexCount = this.vertices.length;
        if (words.length == 4) {
            for (var i = 1; i < words.length; ++i) {
                this.ParseElement(words[i]);
            }
            this.triangles.push(vertexCount, vertexCount + 1, vertexCount + 2);
        }
        else if (words.length == 5) {
            for (var i = 1; i < words.length; ++i) {
                this.ParseElement(words[i]);
            }
            this.triangles.push(vertexCount, vertexCount + 1, vertexCount + 2, vertexCount, vertexCount + 2, vertexCount + 3);
        }
    };
    ObjectParser.prototype.ParseLines = function (fileContent) {
        var lines = fileContent.split("\n");
        for (var i = 0; i < lines.length; i++) {
            var element = lines[i];
            if (element.charAt(0) == "#") {
                continue;
            }
            var words = element.split(" ");
            switch (words[0]) {
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
                default: break;
            }
        }
    };
    ObjectParser.prototype.Parse = function (fileContent) {
        this.ParseLines(fileContent);
        var mesh = new Mesh();
        mesh.vertices = this.vertices;
        mesh.uv = this.uvs;
        mesh.triangles = this.triangles;
        mesh.normals = this.normals;
        return mesh;
    };
    return ObjectParser;
})();
/**
 * MultiEventProxy
 */
var MultiEventProxy = (function () {
    function MultiEventProxy(events, allReadyCallback) {
        this.events = events;
        this.allReadyCallback = allReadyCallback;
        this.results = {};
    }
    MultiEventProxy.prototype.Ready = function (event, result) {
        this.results[event] = result;
        this.Check();
    };
    MultiEventProxy.prototype.Check = function () {
        for (var i = 0; i < this.events.length; i++) {
            var event = this.events[i];
            if (!this.results.hasOwnProperty(event)) {
                return;
            }
        }
        this.allReadyCallback(this.results);
    };
    return MultiEventProxy;
})();
