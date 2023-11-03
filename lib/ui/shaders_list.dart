import 'package:flutter/material.dart';
import 'package:flutter_shader_demo/ui/widgets/shader_button.dart';

/// This widget is used to display a list of [ShaderButton] for the Flutter Shaders Demo.
class ShadersList extends StatelessWidget {
  /// Creates a [ShadersList] widget.
  const ShadersList({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Flutter Shaders Demo',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(height: 8),
              const Wrap(
                children: [
                  ShaderButton(
                    title: 'Galaxy',
                    shaderName: 'galaxy.frag',
                  ),
                  ShaderButton(
                    title: 'Fire Heart',
                    shaderName: 'fire_heart.frag',
                  ),
                  ShaderButton(
                    title: 'Fire',
                    shaderName: 'fire.frag',
                  ),
                  ShaderButton(
                    title: 'Heartbeat',
                    shaderName: 'heartbeat.frag',
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
