uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;

out vec4 fragColor;

// Heart of Fire.
//
// Inspired by https://www.shadertoy.com/view/tslSDX
//
// The hash/noise functions are taken from iq (maybe not directly).

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

#define PI 3.14159265359
#define PI2 6.28318530718


float hash(in float s) {
  return fract(sin(s*43758.5453123));
}

float hash(in vec2 st) {
return fract(sin(dot(st.xy,
vec2(12.9898,78.233)))
* 43758.5453123);
}

float hash(in vec3 p)
{
return fract(sin(dot(p,
vec3(12.6547, 765.3648, 78.653)))*43749.535);
}

float noise3(in vec3 p)
{
vec3 pi = floor(p);
vec3 pf = fract(p);

pf = pf*pf*(3.-2.*pf);

float a = hash(pi + vec3(0., 0., 0.));
float b = hash(pi + vec3(1., 0., 0.));
float c = hash(pi + vec3(0., 1., 0.));
float d = hash(pi + vec3(1., 1., 0.));

float e = hash(pi + vec3(0., 0., 1.));
float f = hash(pi + vec3(1., 0., 1.));
float g = hash(pi + vec3(0., 1., 1.));
float h = hash(pi + vec3(1., 1., 1.));

return mix(mix(mix(a,b,pf.x),mix(c,d,pf.x),pf.y),
mix(mix(e,f,pf.x),mix(g,h,pf.x),pf.y), pf.z);
}

float noise3(in vec3 p, in vec3 m)
{
vec3 pi = floor(p);
vec3 pf = fract(p);

pf = pf*pf*(3.-2.*pf);

float a = hash(mod(pi + vec3(0., 0., 0.),m));
float b = hash(mod(pi + vec3(1., 0., 0.),m));
float c = hash(mod(pi + vec3(0., 1., 0.),m));
float d = hash(mod(pi + vec3(1., 1., 0.),m));

float e = hash(mod(pi + vec3(0., 0., 1.),m));
float f = hash(mod(pi + vec3(1., 0., 1.),m));
float g = hash(mod(pi + vec3(0., 1., 1.),m));
float h = hash(mod(pi + vec3(1., 1., 1.),m));

return mix(mix(mix(a,b,pf.x),mix(c,d,pf.x),pf.y),
mix(mix(e,f,pf.x),mix(g,h,pf.x),pf.y), pf.z);
}


float noise (in vec2 st) {
vec2 i = floor(st);
vec2 f = fract(st);

// Four corners in 2D of a tile
float a = hash(i);
float b = hash(i + vec2(1.0, 0.0));
float c = hash(i + vec2(0.0, 1.0));
float d = hash(i + vec2(1.0, 1.0));

// Smooth Interpolation

// Cubic Hermine Curve. Same as SmoothStep()
vec2 u = f*f*(3.0-2.0*f);

// Mix 4 coorners porcentages
return mix(a, b, u.x) +
(c - a)* u.y * (1.0 - u.x) +
(d - b) * u.x * u.y;
}

float noise (in vec2 st, in vec2 m) {
vec2 i = floor(st);
vec2 f = fract(st);

// Four corners in 2D of a tile
float a = hash(mod(i,m));
float b = hash(mod(i + vec2(1.0, 0.0),m));
float c = hash(mod(i + vec2(0.0, 1.0),m));
float d = hash(mod(i + vec2(1.0, 1.0),m));

// Smooth Interpolation

// Cubic Hermine Curve. Same as SmoothStep()
vec2 u = f*f*(3.0-2.0*f);

// Mix 4 coorners porcentages
return mix(a, b, u.x) +
(c - a)* u.y * (1.0 - u.x) +
(d - b) * u.x * u.y;
}



float noise (in float st,in float m) {
float i = floor(st);
float f = fract(st);

// Four corners in 2D of a tile
float a = hash(mod(i,m));
float b = hash(mod(i + 1.,m));

// Smooth Interpolation

// Cubic Hermine Curve. Same as SmoothStep()
float u = f*f*(3.0-2.0*f);

// Mix 2 coorners porcentages
return mix(a, b, u);
}

