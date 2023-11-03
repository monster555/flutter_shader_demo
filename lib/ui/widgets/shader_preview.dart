import 'package:flutter/material.dart';
import 'package:flutter_shader_demo/ui/widgets/shader_widget.dart';

/// A widget that previews a shader effect using the [ShaderWidget].
///
/// The [ShaderPreview] widget allows you to preview a shader effect by rendering it within a fixed-size square area.
///
/// Parameters:
///
/// - [shaderName] The name of the shader to preview.
class ShaderPreview extends StatelessWidget {
  /// Creates a [ShaderPreview] widget.
  const ShaderPreview({super.key, required this.shaderName});

  /// The name of the shader to preview.
  final String shaderName;

  @override
  Widget build(BuildContext context) {
    return ShaderWidget(
      width: 200,
      height: 200,
      shaderName: shaderName,
    );
  }
}
