import 'package:flutter/material.dart';
import 'package:flutter_shader_demo/ui/shaders_list.dart';

/// The entry point for the Flutter Shaders Demo application.
void main() => runApp(const MyApp());

/// The main application widget that configures the app's theme and initial route.
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Shader Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const ShadersList(),
    );
  }
}
