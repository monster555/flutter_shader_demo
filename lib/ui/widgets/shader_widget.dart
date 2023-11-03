import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:vector_math/vector_math_64.dart';

part 'shader_painter.dart';

/// A widget for displaying a custom shader effect.
///
/// The [ShaderWidget] allows you to display a custom shader effect with options
/// for specifying the shader name, width, and height. It loads the specified
/// fragment shader and animates it based on the elapsed time.
class ShaderWidget extends StatefulWidget {
  const ShaderWidget({
    super.key,
    required this.shaderName,
    this.width,
    this.height,
  });

  /// The name of the fragment shader to be applied.
  final String shaderName;

  /// The width of the shader view. If not specified, it defaults to the width
  /// of the parent widget.
  final double? width;

  /// The height of the shader view. If not specified, it defaults to the height
  /// of the parent widget.
  final double? height;

  @override
  State<ShaderWidget> createState() => _ShaderWidgetState();
}

/// The state for the [ShaderWidget] widget.
///
/// This state class manages the animation controller for the shader and
/// calculates the elapsed time since the widget's initialization.
class _ShaderWidgetState extends State<ShaderWidget>
    with SingleTickerProviderStateMixin {
  /// The animation controller responsible for animating the shader.
  late final AnimationController _controller = AnimationController(
    duration: const Duration(milliseconds: 300),
    vsync: this,
  )..repeat();

  @override
  void dispose() {
    // Dispose the animation controller when the widget is disposed.
    _controller.dispose();
    super.dispose();
  }

  /// The time when the widget was initialized.
  int _startTime = 0;

  /// Returns the elapsed time since the widget was initialized.
  double get _elapsedTimeInSeconds =>
      (DateTime.now().millisecondsSinceEpoch - _startTime) / 1000;

  /// Builds the widget tree for the [ShaderWidget].
  @override
  Widget build(BuildContext context) {
    // Initialize the start time when the widget is first built.
    _startTime = DateTime.now().millisecondsSinceEpoch;

    // Use the specified width and height if provided, otherwise use the
    // MediaQuery size.
    final width = widget.width ?? MediaQuery.sizeOf(context).width;
    final height = widget.height ?? MediaQuery.sizeOf(context).height;
    return SizedBox(
      width: width,
      height: height,
      child: FutureBuilder<FragmentShader>(
        // Load the shader from the assets folder.
        future: _loadShader(widget.shaderName),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            // Get the shader from the snapshot.
            final shader = snapshot.data!;

            // Set shader parameters to adjust the rendering.
            shader
              ..setFloat(1, width) // Set the shader's width parameter.
              ..setFloat(2, height); // Set the shader's height parameter.

            return AnimatedBuilder(
              animation: _controller,
              builder: (context, _) {
                // Calculate and set the elapsed time for animation in the shader.
                shader.setFloat(0, _elapsedTimeInSeconds);
                return CustomPaint(
                  painter: ShaderPainter(shader),
                );
              },
            );
          } else {
            // Display a progress indicator while the shader is loading.
            return const CircularProgressIndicator();
          }
        },
      ),
    );
  }
}

/// Loads and returns a [FragmentShader] from an asset using the specified [shaderName].
///
/// This method loads a shader program from the assets folder with the given [shaderName]
/// and returns the corresponding [FragmentShader].
///
/// Parameters:
///
/// - [shaderName] The name of the shader file to load.
Future<FragmentShader> _loadShader(String shaderName) async {
  FragmentProgram program =
      await FragmentProgram.fromAsset('shaders/$shaderName');
  final shader = program.fragmentShader();

  return shader;
}
