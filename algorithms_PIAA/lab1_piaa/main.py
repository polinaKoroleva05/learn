import time

# структура квадрата, участвующего в разделении стола.
class Square:
    def __init__(self, x_data, y_data, w_data):
        self.x = x_data #в структуре хранятся координаты (x,y) верхнего левого угла квадрата
        self.y = y_data
        self.width = w_data # и длина его стороны


    def __str__(self): #структура выводится в виде строки, содержащей координаты и длину через пробел
        res = list(map(lambda x: str(int(x)), [self.x, self.y, self.width]))
        return " ".join(res)

#структура стола, который требуется поделить на квадраты
class Table:
    def __init__(self, N):
        self.size = N #размер стола
        self.best_count = 13 #минимальное кол-во квадратов
        self.best_solution = [] #лучшее найденное решение (представляет из себя список квадратов Square)


    def __str__(self): #структура выводится в виде кол-ва элементов в решении, а затем каждый элемент из решения
        print(len(self.best_solution))
        for elem in self.best_solution:
            print(elem)
        return ""


    def divide(self):
        lst_p = [3, 5, 7, 11, 13, 17, 19]
        #если N четное, можно сразу записать ответ - 4 равных квадрата
        if not self.size % 2:
            self.p = 2
            sq1 = Square(0, 0, 1)
            sq2 = Square(1, 0, 1)
            sq3 = Square(0, 1, 1)
            sq4 = Square(1, 1, 1)
            self.best_solution.extend([sq1, sq2, sq3, sq4])
        #иначе ищем простой делитель чтобы свести стол к меньшему размеру
        else:
            for p in lst_p:
                if not self.size % p:
                    self.p = p
                    break
            #далее рассуждаем как для квадрата pxp
            matr_table = [[0] * self.p for i in range(self.p)]
            big_side = (self.p+1)/2
            self.best_solution.append(Square(self.p/2 - 1/2, self.p/2 - 1/2, big_side))
            add(matr_table, self.p/2 - 1/2, self.p/2 - 1/2, big_side)

            self.best_solution.append(Square(big_side, 0, self.p/2 - 1/2))
            add(matr_table, big_side, 0, self.p/2 - 1/2)

            self.best_solution.append(Square(0, big_side, self.p/2 - 1/2))
            add(matr_table, 0, big_side, self.p/2 - 1/2)

            #запускаем бэктрэкинг для оставшейся, незаполненной части стола
            print("start state")
            for i in matr_table:
                print(i)
            print()
            self.backtrack(self.p*self.p - big_side**2 - 2*((big_side-1)**2), 3, self.best_solution[:], matr_table)
        #увеличиваем размеры и координаты до размеров изначального стола
        for elem in self.best_solution:
            coef = self.size/self.p
            elem.x *= coef
            elem.x += 1 # и прибавляем к координатам единицу, тк на степике нумерация с 1
            elem.y *= coef
            elem.y += 1
            elem.width *= coef


    def start_position(self, matr_table):
        for y in matr_table:
            for x in y:
                if not (matr_table[y][x]): #условие выполнится когда найдем свободную ячейку = 0
                    return x, y
        return -1, -1 #не нашли свободную ячейку


    def try_set_square(self, x0, y0, w, map):
        for y in range(y0, y0 + w):
            for x in range(x0, x0+w):
                if map[y][x]: #это условие выполнится, если одна из точек внутри вставляемого квадрата окажется занята
                    return False #=> квадрат нельзя поставить
        return True


    def backtrack(self, free_area, square_count, tmp_solution, matr_table):
        if square_count >= self.best_count:
            print("square_count = ", square_count+1, ", more or equal than record = ", len(self.best_solution), "\nstop recursion\n")
            return
        for x in range(int((self.p + 1) / 2)):
            for y in range(int((self.p + 1) / 2)):
                if not matr_table[y][x]: #если ячейка свободна, выполняем третий цикл
                    for size_of_tmp_square in range(int(self.p / 2), 0, -1): #движемся от большего размера квадрата к меньшему
                        if self.try_set_square(x, y, size_of_tmp_square, matr_table): #проверяем, можно ли поставить квадрат в эту точку
                            new_tmp_solution = tmp_solution[:]
                            new_tmp_solution.append(Square(x, y, size_of_tmp_square))
                            new_matr_table = [row[:] for row in matr_table]
                            add(new_matr_table, x, y, size_of_tmp_square)
                            print("added new square in (", x , "," , y, ") and size", size_of_tmp_square, "\n")
                            for i in new_matr_table:
                                print(i)
                            print()
                            new_free_area = free_area - size_of_tmp_square*size_of_tmp_square
                            if new_free_area > 0: #если свободное место еще осталось, запускаем новую функцию
                                self.backtrack(new_free_area, square_count + 1, new_tmp_solution, new_matr_table)
                            else: #если стол уже заполнен, мы получили решение
                                if square_count < self.best_count: #проверяем, лучше ли оно уже найденного
                                    self.best_count = square_count
                                    self.best_solution = new_tmp_solution
                                    print("new record:", len(new_tmp_solution), "\n")
                                print("deleted square, size =", size_of_tmp_square)
                                return
                            if size_of_tmp_square == 1: #если размер квадрата 1, дальнейшие перестановки единиц нас не интересуют
                                print("deleted square, size = 1")
                                return
                            print("deleted square, size =", size_of_tmp_square)


def add(map, x0, y0, w):
    for y in range(int(y0), int(y0+w)):
        for x in range(int(x0), int(x0 + w)):
            map[y][x] = int(w) #циклы ограничивают площадь квадратика, ячейкам присваивается длина его стороны


#
# list_N = [i for i in range(2, 20)]
# for N in list_N:
#     start = time.monotonic()
#     tbl = Table(N)
#     tbl.divide()
#     end = time.monotonic()
#     print("N: ", N, " ", end-start)
#     print("count: ", len(tbl.best_solution), "\n")


N = int(input())
start = time.monotonic()
tbl = Table(N)
tbl.divide()
end = time.monotonic()
print(end-start)
print("Answer:\n", tbl)
