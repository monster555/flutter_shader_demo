# Flutter Fragment Shaders Demo
This repository contains a demo application showcasing the integration of fragment shaders in Flutter.



https://github.com/monster555/flutter_shader_demo/assets/32662133/b05fa456-72e7-4381-8a30-114e01b00398



Like this project? Consider supporting its upkeep with a coffee. Your generosity is appreciated! ☕

<a href="https://www.buymeacoffee.com/danicoy" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

## Introduction
Fragment shaders are a type of shader used in 3D graphics for shading pixels. They can be used to create stunning visual effects and manipulate pixels in real-time applications.

## Setup
To use custom shaders in your Flutter project, you need to add them to your pubspec.yaml file. Here’s how you can do it:

- **Create the Shader File**: Write your shader program in a file with a `.frag` extension. This file contains the GLSL code for your custom shader.

- **Add the Shader to `pubspec.yaml`**: In your `pubspec.yaml` file, you need to add a `shaders` section under the `flutter` section. Here, you list all the shader files (with their paths) that you want to include in your project. For example:

```yaml
flutter:
  shaders:
    - shaders/myshader.frag
```

In this example, `myshader.frag` is the shader file located in the `/shaders` directory of your project

- **Create a Custom Painter**: In your Dart code, create a custom painter that extends `CustomPainter`. This custom painter will use the shader when painting.

## Usage
Here are some examples of how to use fragment shaders in your Flutter project:

- **Loading the Shader**: To load a shader into a `FragmentProgram` object at runtime, use the `FragmentProgram.fromAsset` constructor. The asset’s name is the same as the path to the shader given in the `pubspec.yaml` file. The `FragmentProgram` object can then be used to create one or more `FragmentShader` instances.
- **Using the FragmentShade**r: A `FragmentShader` object represents a fragment program along with a particular set of uniforms (configuration parameters). The available uniforms depend on how the shader was defined. In this example, I'm using the `setFloat` method on my `FragmentShader` instance to set these uniforms.

## Resources
For more information on writing and using fragment shaders in Flutter, check out the [Flutter documentation on fragment shaders](https://docs.flutter.dev/ui/design/graphics/fragment-shaders).

## Acknowledgements
The shaders used in this demo were not written by me. They were authored by the following individuals:

- [Galaxy](https://www.shadertoy.com/view/MdXSzS): Authored by [Dave Hoskins](https://www.shadertoy.com/user/Dave_Hoskins)
- [Fire Heart](https://www.shadertoy.com/view/3sSXRt): Authored by [lz](https://www.shadertoy.com/user/lz)
- [Fire](https://www.shadertoy.com/view/4tlSzl): Authored by [Shane](https://www.shadertoy.com/user/Shane)
- [Heartbeat](https://www.shadertoy.com/view/csc3W2): Authored by [mushroom](https://www.shadertoy.com/user/mushroom)

All credit for the shader code goes to them.
