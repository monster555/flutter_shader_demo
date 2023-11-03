import 'package:flutter/material.dart';
import 'package:flutter_shader_demo/ui/widgets/shader_widget.dart';

/// A page for displaying a shader effect using the [ShaderWidget].
///
/// The [ShaderPage] widget is used to display a shader effect in a full-screen view with a back button in the top-left corner.
///
/// Parameters:
///
/// - [shaderName] The name of the shader to display on this page.
class ShaderPage extends StatefulWidget {
  /// Creates a [ShaderPage] widget.
  const ShaderPage({super.key, required this.shaderName});

  /// The name of the shader to display on this page.
  final String shaderName;

  @override
  State<ShaderPage> createState() => _ShaderPageState();
}

class _ShaderPageState extends State<ShaderPage> with TickerProviderStateMixin {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: <Widget>[
          // A full-screen shader widget.
          ShaderWidget(
            shaderName: widget.shaderName,
          ),
          // A back button in the top-left corner.
          Positioned(
            top: 8,
            left: 8,
            child: DecoratedBox(
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.5),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const BackButton(),
            ),
          ),
        ],
      ),
    );
  }
}
