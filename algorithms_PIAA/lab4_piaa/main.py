def prefix(string):
    print("Строка, для которой ищутся префиксы:", string)
    res = [0 for i in range(len(string))]   #создаем массив, в который будем складывать значения префиксов
    k = 0
    for i in range(1, len(string)):         #проходим по всем буквам
        print("Шаг", i, "Символ:", string[i])
        while k > 0 and string[k] != string[i]: #пока символы не совпадают, уменьшаем префикс до тех пор
                                                #пока не обнаружится совпадение, или префикс не уменьшится до нуля
            k = res[k - 1]
            print("При текущем k совпадений нет, уменьшаем его до", k)
        if string[k] == string[i]:          #если символы совпали, увеличиваем длину префикса
            print("Символы при индексах k=", k, "i=", i, "совпали, увеличиваем k")
            k += 1
        print("k на этом шаге:", k)
        res[i] = k
    print("Полученный массив префиксов:", res)
    return res

def algorithm_KMP(text, substr):
    tl = len(text)
    sl = len(substr)
    answer = []
    print("Поиск префиксов запущен")
    prefixes = prefix(substr + '#' + text)  #заполняем массив префиксов
    i = 0
    for j in range(tl):
        if prefixes[sl+j+1] == sl:                              #если префикс оказался равным длине подстроки,
                                                                #значит найдено очередное вхождение подстроки в текст
            answer.append(j-sl+1)       #добавим в ответ индекс найденного вхождения
            print("Префикс по индексу", j + sl + 1, "равен длине подстроки =>найдено вхождение")
            print("В ответ записан индекс начала подстроки в исходном тексте:", j-sl+1)
    if len(answer):
        return answer                   #если длина списка ненулевая, значит вхождения нашлись, иначе вернем -1
    print("Вхождения не были обнаружены")
    return [-1]

substr = input()
str_split = substr.split()
if len(str_split) == 1:
    text = input()
else:
    substr = str_split[0]
    text = str_split[1]
res = algorithm_KMP(text, substr)
print(','.join([str(elem) for elem in res]))