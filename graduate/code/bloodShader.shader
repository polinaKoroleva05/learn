Shader "graduate/bloodShader"
{
    Properties
    {
        // _ColorOne("Color One", color) = (1, 1, 1, 1)
        // _ColorTwo("Color Two", color) = (1, 1, 1, 1)
        _MainTex("Texture", 2D) = "white"{}
        _StructTex("Structure", 2D) = "white"{}
        _AnimateXY("Animate X Y", Vector) = (0, 0, 0, 0)
        [Enum(UnityEngine.Rendering.BlendMode)]
        _SrcFactor("Src factor", Float) = 5
        [Enum(UnityEngine.Rendering.BlendMode)]
        _DstFactor("Dst Factor", Float) = 10
        [Enum(UnityEngine.Rendering.BlendOp)]
        _Opp("Opperation", Float) = 0
        _Amount("Amount", Range(0,1)) = 0.5
        _vertOffset("Vert Offset", Range(0.05,0.15)) = 0.1
        _P("P Предсердия", Float) = 1
        _PR("PR Интервал", Float) = 1.8
        _PTime("P Время предсердий", Float) = 0.15
        _PRelax("P Время расслабления предсердий", Float) = 0.15
        _Q("Q", Float) = -0.1
        _R("R Желудочки", Float) = 0.15
        _S("S", Float) = 0
        _QRS("QRS Время сокращения желудочков", Float) = 1
        _QRSRelax("QRS Время расслабления желудочков", Float) = 1
        _T("T", Float) = 0
        _QT("QT", Float) = 0
        _ST("ST", Float) = 0
        _RR("RR Расстояние между ударами", Float) = 2

        
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        LOD 100
        Blend [_SrcFactor] [_DstFactor]
        
        BlendOp [_Opp]

        Pass
        {
            
            CGPROGRAM
            #pragma vertex vert 
            #pragma fragment frag
            
            // make fog work
            // #pragma multi_compile_fog

            #include "UnityCG.cginc"
            // fixed4 _ColorOne;
            // fixed4 _ColorTwo;
            
            sampler2D _MainTex;
            sampler2D _StructTex;
            float4 _MainTex_ST;
            float4 _AnimateXY;
            float _Amount;
            float _vertOffset;
            float _P; //_P, _R- сила удара (расстояние на которое смещается вершина)
            float _PR; //_PR - смещение начала удара поджелудочков 
            float _PTime;
            float _Q;
            float _R;
            float _RR;
            float _QRS;
            float _PRelax;
            float _QRSRelax;
            

            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
                half3 normal: NORMAL;
            };

            struct v2f
            {
                float2 uv : TEXCOORD0;
                float4 vertex : SV_POSITION;
                
            };

            v2f vert (appdata v)
            {
                v2f o;
                o.uv = TRANSFORM_TEX(v.uv, _MainTex);
                float4 structColor = tex2Dlod(_StructTex, float4(o.uv.xy, 0, 0));
                // o.uv += frac(_AnimateXY.xy * _MainTex_ST.xy * _Time.yy);
                float animateCoeff = 0.15;
                float timeOffsetL = _PTime*0.1; //смещение начала удара левого предсердия
                float speed = 6.283185/_RR; //расстояние между вершинами косинусоиды
                float3 vertModification = v.vertex;
                float cosP1 = cos(2*_PTime*3.14159/_RR);
                float cosP2 = cos(2*_PRelax*3.14159/_RR);
                float zP1 = (cosP1-1+_P)/(1-cosP1);
                float zP2 = (cosP2-1+_P)/(1-cosP2);
                float cosR1 = cos(2*_QRS*3.14159/_RR);
                float cosR2 = cos(2*_QRSRelax*3.14159/_RR);
                float zR1 = (cosR1-1+_R)/(1-cosR1);
                float zR2 = (cosR2-1+_R)/(1-cosR2);
                float coef = 0.001;
                float q = step(_Time.y % _RR, _RR/2);
                float not_q = 1-q;
                float q1 = step((_Time.y - _PR - _QRS) % _RR, _RR/2 );
                float not_q1 = 1-q1;
                //vertOffset - смещение по оси Y, линейное уменьшение силы и длительности

                // vertModification.x += cos(vertModification.y  - _Time.y )/2;
                // vertModification.xyz += v.normal * (cos(vertModification.y - _Time.y * 4 ) * 0.15 + 0.15 ) * animateCoeff;// кишечник (annimateCoef = 1), сердце (annimateCoef = 0.01)
                // vertModification.xyz +=  structColor.b * v.normal * (cos(vertModification.y - _Time.y * 4 ) * 0.15 + 0.15 ) * animateCoeff;// _Amount * 0.01;

                // vertModification.xyz +=  structColor.b * v.normal * (0.001 - max((cos(_Time.y * speed ) * _P - _vertOffset)*0.01, 0));// _Amount * 0.01; //правое предсердие
                // vertModification.xyz +=  structColor.r * v.normal * (0.001 - max((cos(_Time.y * speed - timeOffsetL ) * _P - _vertOffset)*0.01, 0));// _Amount * 0.01; //левое
                // vertModification.xyz +=  structColor.g * v.normal * (0.002 - max((cos(_Time.y * speed - _PR) * (_R) - _vertOffset)*0.02, 0));// _Amount * 0.01; //желудочки
                
                vertModification.xyz +=  structColor.b * v.normal * (0.001 - max((cos(_Time.y * speed ) * (1+ zP1*not_q + zP2*q) - (1-_P+ zP1*not_q + zP2*q))*coef, 0));// _Amount * 0.01; //правое предсердие
                vertModification.xyz +=  structColor.r * v.normal * (0.001 - max((cos((_Time.y - timeOffsetL) * speed) * (1+zP1*not_q + zP2*q) - (1-_P+zP1*not_q + zP2*q))*coef, 0));// _Amount * 0.01; //левое
                vertModification.xyz +=  structColor.g * v.normal * (0.001- max((cos((_Time.y-_PR-_QRS) * speed) * (1+zR1*not_q1 + zR2*q1) - (1-_R+zR1*not_q1 + zR2*q1))*coef, 0));// _Amount * 0.01; //желудочки

                // vertModification.xyz +=  structColor.r * v.normal * (cos(vertModification.y - _Time.y * 4 - 1 ) * 0.15 + 0.15 ) * animateCoeff;
                // vertModification.xyz +=  structColor.g * v.normal * (cos(vertModification.y - _Time.y * 4 + 4 ) * 0.15 + 0.15 ) * animateCoeff;
                // vertModification.xyz += v.normal * ((sin(_Time.y%mod * b + a ) * -c )/(_Time.y%mod*b + a ) + c ) * animateCoeff;// попытка не синусоиды (неудачно); 
                // o.uv.x = cos(length(o.uv.xy) - _Time.y);
                o.vertex = UnityObjectToClipPos(vertModification);
                // o.uv *= 2;
                // o.uv.x += 0.2;
                // o.color = lerp(_ColorOne, _ColorTwo, v.uv.x);
                // UNITY_TRANSFER_FOG(o,o.vertex);
                return o;
            }

            fixed4 frag (v2f i) : SV_Target
            {
                // sample the texture
                // fixed4 col = lerp(_ColorOne, _ColorTwo, i.uv.x);
                float2 uvs = i.uv.xy;
                fixed4 textureColor = tex2D(_MainTex, uvs);
                // fixed4 col = fixed4(i.uv,0,1);
                // apply fog
                // UNITY_APPLY_FOG(i.fogCoord, col);

                // float anim = 5 * _Time.y;
                // float intensity = 10;
                // float needed = abs(sin( i.uv.y * intensity - anim));
                // i.color.a = step(needed, 0.8);

                // i.color.a = step(abs(i.vertex.y-needed), 100);
                // i.color.a = needed;
                return textureColor;
            }



            ENDCG
        }
    }
}
