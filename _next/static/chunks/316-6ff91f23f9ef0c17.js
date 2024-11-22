"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[316],{2831:function(e,t,n){let i,o;n.d(t,{w:function(){return j}});var a=n(1119),r=n(2265),s=n(1448),l=n(8478);let c=new s.Box3,d=new s.Vector3;class u extends s.InstancedBufferGeometry{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new s.Float32BufferAttribute([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new s.Float32BufferAttribute([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new s.InstancedInterleavedBuffer(t,6,1);return this.setAttribute("instanceStart",new s.InterleavedBufferAttribute(n,3,0)),this.setAttribute("instanceEnd",new s.InterleavedBufferAttribute(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));let i=new s.InstancedInterleavedBuffer(n,2*t,1);return this.setAttribute("instanceColorStart",new s.InterleavedBufferAttribute(i,t,0)),this.setAttribute("instanceColorEnd",new s.InterleavedBufferAttribute(i,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new s.WireframeGeometry(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new s.Box3);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),c.setFromBufferAttribute(t),this.boundingBox.union(c))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new s.Sphere),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let o=0,a=e.count;o<a;o++)d.fromBufferAttribute(e,o),i=Math.max(i,n.distanceToSquared(d)),d.fromBufferAttribute(t,o),i=Math.max(i,n.distanceToSquared(d));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}class p extends s.ShaderMaterial{constructor(e){super({type:"LineMaterial",uniforms:s.UniformsUtils.clone(s.UniformsUtils.merge([s.UniformsLib.common,s.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new s.Vector2(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${parseInt(s.REVISION.replace(/\D+/g,""))>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let f=parseInt(s.REVISION.replace(/\D+/g,""))>=125?"uv1":"uv2",h=new s.Vector4,m=new s.Vector3,v=new s.Vector3,b=new s.Vector4,g=new s.Vector4,y=new s.Vector4,E=new s.Vector3,w=new s.Matrix4,S=new s.Line3,x=new s.Vector3,A=new s.Box3,O=new s.Sphere,L=new s.Vector4;function P(e,t,n){return L.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),L.multiplyScalar(1/L.w),L.x=o/n.width,L.y=o/n.height,L.applyMatrix4(e.projectionMatrixInverse),L.multiplyScalar(1/L.w),Math.abs(Math.max(L.x,L.y))}class M extends s.Mesh{constructor(e=new u,t=new p({color:16777215*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let e=0,o=0,a=t.count;e<a;e++,o+=2)m.fromBufferAttribute(t,e),v.fromBufferAttribute(n,e),i[o]=0===o?0:i[o-1],i[o+1]=i[o]+m.distanceTo(v);let o=new s.InstancedInterleavedBuffer(i,2,1);return e.setAttribute("instanceDistanceStart",new s.InterleavedBufferAttribute(o,1,0)),e.setAttribute("instanceDistanceEnd",new s.InterleavedBufferAttribute(o,1,1)),this}raycast(e,t){let n,a;let r=this.material.worldUnits,l=e.camera;null!==l||r||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let c=void 0!==e.params.Line2&&e.params.Line2.threshold||0;i=e.ray;let d=this.matrixWorld,u=this.geometry,p=this.material;if(o=p.linewidth+c,null===u.boundingSphere&&u.computeBoundingSphere(),O.copy(u.boundingSphere).applyMatrix4(d),r)n=.5*o;else{let e=Math.max(l.near,O.distanceToPoint(i.origin));n=P(l,e,p.resolution)}if(O.radius+=n,!1!==i.intersectsSphere(O)){if(null===u.boundingBox&&u.computeBoundingBox(),A.copy(u.boundingBox).applyMatrix4(d),r)a=.5*o;else{let e=Math.max(l.near,A.distanceToPoint(i.origin));a=P(l,e,p.resolution)}A.expandByScalar(a),!1!==i.intersectsBox(A)&&(r?function(e,t){let n=e.matrixWorld,a=e.geometry,r=a.attributes.instanceStart,l=a.attributes.instanceEnd,c=Math.min(a.instanceCount,r.count);for(let a=0;a<c;a++){S.start.fromBufferAttribute(r,a),S.end.fromBufferAttribute(l,a),S.applyMatrix4(n);let c=new s.Vector3,d=new s.Vector3;i.distanceSqToSegment(S.start,S.end,d,c),d.distanceTo(c)<.5*o&&t.push({point:d,pointOnLine:c,distance:i.origin.distanceTo(d),object:e,face:null,faceIndex:a,uv:null,[f]:null})}}(this,t):function(e,t,n){let a=t.projectionMatrix,r=e.material.resolution,l=e.matrixWorld,c=e.geometry,d=c.attributes.instanceStart,u=c.attributes.instanceEnd,p=Math.min(c.instanceCount,d.count),h=-t.near;i.at(1,y),y.w=1,y.applyMatrix4(t.matrixWorldInverse),y.applyMatrix4(a),y.multiplyScalar(1/y.w),y.x*=r.x/2,y.y*=r.y/2,y.z=0,E.copy(y),w.multiplyMatrices(t.matrixWorldInverse,l);for(let t=0;t<p;t++){if(b.fromBufferAttribute(d,t),g.fromBufferAttribute(u,t),b.w=1,g.w=1,b.applyMatrix4(w),g.applyMatrix4(w),b.z>h&&g.z>h)continue;if(b.z>h){let e=b.z-g.z,t=(b.z-h)/e;b.lerp(g,t)}else if(g.z>h){let e=g.z-b.z,t=(g.z-h)/e;g.lerp(b,t)}b.applyMatrix4(a),g.applyMatrix4(a),b.multiplyScalar(1/b.w),g.multiplyScalar(1/g.w),b.x*=r.x/2,b.y*=r.y/2,g.x*=r.x/2,g.y*=r.y/2,S.start.copy(b),S.start.z=0,S.end.copy(g),S.end.z=0;let c=S.closestPointToPointParameter(E,!0);S.at(c,x);let p=s.MathUtils.lerp(b.z,g.z,c),m=p>=-1&&p<=1,v=E.distanceTo(x)<.5*o;if(m&&v){S.start.fromBufferAttribute(d,t),S.end.fromBufferAttribute(u,t),S.start.applyMatrix4(l),S.end.applyMatrix4(l);let o=new s.Vector3,a=new s.Vector3;i.distanceSqToSegment(S.start,S.end,a,o),n.push({point:a,pointOnLine:o,distance:i.origin.distanceTo(a),object:e,face:null,faceIndex:t,uv:null,[f]:null})}}}(this,l,t))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(h),this.material.uniforms.resolution.value.set(h.z,h.w))}}class _ extends u{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e,t=3){let n=e.length-t,i=new Float32Array(2*n);if(3===t)for(let o=0;o<n;o+=t)i[2*o]=e[o],i[2*o+1]=e[o+1],i[2*o+2]=e[o+2],i[2*o+3]=e[o+3],i[2*o+4]=e[o+4],i[2*o+5]=e[o+5];else for(let o=0;o<n;o+=t)i[2*o]=e[o],i[2*o+1]=e[o+1],i[2*o+2]=e[o+2],i[2*o+3]=e[o+3],i[2*o+4]=e[o+4],i[2*o+5]=e[o+5],i[2*o+6]=e[o+6],i[2*o+7]=e[o+7];return super.setColors(i,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class T extends M{constructor(e=new _,t=new p({color:16777215*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let U=r.forwardRef(function({points:e,color:t=16777215,vertexColors:n,linewidth:i,lineWidth:o,segments:c,dashed:d,...f},h){var m,v;let b=(0,l.D)(e=>e.size),g=r.useMemo(()=>c?new M:new T,[c]),[y]=r.useState(()=>new p),E=(null==n||null==(m=n[0])?void 0:m.length)===4?4:3,w=r.useMemo(()=>{let i=c?new u:new _,o=e.map(e=>{let t=Array.isArray(e);return e instanceof s.Vector3||e instanceof s.Vector4?[e.x,e.y,e.z]:e instanceof s.Vector2?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(i.setPositions(o.flat()),n){t=16777215;let e=n.map(e=>e instanceof s.Color?e.toArray():e);i.setColors(e.flat(),E)}return i},[e,c,n,E]);return r.useLayoutEffect(()=>{g.computeLineDistances()},[e,g]),r.useLayoutEffect(()=>{d?y.defines.USE_DASH="":delete y.defines.USE_DASH,y.needsUpdate=!0},[d,y]),r.useEffect(()=>()=>{w.dispose(),y.dispose()},[w]),r.createElement("primitive",(0,a.Z)({object:g,ref:h},f),r.createElement("primitive",{object:w,attach:"geometry"}),r.createElement("primitive",(0,a.Z)({object:y,attach:"material",color:t,vertexColors:!!n,resolution:[b.width,b.height],linewidth:null!==(v=null!=i?i:o)&&void 0!==v?v:1,dashed:d,transparent:4===E},f)))}),j=r.forwardRef(({threshold:e=15,geometry:t,...n},i)=>{let o=r.useRef(null);r.useImperativeHandle(i,()=>o.current,[]);let l=r.useMemo(()=>[0,0,0,1,0,0],[]),c=r.useRef(),d=r.useRef();return r.useLayoutEffect(()=>{let n=o.current.parent,i=null!=t?t:null==n?void 0:n.geometry;if(!i||c.current===i&&d.current===e)return;c.current=i,d.current=e;let a=new s.EdgesGeometry(i,e).attributes.position.array;o.current.geometry.setPositions(a),o.current.geometry.attributes.instanceStart.needsUpdate=!0,o.current.geometry.attributes.instanceEnd.needsUpdate=!0,o.current.computeLineDistances()}),r.createElement(U,(0,a.Z)({segments:!0,points:l,ref:o,raycast:()=>null},n))})},2521:function(e,t,n){n.d(t,{z:function(){return m}});var i=n(1119),o=n(8478),a=n(2265),r=n(1448),s=Object.defineProperty,l=(e,t,n)=>t in e?s(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,c=(e,t,n)=>(l(e,"symbol"!=typeof t?t+"":t,n),n);let d=new r.Ray,u=new r.Plane,p=Math.cos(Math.PI/180*70),f=(e,t)=>(e%t+t)%t;class h extends r.EventDispatcher{constructor(e,t){super(),c(this,"object"),c(this,"domElement"),c(this,"enabled",!0),c(this,"target",new r.Vector3),c(this,"minDistance",0),c(this,"maxDistance",1/0),c(this,"minZoom",0),c(this,"maxZoom",1/0),c(this,"minPolarAngle",0),c(this,"maxPolarAngle",Math.PI),c(this,"minAzimuthAngle",-1/0),c(this,"maxAzimuthAngle",1/0),c(this,"enableDamping",!1),c(this,"dampingFactor",.05),c(this,"enableZoom",!0),c(this,"zoomSpeed",1),c(this,"enableRotate",!0),c(this,"rotateSpeed",1),c(this,"enablePan",!0),c(this,"panSpeed",1),c(this,"screenSpacePanning",!0),c(this,"keyPanSpeed",7),c(this,"zoomToCursor",!1),c(this,"autoRotate",!1),c(this,"autoRotateSpeed",2),c(this,"reverseOrbit",!1),c(this,"reverseHorizontalOrbit",!1),c(this,"reverseVerticalOrbit",!1),c(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),c(this,"mouseButtons",{LEFT:r.MOUSE.ROTATE,MIDDLE:r.MOUSE.DOLLY,RIGHT:r.MOUSE.PAN}),c(this,"touches",{ONE:r.TOUCH.ROTATE,TWO:r.TOUCH.DOLLY_PAN}),c(this,"target0"),c(this,"position0"),c(this,"zoom0"),c(this,"_domElementKeyEvents",null),c(this,"getPolarAngle"),c(this,"getAzimuthalAngle"),c(this,"setPolarAngle"),c(this,"setAzimuthalAngle"),c(this,"getDistance"),c(this,"getZoomScale"),c(this,"listenToKeyEvents"),c(this,"stopListenToKeyEvents"),c(this,"saveState"),c(this,"reset"),c(this,"update"),c(this,"connect"),c(this,"dispose"),c(this,"dollyIn"),c(this,"dollyOut"),c(this,"getScale"),c(this,"setScale"),this.object=e,this.domElement=t,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>m.phi,this.getAzimuthalAngle=()=>m.theta,this.setPolarAngle=e=>{let t=f(e,2*Math.PI),i=m.phi;i<0&&(i+=2*Math.PI),t<0&&(t+=2*Math.PI);let o=Math.abs(t-i);2*Math.PI-o<o&&(t<i?t+=2*Math.PI:i+=2*Math.PI),v.phi=t-i,n.update()},this.setAzimuthalAngle=e=>{let t=f(e,2*Math.PI),i=m.theta;i<0&&(i+=2*Math.PI),t<0&&(t+=2*Math.PI);let o=Math.abs(t-i);2*Math.PI-o<o&&(t<i?t+=2*Math.PI:i+=2*Math.PI),v.theta=t-i,n.update()},this.getDistance=()=>n.object.position.distanceTo(n.target),this.listenToKeyEvents=e=>{e.addEventListener("keydown",ee),this._domElementKeyEvents=e},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",ee),this._domElementKeyEvents=null},this.saveState=()=>{n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=()=>{n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(i),n.update(),l=s.NONE},this.update=(()=>{let t=new r.Vector3,o=new r.Vector3(0,1,0),a=new r.Quaternion().setFromUnitVectors(e.up,o),c=a.clone().invert(),f=new r.Vector3,y=new r.Quaternion,E=2*Math.PI;return function(){let w=n.object.position;a.setFromUnitVectors(e.up,o),c.copy(a).invert(),t.copy(w).sub(n.target),t.applyQuaternion(a),m.setFromVector3(t),n.autoRotate&&l===s.NONE&&D(2*Math.PI/60/60*n.autoRotateSpeed),n.enableDamping?(m.theta+=v.theta*n.dampingFactor,m.phi+=v.phi*n.dampingFactor):(m.theta+=v.theta,m.phi+=v.phi);let S=n.minAzimuthAngle,x=n.maxAzimuthAngle;isFinite(S)&&isFinite(x)&&(S<-Math.PI?S+=E:S>Math.PI&&(S-=E),x<-Math.PI?x+=E:x>Math.PI&&(x-=E),S<=x?m.theta=Math.max(S,Math.min(x,m.theta)):m.theta=m.theta>(S+x)/2?Math.max(S,m.theta):Math.min(x,m.theta)),m.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,m.phi)),m.makeSafe(),!0===n.enableDamping?n.target.addScaledVector(g,n.dampingFactor):n.target.add(g),n.zoomToCursor&&T||n.object.isOrthographicCamera?m.radius=H(m.radius):m.radius=H(m.radius*b),t.setFromSpherical(m),t.applyQuaternion(c),w.copy(n.target).add(t),n.object.matrixAutoUpdate||n.object.updateMatrix(),n.object.lookAt(n.target),!0===n.enableDamping?(v.theta*=1-n.dampingFactor,v.phi*=1-n.dampingFactor,g.multiplyScalar(1-n.dampingFactor)):(v.set(0,0,0),g.set(0,0,0));let A=!1;if(n.zoomToCursor&&T){let i=null;if(n.object instanceof r.PerspectiveCamera&&n.object.isPerspectiveCamera){let e=t.length();i=H(e*b);let o=e-i;n.object.position.addScaledVector(M,o),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){let e=new r.Vector3(_.x,_.y,0);e.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/b)),n.object.updateProjectionMatrix(),A=!0;let o=new r.Vector3(_.x,_.y,0);o.unproject(n.object),n.object.position.sub(o).add(e),n.object.updateMatrixWorld(),i=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;null!==i&&(n.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(i).add(n.object.position):(d.origin.copy(n.object.position),d.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(d.direction))<p?e.lookAt(n.target):(u.setFromNormalAndCoplanarPoint(n.object.up,n.target),d.intersectPlane(u,n.target))))}else n.object instanceof r.OrthographicCamera&&n.object.isOrthographicCamera&&(A=1!==b)&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/b)),n.object.updateProjectionMatrix());return b=1,T=!1,!!(A||f.distanceToSquared(n.object.position)>h||8*(1-y.dot(n.object.quaternion))>h)&&(n.dispatchEvent(i),f.copy(n.object.position),y.copy(n.object.quaternion),A=!1,!0)}})(),this.connect=e=>{n.domElement=e,n.domElement.style.touchAction="none",n.domElement.addEventListener("contextmenu",et),n.domElement.addEventListener("pointerdown",q),n.domElement.addEventListener("pointercancel",J),n.domElement.addEventListener("wheel",$)},this.dispose=()=>{var e,t,i,o,a,r;n.domElement&&(n.domElement.style.touchAction="auto"),null==(e=n.domElement)||e.removeEventListener("contextmenu",et),null==(t=n.domElement)||t.removeEventListener("pointerdown",q),null==(i=n.domElement)||i.removeEventListener("pointercancel",J),null==(o=n.domElement)||o.removeEventListener("wheel",$),null==(a=n.domElement)||a.ownerDocument.removeEventListener("pointermove",Q),null==(r=n.domElement)||r.ownerDocument.removeEventListener("pointerup",J),null!==n._domElementKeyEvents&&n._domElementKeyEvents.removeEventListener("keydown",ee)};let n=this,i={type:"change"},o={type:"start"},a={type:"end"},s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},l=s.NONE,h=1e-6,m=new r.Spherical,v=new r.Spherical,b=1,g=new r.Vector3,y=new r.Vector2,E=new r.Vector2,w=new r.Vector2,S=new r.Vector2,x=new r.Vector2,A=new r.Vector2,O=new r.Vector2,L=new r.Vector2,P=new r.Vector2,M=new r.Vector3,_=new r.Vector2,T=!1,U=[],j={};function z(){return Math.pow(.95,n.zoomSpeed)}function D(e){n.reverseOrbit||n.reverseHorizontalOrbit?v.theta+=e:v.theta-=e}function C(e){n.reverseOrbit||n.reverseVerticalOrbit?v.phi+=e:v.phi-=e}let I=(()=>{let e=new r.Vector3;return function(t,n){e.setFromMatrixColumn(n,0),e.multiplyScalar(-t),g.add(e)}})(),R=(()=>{let e=new r.Vector3;return function(t,i){!0===n.screenSpacePanning?e.setFromMatrixColumn(i,1):(e.setFromMatrixColumn(i,0),e.crossVectors(n.object.up,e)),e.multiplyScalar(t),g.add(e)}})(),N=(()=>{let e=new r.Vector3;return function(t,i){let o=n.domElement;if(o&&n.object instanceof r.PerspectiveCamera&&n.object.isPerspectiveCamera){let a=n.object.position;e.copy(a).sub(n.target);let r=e.length();I(2*t*(r*=Math.tan(n.object.fov/2*Math.PI/180))/o.clientHeight,n.object.matrix),R(2*i*r/o.clientHeight,n.object.matrix)}else o&&n.object instanceof r.OrthographicCamera&&n.object.isOrthographicCamera?(I(t*(n.object.right-n.object.left)/n.object.zoom/o.clientWidth,n.object.matrix),R(i*(n.object.top-n.object.bottom)/n.object.zoom/o.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function V(e){n.object instanceof r.PerspectiveCamera&&n.object.isPerspectiveCamera||n.object instanceof r.OrthographicCamera&&n.object.isOrthographicCamera?b=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function B(e){if(!n.zoomToCursor||!n.domElement)return;T=!0;let t=n.domElement.getBoundingClientRect(),i=e.clientX-t.left,o=e.clientY-t.top,a=t.width,r=t.height;_.x=i/a*2-1,_.y=-(o/r*2)+1,M.set(_.x,_.y,1).unproject(n.object).sub(n.object.position).normalize()}function H(e){return Math.max(n.minDistance,Math.min(n.maxDistance,e))}function k(e){y.set(e.clientX,e.clientY)}function Y(e){S.set(e.clientX,e.clientY)}function F(){if(1==U.length)y.set(U[0].pageX,U[0].pageY);else{let e=.5*(U[0].pageX+U[1].pageX),t=.5*(U[0].pageY+U[1].pageY);y.set(e,t)}}function G(){if(1==U.length)S.set(U[0].pageX,U[0].pageY);else{let e=.5*(U[0].pageX+U[1].pageX),t=.5*(U[0].pageY+U[1].pageY);S.set(e,t)}}function W(){let e=U[0].pageX-U[1].pageX,t=U[0].pageY-U[1].pageY;O.set(0,Math.sqrt(e*e+t*t))}function Z(e){if(1==U.length)E.set(e.pageX,e.pageY);else{let t=ei(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);E.set(n,i)}w.subVectors(E,y).multiplyScalar(n.rotateSpeed);let t=n.domElement;t&&(D(2*Math.PI*w.x/t.clientHeight),C(2*Math.PI*w.y/t.clientHeight)),y.copy(E)}function X(e){if(1==U.length)x.set(e.pageX,e.pageY);else{let t=ei(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);x.set(n,i)}A.subVectors(x,S).multiplyScalar(n.panSpeed),N(A.x,A.y),S.copy(x)}function K(e){var t;let i=ei(e),o=e.pageX-i.x,a=e.pageY-i.y;L.set(0,Math.sqrt(o*o+a*a)),P.set(0,Math.pow(L.y/O.y,n.zoomSpeed)),t=P.y,V(b/t),O.copy(L)}function q(e){var t,i;!1!==n.enabled&&(0===U.length&&(null==(t=n.domElement)||t.ownerDocument.addEventListener("pointermove",Q),null==(i=n.domElement)||i.ownerDocument.addEventListener("pointerup",J)),U.push(e),"touch"===e.pointerType?function(e){switch(en(e),U.length){case 1:switch(n.touches.ONE){case r.TOUCH.ROTATE:if(!1===n.enableRotate)return;F(),l=s.TOUCH_ROTATE;break;case r.TOUCH.PAN:if(!1===n.enablePan)return;G(),l=s.TOUCH_PAN;break;default:l=s.NONE}break;case 2:switch(n.touches.TWO){case r.TOUCH.DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;n.enableZoom&&W(),n.enablePan&&G(),l=s.TOUCH_DOLLY_PAN;break;case r.TOUCH.DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;n.enableZoom&&W(),n.enableRotate&&F(),l=s.TOUCH_DOLLY_ROTATE;break;default:l=s.NONE}break;default:l=s.NONE}l!==s.NONE&&n.dispatchEvent(o)}(e):function(e){let t;switch(e.button){case 0:t=n.mouseButtons.LEFT;break;case 1:t=n.mouseButtons.MIDDLE;break;case 2:t=n.mouseButtons.RIGHT;break;default:t=-1}switch(t){case r.MOUSE.DOLLY:if(!1===n.enableZoom)return;B(e),O.set(e.clientX,e.clientY),l=s.DOLLY;break;case r.MOUSE.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enablePan)return;Y(e),l=s.PAN}else{if(!1===n.enableRotate)return;k(e),l=s.ROTATE}break;case r.MOUSE.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enableRotate)return;k(e),l=s.ROTATE}else{if(!1===n.enablePan)return;Y(e),l=s.PAN}break;default:l=s.NONE}l!==s.NONE&&n.dispatchEvent(o)}(e))}function Q(e){!1!==n.enabled&&("touch"===e.pointerType?function(e){switch(en(e),l){case s.TOUCH_ROTATE:if(!1===n.enableRotate)return;Z(e),n.update();break;case s.TOUCH_PAN:if(!1===n.enablePan)return;X(e),n.update();break;case s.TOUCH_DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;n.enableZoom&&K(e),n.enablePan&&X(e),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;n.enableZoom&&K(e),n.enableRotate&&Z(e),n.update();break;default:l=s.NONE}}(e):function(e){if(!1!==n.enabled)switch(l){case s.ROTATE:if(!1===n.enableRotate)return;!function(e){E.set(e.clientX,e.clientY),w.subVectors(E,y).multiplyScalar(n.rotateSpeed);let t=n.domElement;t&&(D(2*Math.PI*w.x/t.clientHeight),C(2*Math.PI*w.y/t.clientHeight)),y.copy(E),n.update()}(e);break;case s.DOLLY:var t,i;if(!1===n.enableZoom)return;(L.set(e.clientX,e.clientY),P.subVectors(L,O),P.y>0)?(t=z(),V(b/t)):P.y<0&&(i=z(),V(b*i)),O.copy(L),n.update();break;case s.PAN:if(!1===n.enablePan)return;x.set(e.clientX,e.clientY),A.subVectors(x,S).multiplyScalar(n.panSpeed),N(A.x,A.y),S.copy(x),n.update()}}(e))}function J(e){var t,i,o;(function(e){delete j[e.pointerId];for(let t=0;t<U.length;t++)if(U[t].pointerId==e.pointerId){U.splice(t,1);return}})(e),0===U.length&&(null==(t=n.domElement)||t.releasePointerCapture(e.pointerId),null==(i=n.domElement)||i.ownerDocument.removeEventListener("pointermove",Q),null==(o=n.domElement)||o.ownerDocument.removeEventListener("pointerup",J)),n.dispatchEvent(a),l=s.NONE}function $(e){if(!1!==n.enabled&&!1!==n.enableZoom&&(l===s.NONE||l===s.ROTATE)){var t,i;e.preventDefault(),n.dispatchEvent(o),(B(e),e.deltaY<0)?(t=z(),V(b*t)):e.deltaY>0&&(i=z(),V(b/i)),n.update(),n.dispatchEvent(a)}}function ee(e){!1!==n.enabled&&!1!==n.enablePan&&function(e){let t=!1;switch(e.code){case n.keys.UP:N(0,n.keyPanSpeed),t=!0;break;case n.keys.BOTTOM:N(0,-n.keyPanSpeed),t=!0;break;case n.keys.LEFT:N(n.keyPanSpeed,0),t=!0;break;case n.keys.RIGHT:N(-n.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),n.update())}(e)}function et(e){!1!==n.enabled&&e.preventDefault()}function en(e){let t=j[e.pointerId];void 0===t&&(t=new r.Vector2,j[e.pointerId]=t),t.set(e.pageX,e.pageY)}function ei(e){return j[(e.pointerId===U[0].pointerId?U[1]:U[0]).pointerId]}this.dollyIn=(e=z())=>{V(b*e),n.update()},this.dollyOut=(e=z())=>{V(b/e),n.update()},this.getScale=()=>b,this.setScale=e=>{V(e),n.update()},this.getZoomScale=()=>z(),void 0!==t&&this.connect(t),this.update()}}let m=a.forwardRef(({makeDefault:e,camera:t,regress:n,domElement:r,enableDamping:s=!0,keyEvents:l=!1,onChange:c,onStart:d,onEnd:u,...p},f)=>{let m=(0,o.D)(e=>e.invalidate),v=(0,o.D)(e=>e.camera),b=(0,o.D)(e=>e.gl),g=(0,o.D)(e=>e.events),y=(0,o.D)(e=>e.setEvents),E=(0,o.D)(e=>e.set),w=(0,o.D)(e=>e.get),S=(0,o.D)(e=>e.performance),x=t||v,A=r||g.connected||b.domElement,O=a.useMemo(()=>new h(x),[x]);return(0,o.F)(()=>{O.enabled&&O.update()},-1),a.useEffect(()=>(l&&O.connect(!0===l?A:l),O.connect(A),()=>void O.dispose()),[l,A,n,O,m]),a.useEffect(()=>{let e=e=>{m(),n&&S.regress(),c&&c(e)},t=e=>{d&&d(e)},i=e=>{u&&u(e)};return O.addEventListener("change",e),O.addEventListener("start",t),O.addEventListener("end",i),()=>{O.removeEventListener("start",t),O.removeEventListener("end",i),O.removeEventListener("change",e)}},[c,d,u,O,m,y]),a.useEffect(()=>{if(e){let e=w().controls;return E({controls:O}),()=>E({controls:e})}},[e,O]),a.createElement("primitive",(0,i.Z)({ref:f,object:O,enableDamping:s},p))})}}]);