import math
import copy
import genmatr


def print_m(matrix):
    for row in matrix:
        print(row)


def min_exept(lst, idx):
    return min([x for i, x in enumerate(lst) if i != idx])


def reduct(matrix):
    d = 0
    for i, string in enumerate(matrix):
        min_row = min(string)
        if min_row == math.inf:
            return -1
        matrix[i] = [elem - min_row for elem in string]
        d += min_row
    for i in range(len(matrix)):
        min_column = min([row[i] for row in matrix])
        if min_column == math.inf:
            return -1
        for row in matrix:
            row[i] -= min_column
        d += min_column
    return d


def find_heavy_zero(matrix):
    d_max = 0
    res = 0
    for i in range(len(matrix)):
        for j in range(len(matrix)):
            if matrix[i][j] == 0:
                tmp = min_exept(matrix[i], j) + min_exept([row[j] for row in matrix], i)
                if tmp > d_max or not res:
                    d_max = tmp
                    res = (i, j)
    return res


class Graf:
    def __init__(self):
        self.best_solution = {}
        self.C_min = math.inf


    def answer(self, start):
        next = graf.best_solution[start]
        res = [str(start)]
        while next != start:
            res.append(str(next))
            next = graf.best_solution[next]
        print(' - '.join(res))
        print("Стоимость этого пути: ", self.C_min)


    def delete(self, matrix, solution, i, j, i_index, j_index):
        restore_i = i_index[i]
        restore_j = j_index[j]
        solution[restore_i+1] = restore_j+1
        if restore_j in i_index and restore_i in j_index:
            i_for_inf = i_index.index(restore_j)
            j_for_inf = j_index.index(restore_i)
            matrix[i_for_inf][j_for_inf] = math.inf
        i_index.pop(i)
        j_index.pop(j)

        matrix.pop(i)
        for row in matrix:
            row.pop(j)


    def method_Little(self, matrix, tmp_solution, C, i_index, j_index, z_edge):
        #привели матрицу
        print("Матрица на этом шаге:\n")
        print_m(matrix)
        d = reduct(matrix)
        if d == -1:
            print("Текущая ветка недопустима")
            return
        print("Матрица после редукции:\n")
        print_m(matrix)
        print("Текущая стоимость пути", C+d)
        if C+d >= self.C_min:
            print("Текущая стоимость пути уже не будет выгоднее чем рекорд, конец рекурсии", self.C_min)
            return
        if len(matrix) == 2:
            print("Размерность матрицы = 2, конец этой ветки рекурсии")
            for i in range(len(matrix)):
                for j in range(len(matrix)):
                    if matrix[i][j] == math.inf:
                        new_i1 = (i + 1) %2
                        new_j2 = (j + 1) %2

                        tmp_solution[i_index[new_i1] +1] = j_index[j] +1
                        tmp_solution[i_index[i] +1] = j_index[new_j2] +1
                        self.best_solution = tmp_solution
                        self.C_min = C+d

                        print("Найденное решение:")
                        self.answer(start)
                        return

        i, j = find_heavy_zero(matrix)
        print("Координаты нуля с максимальным коэффициентом: строка =", i, ", столбец =", j)
        #подготовка для левой ветви
        new_solution = copy.deepcopy(tmp_solution)
        #new_solution[i] = j
        left_matrix = copy.deepcopy(matrix)
        left_i_index = i_index[:]
        left_j_index = j_index[:]
        self.delete(left_matrix, new_solution, i, j, left_i_index, left_j_index)

        #подготовка для правой ветви
        matrix[i][j] = math.inf
        new_z_edge = z_edge[:]
        new_z_edge.append(str(i_index[i]+1) +'-' + str(j_index[j]+1))

        print("C = ", C+d)
        print("Начата левая ветвь:")
        self.method_Little(left_matrix, new_solution, C+d, left_i_index, left_j_index, z_edge)

        print("\n")
        print("Начата правая ветвь, текущее решение на этом узле рекурсии:")
        print([str(i) + '-' + str(j) for i, j in tmp_solution.items()])
        print("Стоимость этого пути: ", C+d)
        print("Запрещенные ребра:")
        print(new_z_edge)

        self.method_Little(matrix, tmp_solution, C+d, i_index[:], j_index[:], new_z_edge)


# a = [[math.inf, 25, 40, 31, 27],
#      [5, math.inf, 17, 30, 25],
#      [19, 15, math.inf, 6, 1],
#      [9, 50, 24, math.inf, 6],
#      [22, 8, 7, 10, math.inf]]

# a = [[math.inf, 3, 1, math.inf, math.inf],
#         [3, math.inf, 1, 2, 2],
#         [1, 1, math.inf, 1, math.inf],
#         [math.inf, 2, 1, math.inf, 1],
#         [math.inf, 2, math.inf, 1, math.inf]]

a = [[math.inf, 1, 2, 1],
     [1, math.inf, 1, 2],
     [2, 1, math.inf, 1],
     [1, 2, 1, math.inf]]

a = genmatr.read_matrix('matrix')
# a = genmatr.generate(1, 5, 1, 30)
# print_m(a)
# genmatr.save_matrix(a, 'test')
# a = genmatr.read_matrix('test')
start = 1

graf = Graf()
i_index = [i for i in range(len(a))]
j_index = [i for i in range(len(a))]
graf.method_Little(a, {}, 0, i_index, j_index, [])
# print(graf.best_solution)
# print(graf.C_min)
print("Ответ:")
graf.answer(start)