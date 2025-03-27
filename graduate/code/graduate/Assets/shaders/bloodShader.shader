Shader "graduate/bloodShader"
{
    Properties
    {
        _MainTex("Texture", 2D) = "white"{}
        _StructTex("Structure", 2D) = "white"{}
        _P("P Предсердия", Float) = 1
        _PQ("_PQ Интервал", Float) = 1.8
        _PTime("P Время предсердий", Float) = 0.15
        _Q("Q", Float) = -0.1
        _R("R Желудочки", Float) = 0.15
        _S("S", Float) = 0
        _QRS("QRS Время сокращения желудочков", Float) = 1
        _TTime("T Время расслабления желудочков", Float) = 0
        _ST("ST", Float) = 0
        _RR("RR Расстояние между ударами", Float) = 2

        
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        LOD 100

        Pass
        {
            
            CGPROGRAM
            #pragma vertex vert 
            #pragma fragment frag

            #include "UnityCG.cginc"
            
            sampler2D _MainTex;
            sampler2D _StructTex;
            float4 _MainTex_ST;
            float _P; //_P, _R- сила удара (расстояние на которое смещается вершина)
            float _PQ; //_PQ - смещение начала удара поджелудочков 
            float _PTime;
            float _Q;
            float _R;
            float _RR;
            float _QRS;
            float _ST;
            float _TTime;
            

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
                float _QRSRelax = _ST + _TTime;
                float _PRelax = _PQ + _QRS;
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
                float coef = 0.003;
                float q = step(_Time.y % _RR, _RR/2);
                float not_q = 1-q;
                float q1 = step((_Time.y - _PQ - _QRS) % _RR, _RR/2 );
                float not_q1 = 1-q1;
                
                vertModification.xyz +=  structColor.b * v.normal * (0.001 - max((cos(_Time.y * speed ) * (1+ zP1*not_q + zP2*q) - (1-_P+ zP1*not_q + zP2*q))*coef, 0));// _Amount * 0.01; //правое предсердие
                vertModification.xyz +=  structColor.r * v.normal * (0.001 - max((cos((_Time.y - timeOffsetL) * speed) * (1+zP1*not_q + zP2*q) - (1-_P+zP1*not_q + zP2*q))*coef, 0));// _Amount * 0.01; //левое
                vertModification.xyz +=  structColor.g * v.normal * (0.001- max((cos((_Time.y-_PQ-_QRS) * speed) * (1+zR1*not_q1 + zR2*q1) - (1-_R+zR1*not_q1 + zR2*q1))*coef*0.55, 0));// _Amount * 0.01; //желудочки

                o.vertex = UnityObjectToClipPos(vertModification);
                return o;
            }

            fixed4 frag (v2f i) : SV_Target
            {
                float2 uvs = i.uv.xy;
                fixed4 textureColor = tex2D(_MainTex, uvs);
                return textureColor;
            }

            ENDCG
        }
    }
}
