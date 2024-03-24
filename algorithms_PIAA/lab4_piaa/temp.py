def algorithm_KMP(text, substr):
    sl = len(substr)
    if sl != len(text): #если длины подстроки и текста разные, это уже не циклический сдвиг
        print("Строки разной длины, это не циклический сдвиг")
        return -1

    res = [0 for i in range(sl)]    #для экономии памяти заполним массив префиксов только для подстроки
                                    #тк будем обращаться максимум по индексу k  = sl
    print("Нахождение префиксов для первой строки")
    k = 0
    for i in range(1, sl):
        print("Шаг", i, "Символ:", substr[i])
        while k > 0 and substr[k] != substr[i]: #ищем совпадение символов, используя
            k = res[k - 1]                      #уже найденное значение префикса
            print("При текущем k совпадений нет, уменьшаем его до", k)
        if substr[k] == substr[i]:
            print("Символы при индексах k=", k, "i=", i, "совпали, увеличиваем k")
            k += 1                              #если символы совпали, увеличим длину префикса
        print("k на этом шаге:", k)
        res[i] = k
    print("Полученный массив префиксов для первой строки:", res, "\n")
    print("Продолжаем вычисление префиксов, но теперь для удвоенного текста")

    k = 0
    for i in range(0, sl << 1):
        print("Шаг", i, "Символ:", text[i%sl])
        while k > 0 and substr[k] != text[i%sl]:    #чтобы не выделять память под двойной текст,
                                                    #просто берем индекс по модулю длины текста
            print("При текущем k совпадений нет, уменьшаем его до", k)
            k = res[k - 1]
        if substr[k] == text[i%sl]:
            print("Символы при индексах k=", k, "i=", i, "совпали, увеличиваем k")
            k += 1
        print("k на этом шаге:", k)
        if k == sl:                                 #в момент когда k = sl, значит мы нашли целую подстроку
            print("Найден префикс, равный длине искомой строки => нашлось вхождение строки")
            print("Индекс начала вхождения:", i-sl+1)
            return i-sl+1                           #в двойном тексте, можно завершать алгоритм
    print("Не было обнаружено ни одного вхождения, это не циклический сдвиг")
    return -1

substr = input()
str_split = substr.split()
if len(str_split) == 1:
    text = input()
else:
    substr = str_split[0]
    text = str_split[1]

print(algorithm_KMP(substr, text))