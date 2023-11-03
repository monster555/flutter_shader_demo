import 'package:flutter/material.dart';
import 'package:flutter_shader_demo/ui/widgets/shader_page.dart';
import 'package:flutter_shader_demo/ui/widgets/shader_preview.dart';

/// A button widget that opens a [ShaderPage] when tapped to display a shader effect.
///
/// The [ShaderButton] widget is used to create a button with a shader preview. When tapped, it navigates to a full-screen [ShaderPage]
/// that displays the specified shader effect.
///
/// Parameters:
///
/// - [title] The title of the button.
/// - [shaderName] The name of the shader effect to display when the button is tapped.
class ShaderButton extends StatelessWidget {
  /// Creates a [ShaderButton] widget.
  const ShaderButton({
    super.key,
    required this.title,
    required this.shaderName,
  });

  /// The title of the button.
  final String title;

  /// The name of the shader effect to display when the button is tapped.
  final String shaderName;

  /// The border radius for the button.
  BorderRadius get _borderRadius => BorderRadius.circular(16);

  /// The border radius for the inner shader preview.
  BorderRadius get _innerBorderRadius => BorderRadius.circular(8);

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 12,
      shape: RoundedRectangleBorder(borderRadius: _borderRadius),
      child: InkWell(
        borderRadius: _borderRadius,
        onTap: () => Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => ShaderPage(shaderName: shaderName),
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: [
              ClipRRect(
                borderRadius: _innerBorderRadius,
                child: ShaderPreview(
                  shaderName: shaderName,
                ),
              ),
              const SizedBox(
                height: 8,
              ),
              Text(
                title,
                style: Theme.of(context).textTheme.titleMedium,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
