#图形相关实验

##0.TSRender
使用TypeScript调用WebGL，模仿Unity的API实现简单的游戏渲染引擎。

为什么会选择TypeScript和WebGL，首先是js方便开发和展示，只依赖浏览器，但是我个人不太喜欢没有静态类型检查的开发环境。
其次希望能点亮js这个技能点，了解一下Unity之外的开发思路。

目前差不多完成的类有

* Vector2/Vector3
* Matrix4x4
* Transform
* Camera
* Mesh
* Mateirial
* ObjectParser

Vector,Matrix是纯数学类；  
Mesh持有顶点, 法线, UV  
Material负责载入编译shader，持有shader的导出变量(attribute, uniform)；  
Transform负责建立场景树；  
Camera负责相机相关；  
Render类，统一管理一次DrawCall中用到的对象，并且持有中间变量。

稍微更远一点的未来，在这个框架的基础上希望增加

* dae或fbx模型动画文件解析和载入
* 影子
* GI烘焙

2016-02-28更新状态:

完成了简单的obj文件解析，但是只解析了位置信息，还没试uv和法线。还没有贴图。

2016-04-05更新状态:

有了uv和贴图, 顶点法线和全局方向光. 接下来是法线贴图和切线计算.