float noise (in float st) {
float i = floor(st);
float f = fract(st);

// Four corners in 2D of a tile
float a = hash(i);
float b = hash(i + 1.);

// Smooth Interpolation

// Cubic Hermine Curve. Same as SmoothStep()
float u = f*f*(3.0-2.0*f);

// Mix 2 coorners porcentages
return mix(a, b, u);
}

float fbm(vec3 p) {

  float f = 0.;
  float ampl = 0.5;
  float freq = 1.;
  float off = 0.;

  for (int i = 0; i < 12; i++) {
    f += ampl*noise3(p*freq + off);
    ampl*= 0.5;
    freq *= 2.;
    off += 12.274739;
  }

  return f;
}


float fbm(vec3 p, in vec3 m) {

  float f = 0.;
  float ampl = 0.5;
  float freq = 1.;
  float off = 0.;

  for (int i = 0; i < 12; i++) {
    f += ampl*noise3(p*freq + off,m);
    ampl*= 0.5;
    freq *= 2.;
    off += 12.274739;
  }

  return f;
}

float fbm(vec2 p) {

  float f = 0.;
  float ampl = 0.5;
  float freq = 1.;
  float off = 0.;

  for (int i = 0; i < 12; i++) {
    f += ampl*noise(p*freq + off);
    ampl*= 0.5;
    freq *= 2.;
    off += 123.274739;
  }

  return f;
}

float fbm(vec2 p,in vec2 m) {

  float f = 0.;
  float ampl = 0.5;
  float freq = 1.;
  float off = 0.;

  for (int i = 0; i < 12; i++) {
    f += ampl*noise(p*freq + off,m);
    ampl*= 0.5;
    freq *= 2.;
    off += 123.274739;
  }

  return f;
}


vec3 flameheart(in vec2 cnt) {

  vec2 cnts = cnt;
  float TTime =iTime;
  cnts.y -= (0.5+0.1*sin(TTime*0.1)+0.05*sin(TTime*0.23))*abs(cnt.x);
  vec2 ra = vec2(length(cnt),atan(cnt.y,cnt.x)/PI2 + 0.5);
  vec2 ras = vec2(length(cnts),atan(cnts.y,cnts.x)/PI2 + 0.5);
  vec2 rads;
  float f = fbm(cnt);
  float rad = 0.25;
  float tt = 0.1*TTime;

  float flang = ra.y;
  float flow = pow(1.-length(cnts-rad*vec2(cos(tt),sin(tt))),16.);


  vec3 uvt = vec3(cnt*8.,TTime*0.1);
  float f1 = fbm(uvt);
  vec3 rat = vec3(ra.y*32.,ra.x*4.+8.*f1,tt*0.5);

  rads = mix(ra,ras,1.);
  float rr = 4.*flow + pow(1.- abs(rads.x - rad),24.);
  float ff = step(ra.x,cos(ra.y*3.*PI2));
  float ampl = 512.;8.*(0.5-noise(vec2(ra.y*8.,tt),vec2(8.,tt+100.)));//sin(time)*0.03;
  ff = pow(1.-abs(ra.x-rad)+ampl*pow(
   fbm(vec3(ra.y*32.,ra.x*8.,tt*2.),
     vec3(32.,8.,tt*2.+1000.)),8.),.5);

  vec3 uvta = vec3(cnt*8.,rr*ff);
  ff = fbm(uvta)*ff*rr;

  vec3 col = vec3(ff);
  vec3 flame = vec3(0.886,0.34,0.16);
  vec3 blflame = vec3(0.,0.38,0.608);

  col = mix(blflame,flame,1.-pow((rads.x-rad)*(rads.x-rad)/(rad*rad),.5));

  col *= ff;

  return col;
}

void main()
{
	vec2 fragCoord = gl_FragCoord.xy;
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;
    float ratio = iResolution.x / iResolution.y;
    uv.x *= ratio;

    // Flame heart
    vec3 col = flameheart(uv - vec2(0.5*ratio, 0.5));

    // Output to screen
    fragColor = vec4(col,1.0);
}