
class Graph:
    def __init__(self, edges, end, h_dict):
        self.edges = edges
        self.end = end
        self.h_dict = h_dict

    def get_neighbors(self, v):
        return self.edges.get(v)

    # эвристическая функция для каждой вершины
    def h(self, n):
        #return abs(ord(n) - ord(end)) #расстояние между текущей вершиной и конечной в таблице ASCII
        try:
            res = self.h_dict[n]
        except KeyError: #в случае если эвристическую функцию для вершины не задали, вернем значение по умолчанию
            res = 1
        return res

    def build_way(self, n, parent):
        res = []
        while parent[n] != n:
            res.append(n)
            n = parent[n]

        res.append(n)
        res.reverse()
        print(''.join(res))
        return

    def a_star_algorithm(self, start, end):
        open_lst = set([start])  #вершины, чьих соседей мы еще рассматриваем
        closed_lst = set([]) #вершины, которые мы посетили и чьих соседей полностью рассмотрели

        g = {} #текущее расстояние от стартовой вершины ко всем остальным
        g[start] = 0

        parent = {}  #словарь родителей для каждой вершины
        parent[start] = start

        while len(open_lst) > 0:
            min_f = None
            print("\nСостояние открытого списка: ", open_lst,
                  "\nСостояние закрытого списка: ", closed_lst,
                  "\nСостояние функции g: ", g,
                  "\nСостояние словаря родителей parent: ", parent, "\n")
            #ищем вершину с минимальным антиприоритетом f()
            print("Начат поиск вершины в открытом списке с минимальным приоритетом")
            for v in open_lst:
                if min_f == None or g[v] + self.h(v) < g[min_f] + self.h(min_f):
                    min_f = v
                    print("Найдена вершина", min_f, ", ee антиприоритет f = ", g[min_f] + self.h(min_f))

            if min_f == None:
                print("Все вершины были просмотрены, пути нет")
                return None

            if min_f == end:
                print("Найдена конечная вершина! Начато построение пути \nРезультат:")
                self.build_way(min_f, parent)
                return
            if self.get_neighbors(min_f):
                print("\nРассматриваем детей найденной вершины", min_f, ": ", self.get_neighbors(min_f))
                for (child, weight) in self.get_neighbors(min_f):
                    # если текущая вершина не рассматривается и не рассматривалась раньше
                    if child not in open_lst and child not in closed_lst:
                        print("Вершина ", child, "еще не была рассмотрена, поэтому добавляется в открытый список")
                        open_lst.add(child) #добавляем ее на рассмотрение
                        parent[child] = min_f
                        g[child] = g[min_f] + weight
                        print("Расчитали g-функцию для этой вершины = ", g[child])


                    else:
                        print("Вершина ", child, "уже рассматривалась")
                        if g[child] > g[min_f] + weight:
                            print("Текущий путь от родителя = ", g[min_f] + weight, " оказался выгоднее прежнего пути = ", g[child])
                            g[child] = g[min_f] + weight
                            parent[child] = min_f
                            print("Заменили путь для вершины ", child)

                            if child in closed_lst:
                                print("Возвращаем вершину на рассмотрение")
                                closed_lst.remove(child)
                                open_lst.add(child)

            # поскольку все соседи вершины min_f были просмотрены, убираем ее из open_lst, и добавляем в closed_lst
            open_lst.remove(min_f)
            closed_lst.add(min_f)
            print("Все соседи вершины ", min_f, " были рассмотрены, убираем ее из открытого списка")

        print("Пути нет")
        return None


start, end = input().split(' ')
edg_lis = {}
tmp = input().split(' ')
h = {}
while True: #считываем до тех пор пока ввод корректен
    try:
        if edg_lis.get(tmp[0]) == None: #если такого ключа еще нет, записываем в значение новую пару
            edg_lis[tmp[0]] = [(tmp[1], float(tmp[2]))]
        else:
            edg_lis[tmp[0]].append((tmp[1], float(tmp[2]))) #если ключ уже создан, добавляем с помощью append
        tmp = input().split(' ')
    except Exception:
        break
print("Введите эврестическую функцию\n")
while True:
    try:
        tmp = input().split(' ')
        h[tmp[0]] = float(tmp[1])
    except Exception:
        break
graph1 = Graph(edg_lis, end, h)
graph1.a_star_algorithm(start, end)



