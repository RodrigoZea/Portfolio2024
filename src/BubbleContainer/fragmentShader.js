const fragmentShader = ` 
    varying vec3 vPositionW;
    varying vec3 vNormalW;
    uniform vec3 fresnelColor;
    void main() {
        float fresnelTerm = ( 1.0 - -min(dot(vPositionW, normalize(vNormalW) ), 0.0) );    
        gl_FragColor = vec4(fresnelColor,1.0) * vec4(fresnelTerm);
    }
`;

export default fragmentShader;