
class Graph:
    def __init__(self, edges, start, end):
        self.edges = edges
        self.start = start
        self.end = end
        self.end_not_found = True

    def get_neighbors(self, v):
        return self.edges.get(v)

    def build_way(self, n, parent):
        res = []
        while parent[n] != n:
            res.append(n)
            n = parent[n]

        res.append(self.start)
        res.reverse()
        print("\nрезультат: ")
        print(''.join(res))
        return

    def sort(self): #пузырьком упорядочиваем ребра по весу, и так для каждой вершины графа
        for key in self.edges:
            length = len(self.edges[key])
            for i in range(length):
                for j in range(length -i -1):
                    if self.edges[key][j][1] > self.edges[key][j+1][1]:
                        self.edges[key][j], self.edges[key][j+1] = self.edges[key][j+1], self.edges[key][j]


    def greedy_algorithm(self, node, parent):
        if node == self.end: #если вершина из которой надо построить путь оказалась итоговой - выводим результат и заканчиваем рекурсию
            print("достигнута конечная вершина!")
            self.build_way(node, parent)
            self.end_not_found = False
            return

        else:
            if self.get_neighbors(node): #если из вершины выходят ребра
                print("цикл по соседям вершины ", node, ": ", *self.get_neighbors(node))
                for elem in self.get_neighbors(node):
                    print("\nрассматривается вершина ", elem[0])
                    if elem[0] not in parent and self.end_not_found:  #если вершина в которую приходит ребро, не находится в пормежуточном пути
                        print("начало рекурсии из текущей вершины")
                        new_parent = parent.copy()
                        new_parent[elem[0]] = node #копируем промежуточный путь, добавляем текущую вершину и запускаем поиск пути из нее
                        self.greedy_algorithm(elem[0], new_parent)
                        print("Конец рекурсии по вершине", elem[0])
                    else:
                        print("вершина уже задействована в текущем пути, конец рекурсии\n")

            else:
                print("вершина является листом, конец рекурсии\n")


start, end = input().split(' ')
edg_lis = {}
tmp = input().split(' ')
while True: #считываем до тех пор пока ввод корректен
    try:
        if edg_lis.get(tmp[0]) == None:
            edg_lis[tmp[0]] = [(tmp[1], float(tmp[2]))]
        else:
            edg_lis[tmp[0]].append((tmp[1], float(tmp[2])))
        tmp = input().split(' ')
    except Exception:
        break

graph1 = Graph(edg_lis, start, end)
graph1.sort() #сортировка графа по возрастанию
graph1.greedy_algorithm(start, {start: start})



