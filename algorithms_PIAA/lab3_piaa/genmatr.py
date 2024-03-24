import math
import random

def read_matrix(filename):
    f = open(filename)
    matrix = []
    for line in f:
        tmp = line.split(' ')
        res = []
        for x in tmp:
            try:
                res.append(int(x))
            except ValueError:
                res.append(math.inf)
        matrix.append(res)
    f.close()
    return matrix

def generate(sym, size, min_val, max_val):
    matrix = [[0 for j in range(size)] for i in range(size)]
    if sym:
        for i in range(size):
            for j in range(i, size):
                a = random.randint(min_val, max_val)
                matrix[i][j] = a
                matrix[j][i] = a
                if i == j:
                    matrix[i][j] = math.inf
    else:
        for i in range(size):
            for j in range(size):
                a = random.randint(min_val, max_val)
                matrix[i][j] = a
                if i == j:
                    matrix[i][j] = math.inf
    return matrix

def save_matrix(matrix, filename):
    f = open(filename, 'w')
    for elem in matrix:
        string = ' '.join([str(x) for x in elem])
        f.write(string+'\n')
    f.close()