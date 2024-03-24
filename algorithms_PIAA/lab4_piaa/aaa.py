def algorithm_KMP(text, substr):
    sl = len(substr)
    if sl != len(text):
        return -1


    res = [0 for i in range(sl)]
    text = text+text
    k = 0
    for i in range(1, sl):
        while k > 0 and substr[k] != substr[i]:
            k = res[k - 1]
        if substr[k] == substr[i]:
            k += 1
        res[i] = k

    k = 0
    for i in range(0, sl << 1):
        while k > 0 and substr[k] != text[i]:
            k = res[k - 1]
        if substr[k] == text[i]:
            k += 1
        if k == sl:
            return i-sl+1
    return -1

substr = input()
str_split = substr.split()
if len(str_split) == 1:
    text = input()
else:
    substr = str_split[0]
    text = str_split[1]

print(algorithm_KMP(substr, text))