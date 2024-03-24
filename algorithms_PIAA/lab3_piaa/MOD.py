import copy
import math
import genmatr

# a = [[math.inf, 3, 1, math.inf, math.inf],
#         [3, math.inf, 1, 2, 2],
#         [1, 1, math.inf, 1, math.inf],
#         [math.inf, 2, 1, math.inf, 1],
#         [math.inf, 2, math.inf, 1, math.inf]]

# a = [[math.inf, 25, 40, 31, 27],
#      [5, math.inf, 17, 30, 25],
#      [19, 15, math.inf, 6, 1],
#      [9, 50, 24, math.inf, 6],
#      [22, 8, 7, 10, math.inf]]

a = [[math.inf, 1, 2, 1],
     [1, math.inf, 1, 2],
     [2, 1, math.inf, 1],
     [1, 2, 1, math.inf]]

def prim(matr, start):
    ost = [[0 for i in range(len(matr))] for i in range(len(matr))]
    visited = [start]
    weight = []
    while(True):
        print("Текущее остовное дерево:")
        for elem in ost:
            print(elem)
        print("Включенные вершины:", *[x+1 for x in visited])

        min_w = math.inf
        i, j = 0, 0
        for elem in visited:
            if min_w > min(matr[elem]):
                min_w = min(matr[elem])
                i = elem
                j = matr[elem].index(min_w)
                print("Найдена новая вершина для добавления:", j+1, " вес ребра = ", min_w)
        if j not in visited:
            print("Найденная вершина еще не находится в мод, добавляем ее")
            weight.append(min_w)
            visited.append(j)
            ost[i][j] = min_w
            ost[j][i] = min_w
        matr[i][j] = math.inf
        print("Вычеркнем это ребро из графа")
        if len(visited) == len(matr):
            print("Все вершины были включены в мод")
            print("С помощью алгоритма Прима построено минимальное остовное дерево:")
            for elem in ost:
                print(elem)
            return ost

def recurs(matr, start, res):
    for j, elem in enumerate(matr[start]):
        if elem != 0:
            if j not in res:
                res.append(j)
                print("Текущий путь:", res)
                recurs(matr, j, res)
            if len(res) == len(matr):
                return



def second_MST(matrix, start):
    matrix_MST = prim(copy.deepcopy(matrix), start)
    way = [start]
    print("Запущен поиск в глубину")
    recurs(matrix_MST, start, way)
    i, j = 0, 1
    cost = 0
    while j < len(way):
        cost += matrix[way[i]][way[j]]
        i+=1
        j+=1
    cost += matrix[way[i]][way[0]]
    print("Полученный приближенный путь коммивояжера:", ' - '.join(str(x) for x in [i + 1 for i in way]))
    print("Его стоимость:", cost)


matr = genmatr.read_matrix('test')
start = 0
# print(matr)
second_MST(matr, start)