uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;

out vec4 fragColor;

// based on https://www.shadertoy.com/view/4lK3Rc

#define MAX_STEPS 300
#define SURF_DIST 0.0000
#define MAX_DIST 2.

vec2 getDistance(vec3 q) {

    q *= 100.;

    vec2 res = vec2(q.y , 2.);

    float r = 11. + 3. * (0.5 + 0.5 * sin(iTime * 10. + q.y * 0.1));
    vec3 center = vec3(0., r, 0.);

    q.y -= r;

    float x = abs(q.x);
    q.z = q.z * (2. - q.y / 15.);
    q.y = 4. + 1.2 * q.y - x * (20. - x) / 15.;

    
    // sphere
    float d = length(q) - r;
    d /= 2.1;

    if (d < res.x) res = vec2(d, 1.);
    res.x *= 0.01;
    return res;
}

vec3 getRay(in vec2 p, in vec3 ro) {
    float an = 0.1*iTime;

    vec3 ta = vec3(0.0,0.15,0.0);

    vec3 ww = normalize( ta - ro );

    vec3 uu = normalize( cross(ww,vec3(0.0,1.0,0.0) ) );

    vec3 vv = normalize( cross(uu,ww));
    mat3 camera = mat3(uu, vv, ww);
   	return normalize(camera * vec3(p, 1.7));
}

vec2 rayMarching(vec3 ro, vec3 rd) {

  vec2 res = vec2(0.0);
  float t = 0.2;
  for( int i=0; i< MAX_STEPS; i++ ) {
      vec2 h = getDistance( ro+rd*t );
      if( (h.x<SURF_DIST) || (t>MAX_DIST) ) break;
      t += h.x;
      res = vec2( t, h.y );
  }

  if( t>MAX_DIST ) res=vec2(-1.0);
	return res;
}

vec3 getNormal( in vec3 pos )
{
    vec2 eps = vec2(0.005,0.);
	return normalize( vec3(
          getDistance(pos+eps.xyy).x - getDistance(pos-eps.xyy).x,
          getDistance(pos+eps.yxy).x - getDistance(pos-eps.yxy).x,
          getDistance(pos+eps.yyx).x - getDistance(pos-eps.yyx).x ) );
}

float getLight(vec3 pos, vec3 lightPos) {
  vec3 l = normalize(lightPos - pos);
  vec3 n = getNormal(pos);
  return clamp(dot(l, n), 0., 1.);
}

float getShadow(vec3 pos, vec3 lightPos) {
  float res = 1.;
  float t = 0.001;

  vec3 rd = normalize(lightPos - pos);
  for( int i = 0; i < 32; i ++ ) {
      float h = getDistance(pos + rd * t).x;
      res = min( res, 10.0*h/t );
      t += h;

      if( res<SURF_DIST || t>MAX_DIST ) break;
  }

	return res;
}


void main() {
    vec2 fragCoord = gl_FragCoord.xy;
  vec2 p = (2.0*fragCoord.xy-iResolution.xy)/iResolution.y;
  vec3 col = vec3(1.0,0.9,0.7) * pow(p.y + 1., 0.2)  ;


  float an = iTime * 1.5;
  float len = 0.8;
  vec3 ro = vec3(len * sin(an),0.25,len * cos(an));

  vec3 rd = getRay(p, ro);

  vec2 res = rayMarching(ro, rd);

  vec3 pos = ro + rd * res.x;
  vec3 lightPos = vec3(0., 5., 6.);

  if (res.y == 1.) {
    col = vec3(0.9,0.02,0.01);

    col *= getLight(pos, lightPos) ;
  } else if (res.y == 2.) {
    col = vec3(1.0,0.9,0.7);
    col *= getShadow(pos, lightPos);
  }

  fragColor = vec4(col, 1.);
}