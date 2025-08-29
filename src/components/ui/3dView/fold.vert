// fold.vert
varying vec2 vUv;
uniform float uAmount;

void main() {
  vUv = uv;
  vec3 pos = position;

  // Folding effect
  float fold = sin(pos.x * 5.0) * uAmount;
  pos.z += fold;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
