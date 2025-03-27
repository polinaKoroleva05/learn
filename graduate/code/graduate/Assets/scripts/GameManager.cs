using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public Material heart;
    public float count;
    private void Start()
    {
        count = 2;
        heart.SetFloat("_RR", count);
    }
    // Update is called once per frame
    public void Normal()
    {
        heart.SetFloat("_PTime", 0.08f);
        heart.SetFloat("_P", 0.25f);
        heart.SetFloat("_QRS", 0.1f);
        heart.SetFloat("_R", 1f);
        heart.SetFloat("_TTime", 0.15f);
        heart.SetFloat("_ST", 0.05f);
        heart.SetFloat("_PQ", 0.12f);
        heart.SetFloat("_RR", 1f);
    }


    public void Tahicardia()
    {
        heart.SetFloat("_PTime", 0.08f);
        heart.SetFloat("_P", 0.25f);
        heart.SetFloat("_QRS", 0.1f);
        heart.SetFloat("_R", 1f);
        heart.SetFloat("_TTime", 0.15f);
        heart.SetFloat("_ST", 0.05f);
        heart.SetFloat("_PQ", 0.12f);
        heart.SetFloat("_RR", 0.5f);
    }

    public void Bradicardia()
    {
        heart.SetFloat("_PTime", 0.08f);
        heart.SetFloat("_P", 0.25f);
        heart.SetFloat("_QRS", 0.2f);
        heart.SetFloat("_R", 1f);
        heart.SetFloat("_TTime", 0.5f);
        heart.SetFloat("_ST", 0.02f);
        heart.SetFloat("_PQ", 0.12f);
        heart.SetFloat("_RR", 2f);
    }
}
